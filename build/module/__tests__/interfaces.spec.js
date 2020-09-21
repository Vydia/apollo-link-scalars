import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLScalarType, Kind } from "graphql";
import { withScalars } from "..";
const typeDefs = gql `
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
        const observable = execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
    it("override the scala resolvers with the custom functions map (removes `__typename` of inputs)", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema, typesMap }),
            new ApolloLink(() => {
                return Observable.of(response);
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
        const observable = execute(link, request);
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pbnRlcmZhY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsT0FBTyxFQUFFLEdBQUcsRUFBa0IsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLElBQUksQ0FBQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBDbkIsQ0FBQztBQUVGLE1BQU0sVUFBVTtJQUNkLFlBQXFCLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUU1QixXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE1BQU0sR0FBRywwQkFBMEIsQ0FBQztBQUMxQyxNQUFNLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztBQUMzQyxNQUFNLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztBQUM5QyxNQUFNLFdBQVcsR0FBRywwQkFBMEIsQ0FBQztBQUUvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxNQUFNLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFV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