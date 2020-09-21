import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLScalarType, Kind } from "graphql";
import { withScalars } from "..";
const typeDefs = gql `
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
    Date: new GraphQLScalarType({
        name: "Date",
        serialize: (parsed) => parsed === null || parsed === void 0 ? void 0 : parsed.toISOString(),
        parseValue: (raw) => raw && new Date(raw),
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
                return new Date(ast.value);
            }
            return null;
        },
    }),
    StartOfDay: new GraphQLScalarType({
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
            if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
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
const schema = makeExecutableSchema({
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
const queryDocument = gql `
  ${querySource}
`;
const queryOperationName = getOperationName(queryDocument);
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
    it("ensure the response fixture is valid (ensure that in the response we have the RAW, the Server is converting from Date to STRING)", async () => {
        expect.assertions(1);
        const queryResponse = await graphql(schema, querySource);
        expect(queryResponse).toEqual(response);
    });
    it("use the scalar resolvers in the schema to parse back", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema }),
            new ApolloLink(() => {
                return Observable.of(response);
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
        const observable = execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
    it("override the scala resolvers with the custom functions map", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema, typesMap }),
            new ApolloLink(() => {
                return Observable.of(response);
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
        const observable = execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFyLWZyb20tb2JqZWN0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL3NjYWxhci1mcm9tLW9iamVjdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE9BQU8sRUFBRSxHQUFHLEVBQWtCLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBeUJuQixDQUFDO0FBRUYsTUFBTSxVQUFVO0lBQ2QsWUFBcUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRTVCLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUVELE1BQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBQzFDLE1BQU0sT0FBTyxHQUFHLDBCQUEwQixDQUFDO0FBQzNDLE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO0FBQzlDLE1BQU0sV0FBVyxHQUFHLDBCQUEwQixDQUFDO0FBRS9DLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUs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