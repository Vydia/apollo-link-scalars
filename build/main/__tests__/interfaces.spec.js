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
    listA: [IntA]
    listB: [IntB]
  }

  interface IntA {
    day: Date
  }

  interface IntB {
    morning: StartOfDay!
  }

  type TypeA implements IntA {
    day: Date
    extraA: Date
    nestedB: IntB
  }

  type TypeOtherA implements IntA {
    day: Date
    morning: StartOfDay!
    nestedList: [IntA]
  }

  type TypeB implements IntB {
    morning: StartOfDay!
    extraB: Date
    nestedA: IntA
  }

  type TypeOtherB implements IntB {
    morning: StartOfDay!
    stop: String!
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
        listA: () => [
            null,
            {
                __typename: "TypeA",
                day: parsedDay,
                extraA: parsedDay2,
                nestedB: {
                    __typename: "TypeB",
                    morning: parsedMorning,
                    extraB: parsedDay2,
                    nestedA: null,
                },
            },
            {
                __typename: "TypeOtherA",
                day: parsedDay2,
                morning: parsedMorning,
                nestedList: [
                    null,
                    {
                        __typename: "TypeA",
                        day: parsedDay2,
                        extraA: parsedDay,
                        nestedB: null,
                    },
                ],
            },
        ],
        listB: () => [
            null,
            {
                __typename: "TypeOtherB",
                morning: parsedMorning2,
                stop: "STOP",
            },
            {
                __typename: "TypeB",
                morning: parsedMorning,
                extraB: parsedDay2,
                nestedA: {
                    __typename: "TypeOtherA",
                    day: parsedDay,
                    morning: parsedMorning2,
                    nestedList: [
                        {
                            __typename: "TypeOtherA",
                            day: parsedDay2,
                            morning: parsedMorning,
                            nestedList: [],
                        },
                    ],
                },
            },
            null,
        ],
    },
    IntA: {
        __resolveType: (x) => (x.morning ? "TypeOtherA" : "TypeA"),
    },
    IntB: {
        __resolveType: (x) => (x.stop ? "TypeOtherB" : "TypeB"),
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
    listA { ...IntA }
    listB { ...IntB }
  }

  fragment IntA on IntA {
    __typename
    day
    ... on TypeA {
      extraA
      nestedB {
        ...NestedB
      }
    }
    ... on TypeOtherA {
      morning
      nestedList {
        ...NestedA
      }
    }
  }

  fragment NestedA on IntA {
    __typename
    day
    ... on TypeA {
      extraA
    }
    ... on TypeOtherA {
      morning
    }
  }

  fragment IntB on IntB {
    __typename
    morning
    ... on TypeB {
      extraB
      nestedA {
        ...NestedA
      }
    }
    ... on TypeOtherB {
      stop
    }
  }

  fragment NestedB on IntB {
    __typename
    morning
    ... on TypeB {
      extraB
    }
    ... on TypeOtherB {
      stop
    }
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
        listA: [
            null,
            {
                __typename: "TypeA",
                day: rawDay,
                extraA: rawDay2,
                nestedB: {
                    __typename: "TypeB",
                    morning: rawMorning,
                    extraB: rawDay2,
                },
            },
            {
                __typename: "TypeOtherA",
                day: rawDay2,
                morning: rawMorning,
                nestedList: [
                    null,
                    {
                        __typename: "TypeA",
                        day: rawDay2,
                        extraA: rawDay,
                    },
                ],
            },
        ],
        listB: [
            null,
            {
                __typename: "TypeOtherB",
                morning: rawMorning2,
                stop: "STOP",
            },
            {
                __typename: "TypeB",
                morning: rawMorning,
                extraB: rawDay2,
                nestedA: {
                    __typename: "TypeOtherA",
                    day: rawDay,
                    morning: rawMorning2,
                },
            },
            null,
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
                listA: [
                    null,
                    {
                        __typename: "TypeA",
                        day: parsedDay,
                        extraA: parsedDay2,
                        nestedB: {
                            __typename: "TypeB",
                            morning: parsedMorning,
                            extraB: parsedDay2,
                        },
                    },
                    {
                        __typename: "TypeOtherA",
                        day: parsedDay2,
                        morning: parsedMorning,
                        nestedList: [
                            null,
                            {
                                __typename: "TypeA",
                                day: parsedDay2,
                                extraA: parsedDay,
                            },
                        ],
                    },
                ],
                listB: [
                    null,
                    {
                        __typename: "TypeOtherB",
                        morning: parsedMorning2,
                        stop: "STOP",
                    },
                    {
                        __typename: "TypeB",
                        morning: parsedMorning,
                        extraB: parsedDay2,
                        nestedA: {
                            __typename: "TypeOtherA",
                            day: parsedDay,
                            morning: parsedMorning2,
                        },
                    },
                    null,
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
    it("override the scala resolvers with the custom functions map (removes `__typename` of inputs)", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, typesMap }),
            new core_1.ApolloLink(() => {
                return core_1.Observable.of(response);
            }),
        ]);
        const expectedResponse = {
            data: {
                listA: [
                    null,
                    {
                        __typename: "TypeA",
                        day: parsedDay,
                        extraA: parsedDay2,
                        nestedB: {
                            __typename: "TypeB",
                            morning: parsedMorningCustom,
                            extraB: parsedDay2,
                        },
                    },
                    {
                        __typename: "TypeOtherA",
                        day: parsedDay2,
                        morning: parsedMorningCustom,
                        nestedList: [
                            null,
                            {
                                __typename: "TypeA",
                                day: parsedDay2,
                                extraA: parsedDay,
                            },
                        ],
                    },
                ],
                listB: [
                    null,
                    {
                        __typename: "TypeOtherB",
                        morning: parsedMorningCustom2,
                        stop: "STOP",
                    },
                    {
                        __typename: "TypeB",
                        morning: parsedMorningCustom,
                        extraB: parsedDay2,
                        nestedA: {
                            __typename: "TypeOtherA",
                            day: parsedDay,
                            morning: parsedMorningCustom2,
                        },
                    },
                    null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pbnRlcmZhY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUc7QUFDekcsd0RBQTREO0FBQzVELGtEQUE2RDtBQUM3RCxxQ0FBMkQ7QUFDM0QsMEJBQWlDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMENuQixDQUFDO0FBRUYsTUFBTSxVQUFVO0lBQ2QsWUFBcUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRTVCLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUVELE1BQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBQzFDLE1BQU0sT0FBTyxHQUFHLDBCQUEwQixDQUFDO0FBQzNDLE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO0FBQzlDLE1BQU0sV0FBVyxHQUFHLDBCQUEwQixDQUFDO0FBRS9DLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1RCxNQUFNLFNBQVMsR0FBRztJQUNo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