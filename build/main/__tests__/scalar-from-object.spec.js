"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@apollo/client/core");
const utilities_1 = require("@apollo/client/utilities");
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const __1 = require("..");
const typeDefs = core_1.gql `
  type Query {
    object: MyObject
    sure: MyObject!
    list: [MyObject!]
    listMaybe: [MyObject]
    sureList: [MyObject]!
    reallySureList: [MyObject!]!
  }

  type MyObject {
    day: Date
    morning: StartOfDay!
    days: [Date]!
    sureDays: [Date!]!
    mornings: [StartOfDay!]!
    empty: [Date]!
    nested: MyObject
  }

  "represents a Date with time"
  scalar Date

  "represents a Date at the beginning of the UTC day"
  scalar StartOfDay
`;
class CustomDate {
    constructor(date) {
        this.date = date;
    }
    toISOString() {
        return this.date.toISOString();
    }
}
const rawDay = "2018-02-03T12:13:14.000Z";
const rawDay2 = "2019-02-03T12:13:14.000Z";
const rawMorning = "2018-02-03T00:00:00.000Z";
const rawMorning2 = "2019-02-03T00:00:00.000Z";
const parsedDay = new Date(rawDay);
const parsedDay2 = new Date(rawDay2);
const parsedMorning = new Date(rawMorning);
const parsedMorning2 = new Date(rawMorning2);
const parsedMorningCustom = new CustomDate(parsedMorning);
const parsedMorningCustom2 = new CustomDate(parsedMorning2);
const resolvers = {
    Query: {
        object: () => ({}),
        sure: () => ({ nested: {} }),
        list: () => [{}],
        listMaybe: () => [{}],
        sureList: () => [{}],
        reallySureList: () => [{}],
    },
    MyObject: {
        day: () => parsedDay,
        morning: () => parsedMorning,
        days: () => [parsedDay, parsedDay2],
        sureDays: () => [parsedDay, parsedDay2],
        mornings: () => [parsedMorning, parsedMorning2],
        empty: () => [],
    },
    Date: new graphql_1.GraphQLScalarType({
        name: "Date",
        serialize: (parsed) => parsed === null || parsed === void 0 ? void 0 : parsed.toISOString(),
        parseValue: (raw) => raw && new Date(raw),
        parseLiteral(ast) {
            if (ast.kind === graphql_1.Kind.STRING || ast.kind === graphql_1.Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        },
    }),
    StartOfDay: new graphql_1.GraphQLScalarType({
        name: "StartOfDay",
        serialize: (parsed) => parsed === null || parsed === void 0 ? void 0 : parsed.toISOString(),
        parseValue: (raw) => {
            if (!raw)
                return null;
            const d = new Date(raw);
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            return d;
        },
        parseLiteral(ast) {
            if (ast.kind === graphql_1.Kind.STRING || ast.kind === graphql_1.Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        },
    }),
};
const typesMap = {
    StartOfDay: {
        serialize: (parsed) => parsed === null || parsed === void 0 ? void 0 : parsed.toISOString(),
        parseValue: (raw) => {
            if (!raw)
                return null;
            const d = new Date(raw);
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            return new CustomDate(d);
        },
    },
};
const schema = schema_1.makeExecutableSchema({
    typeDefs,
    resolvers,
});
const querySource = `
  query MyQuery {
    object {
      ...MyObjectFragment
    }
    sure {
      ...MyObjectFragment
      nested {
        ...MyObjectFragment
      }
    }
    list {
      ...MyObjectFragment
    }
    listMaybe {
      ...MyObjectFragment
    }
    sureList {
      ...MyObjectFragment
    }
    reallySureList {
      ...MyObjectFragment
    }
  }

  fragment MyObjectFragment on MyObject {
    __typename
    day
    morning
    days
    sureDays
    mornings
    myMornings: mornings
    empty
  }
`;
const queryDocument = core_1.gql `
  ${querySource}
`;
const queryOperationName = utilities_1.getOperationName(queryDocument);
if (!queryOperationName)
    throw new Error("invalid query operation name");
const request = {
    query: queryDocument,
    variables: {},
    operationName: queryOperationName,
};
const response = {
    data: {
        object: {
            __typename: "MyObject",
            day: rawDay,
            morning: rawMorning,
            days: [rawDay, rawDay2],
            sureDays: [rawDay, rawDay2],
            mornings: [rawMorning, rawMorning2],
            myMornings: [rawMorning, rawMorning2],
            empty: [],
        },
        sure: {
            __typename: "MyObject",
            day: rawDay,
            morning: rawMorning,
            days: [rawDay, rawDay2],
            sureDays: [rawDay, rawDay2],
            mornings: [rawMorning, rawMorning2],
            myMornings: [rawMorning, rawMorning2],
            empty: [],
            nested: {
                __typename: "MyObject",
                day: rawDay,
                morning: rawMorning,
                days: [rawDay, rawDay2],
                sureDays: [rawDay, rawDay2],
                mornings: [rawMorning, rawMorning2],
                myMornings: [rawMorning, rawMorning2],
                empty: [],
            },
        },
        list: [
            {
                __typename: "MyObject",
                day: rawDay,
                morning: rawMorning,
                days: [rawDay, rawDay2],
                sureDays: [rawDay, rawDay2],
                mornings: [rawMorning, rawMorning2],
                myMornings: [rawMorning, rawMorning2],
                empty: [],
            },
        ],
        listMaybe: [
            {
                __typename: "MyObject",
                day: rawDay,
                morning: rawMorning,
                days: [rawDay, rawDay2],
                sureDays: [rawDay, rawDay2],
                mornings: [rawMorning, rawMorning2],
                myMornings: [rawMorning, rawMorning2],
                empty: [],
            },
        ],
        sureList: [
            {
                __typename: "MyObject",
                day: rawDay,
                morning: rawMorning,
                days: [rawDay, rawDay2],
                sureDays: [rawDay, rawDay2],
                mornings: [rawMorning, rawMorning2],
                myMornings: [rawMorning, rawMorning2],
                empty: [],
            },
        ],
        reallySureList: [
            {
                __typename: "MyObject",
                day: rawDay,
                morning: rawMorning,
                days: [rawDay, rawDay2],
                sureDays: [rawDay, rawDay2],
                mornings: [rawMorning, rawMorning2],
                myMornings: [rawMorning, rawMorning2],
                empty: [],
            },
        ],
    },
};
describe("scalar returned directly from first level queries", () => {
    it("can compare 2 custom dates ok", () => {
        const a = new CustomDate(new Date("2018-01-01T00:00:00.000Z"));
        const b = new CustomDate(new Date("2018-01-01T00:00:00.000Z"));
        const c = new CustomDate(new Date("2018-02-03T00:00:00.000Z"));
        expect(a).toEqual(b);
        expect(a).not.toEqual(c);
    });
    it("ensure the response fixture is valid (ensure that in the response we have the RAW, the Server is converting from Date to STRING)", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const queryResponse = yield graphql_1.graphql(schema, querySource);
        expect(queryResponse).toEqual(response);
    }));
    it("use the scalar resolvers in the schema to parse back", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema }),
            new core_1.ApolloLink(() => {
                return core_1.Observable.of(response);
            }),
        ]);
        const expectedResponse = {
            data: {
                object: {
                    __typename: "MyObject",
                    day: parsedDay,
                    morning: parsedMorning,
                    days: [parsedDay, parsedDay2],
                    sureDays: [parsedDay, parsedDay2],
                    mornings: [parsedMorning, parsedMorning2],
                    myMornings: [parsedMorning, parsedMorning2],
                    empty: [],
                },
                sure: {
                    __typename: "MyObject",
                    day: parsedDay,
                    morning: parsedMorning,
                    days: [parsedDay, parsedDay2],
                    sureDays: [parsedDay, parsedDay2],
                    mornings: [parsedMorning, parsedMorning2],
                    myMornings: [parsedMorning, parsedMorning2],
                    empty: [],
                    nested: {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorning,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorning, parsedMorning2],
                        myMornings: [parsedMorning, parsedMorning2],
                        empty: [],
                    },
                },
                list: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorning,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorning, parsedMorning2],
                        myMornings: [parsedMorning, parsedMorning2],
                        empty: [],
                    },
                ],
                listMaybe: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorning,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorning, parsedMorning2],
                        myMornings: [parsedMorning, parsedMorning2],
                        empty: [],
                    },
                ],
                sureList: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorning,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorning, parsedMorning2],
                        myMornings: [parsedMorning, parsedMorning2],
                        empty: [],
                    },
                ],
                reallySureList: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorning,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorning, parsedMorning2],
                        myMornings: [parsedMorning, parsedMorning2],
                        empty: [],
                    },
                ],
            },
        };
        const observable = core_1.execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
    it("override the scala resolvers with the custom functions map", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, typesMap }),
            new core_1.ApolloLink(() => {
                return core_1.Observable.of(response);
            }),
        ]);
        const expectedResponse = {
            data: {
                object: {
                    __typename: "MyObject",
                    day: parsedDay,
                    morning: parsedMorningCustom,
                    days: [parsedDay, parsedDay2],
                    sureDays: [parsedDay, parsedDay2],
                    mornings: [parsedMorningCustom, parsedMorningCustom2],
                    myMornings: [parsedMorningCustom, parsedMorningCustom2],
                    empty: [],
                },
                sure: {
                    __typename: "MyObject",
                    day: parsedDay,
                    morning: parsedMorningCustom,
                    days: [parsedDay, parsedDay2],
                    sureDays: [parsedDay, parsedDay2],
                    mornings: [parsedMorningCustom, parsedMorningCustom2],
                    myMornings: [parsedMorningCustom, parsedMorningCustom2],
                    empty: [],
                    nested: {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorningCustom,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorningCustom, parsedMorningCustom2],
                        myMornings: [parsedMorningCustom, parsedMorningCustom2],
                        empty: [],
                    },
                },
                list: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorningCustom,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorningCustom, parsedMorningCustom2],
                        myMornings: [parsedMorningCustom, parsedMorningCustom2],
                        empty: [],
                    },
                ],
                listMaybe: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorningCustom,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorningCustom, parsedMorningCustom2],
                        myMornings: [parsedMorningCustom, parsedMorningCustom2],
                        empty: [],
                    },
                ],
                sureList: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorningCustom,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorningCustom, parsedMorningCustom2],
                        myMornings: [parsedMorningCustom, parsedMorningCustom2],
                        empty: [],
                    },
                ],
                reallySureList: [
                    {
                        __typename: "MyObject",
                        day: parsedDay,
                        morning: parsedMorningCustom,
                        days: [parsedDay, parsedDay2],
                        sureDays: [parsedDay, parsedDay2],
                        mornings: [parsedMorningCustom, parsedMorningCustom2],
                        myMornings: [parsedMorningCustom, parsedMorningCustom2],
                        empty: [],
                    },
                ],
            },
        };
        const observable = core_1.execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFyLWZyb20tb2JqZWN0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL3NjYWxhci1mcm9tLW9iamVjdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlHO0FBQ3pHLHdEQUE0RDtBQUM1RCxrREFBNkQ7QUFDN0QscUNBQTJEO0FBQzNELDBCQUFpQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxVQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F5Qm5CLENBQUM7QUFFRixNQUFNLFVBQVU7SUFDZCxZQUFxQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFHLENBQUM7SUFFNUIsV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBRUQsTUFBTSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7QUFDMUMsTUFBTSxPQUFPLEdBQUcsMEJBQTBCLENBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsMEJBQTBCLENBQUM7QUFDOUMsTUFBTSxXQUFXLEdBQUcsMEJBQTBCLENBQUM7QUFFL0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxRCxNQUFNLG9CQUFvQixHQUFHLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVELE1BQU0sU0FBUyxHQUFHO0lBQ2hC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