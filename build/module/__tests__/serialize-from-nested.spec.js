import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLScalarType, Kind } from "graphql";
import cloneDeep from "lodash.clonedeep";
import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";
import { withScalars } from "..";
const typeDefs = gql `
  type Query {
    convert(input: MyInput!): MyResponse!
  }

  input MyInput {
    first: Date!
    second: MyNested!
  }

  input MyNested {
    morning: StartOfDay!
    list: [StartOfDay!]!
  }

  type MyResponse {
    first: StartOfDay!
    nested: MyNestedResponse
  }

  type MyNestedResponse {
    nestedDay: Date!
    days: [Date!]!
  }

  "represents a Date with time"
  scalar Date

  "represents a Date at the beginning of the UTC day"
  scalar StartOfDay
`;
class CustomDate {
    constructor(s) {
        this.internalDate = new Date(s);
    }
    toISOString() {
        return this.internalDate.toISOString();
    }
    getNewDate() {
        return new Date(this.internalDate);
    }
}
// tslint:disable-next-line:max-classes-per-file
class MainDate {
    constructor(s) {
        this.internalDate = new Date(s);
    }
    toISOString() {
        return this.internalDate.toISOString();
    }
    getNewDate() {
        return new Date(this.internalDate);
    }
}
const rawDay = "2018-02-03T12:13:14.000Z";
const rawMorning = "2018-02-03T00:00:00.000Z";
const parsedDay = new MainDate(rawDay);
const parsedMorning = new MainDate(rawMorning);
const parsedMorningCustom = new CustomDate(rawMorning);
const rawDay2 = "2018-03-04T12:13:14.000Z";
const rawMorning2 = "2018-03-04T00:00:00.000Z";
const parsedDay2 = new MainDate(rawDay2);
const parsedMorning2 = new MainDate(rawMorning2);
// const parsedMorningCustom2 = new CustomDate(rawMorning2);
function toStartOfDay(givenDate) {
    const d = givenDate.getNewDate();
    d.setUTCHours(0);
    d.setUTCMinutes(0);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);
    return new MainDate(d.toISOString());
}
function toDay(givenDate) {
    const d = givenDate.getNewDate();
    d.setUTCHours(12);
    d.setUTCMinutes(13);
    d.setUTCSeconds(14);
    d.setUTCMilliseconds(0);
    return new MainDate(d.toISOString());
}
const resolvers = {
    Query: {
        convert: (_root, { input }) => {
            return {
                first: toStartOfDay(input.first),
                nested: {
                    nestedDay: toDay(input.second.morning),
                    days: input.second.list.map(toDay),
                },
            };
        },
    },
    Date: new GraphQLScalarType({
        name: "Date",
        serialize: (parsed) => {
            if (!parsed)
                return parsed;
            // @ts-ignore
            if (!parsed instanceof MainDate) {
                throw new Error(`given date is not a MainDate!!: ${parsed}`);
            }
            return parsed.toISOString();
        },
        parseValue: (raw) => {
            if (!raw)
                return raw;
            if (isString(raw) || isNumber(raw)) {
                return new MainDate(raw);
            }
            throw new Error(`given date to parse is not a string or a number!!: ${raw}`);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
                return new MainDate(ast.value);
            }
            return null;
        },
    }),
    StartOfDay: new GraphQLScalarType({
        name: "StartOfDay",
        serialize: (parsed) => {
            if (!parsed)
                return parsed;
            // @ts-ignore
            if (!parsed instanceof MainDate) {
                throw new Error(`given date is not a Date!!: ${parsed}`);
            }
            return parsed.toISOString();
        },
        parseValue: (raw) => {
            if (!raw)
                return raw;
            if (isString(raw) || isNumber(raw)) {
                const d = new Date(raw);
                d.setUTCHours(0);
                d.setUTCMinutes(0);
                d.setUTCSeconds(0);
                d.setUTCMilliseconds(0);
                return new MainDate(d.toISOString());
            }
            throw new Error(`given date to parse is not a string or a number!!: ${raw}`);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
                const d = new Date(ast.value);
                d.setUTCHours(0);
                d.setUTCMinutes(0);
                d.setUTCSeconds(0);
                d.setUTCMilliseconds(0);
                return new MainDate(d.toISOString());
            }
            return null;
        },
    }),
};
const typesMap = {
    StartOfDay: {
        serialize: (parsed) => {
            if (!parsed)
                return parsed;
            // @ts-ignore
            if (!parsed instanceof CustomDate) {
                throw new Error(`given date is not a Date!!: ${parsed}`);
            }
            return parsed.toISOString();
        },
        parseValue: (raw) => {
            if (!raw)
                return null;
            const d = new Date(raw);
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            return new CustomDate(d.toISOString());
        },
    },
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const querySource = `
  query MyQuery($input: MyInput!) {
    convert(input: $input) {
      first
      nested {
        nestedDay
        days
      }
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
    variables: {
        input: {
            __typename: "MyInput",
            first: parsedDay,
            second: {
                __typename: "MyNested",
                morning: parsedMorning,
                list: [parsedMorning, parsedMorning2],
            },
        },
    },
    operationName: queryOperationName,
};
const response = {
    data: {
        convert: {
            first: rawMorning,
            nested: { nestedDay: rawDay, days: [rawDay, rawDay2] },
        },
    },
};
describe("scalars in nested input objects", () => {
    it("stringify of custom dates is not the same as toISOString()", () => {
        expect(JSON.stringify(parsedDay)).not.toEqual(rawDay);
    });
    it("can compare 2 custom dates ok", () => {
        const a = new CustomDate("2018-01-01T00:00:00.000Z");
        const b = new CustomDate("2018-01-01T00:00:00.000Z");
        const c = new CustomDate("2018-02-03T00:00:00.000Z");
        expect(a).toEqual(b);
        expect(a).not.toEqual(c);
    });
    it("can compare 2 MainDates ok", () => {
        const a = new MainDate("2018-01-01T00:00:00.000Z");
        const b = new MainDate("2018-01-01T00:00:00.000Z");
        const c = new MainDate("2018-02-03T00:00:00.000Z");
        expect(a).toEqual(b);
        expect(a).not.toEqual(c);
    });
    it("ensure the response and request fixtures are valid", async () => {
        expect.assertions(1);
        const queryResponse = await graphql({
            schema,
            source: querySource,
            variableValues: {
                input: {
                    first: rawDay,
                    second: { morning: rawMorning, list: [rawMorning, rawMorning2] },
                },
            },
        });
        expect(queryResponse).toEqual(response);
    });
    it("use the scalar resolvers in the schema to serialize (without removeTypenameFromInputs)", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema }),
            new ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        __typename: "MyInput",
                        first: rawDay,
                        second: {
                            __typename: "MyNested",
                            morning: rawMorning,
                            list: [rawMorning, rawMorning2],
                        },
                    },
                });
                return Observable.of(cloneDeep(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convert: {
                    first: parsedMorning,
                    nested: { nestedDay: parsedDay, days: [parsedDay, parsedDay2] },
                },
            },
        };
        const observable = execute(link, cloneDeep(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("use the scalar resolvers in the schema to serialize (with removeTypenameFromInputs -> removes __typename)", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema, removeTypenameFromInputs: true }),
            new ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        first: rawDay,
                        second: {
                            morning: rawMorning,
                            list: [rawMorning, rawMorning2],
                        },
                    },
                });
                return Observable.of(cloneDeep(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convert: {
                    first: parsedMorning,
                    nested: { nestedDay: parsedDay, days: [parsedDay, parsedDay2] },
                },
            },
        };
        const observable = execute(link, cloneDeep(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("override the scala resolvers with the custom functions map (without removeTypenameFromInputs)", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema, typesMap }),
            new ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        __typename: "MyInput",
                        first: rawDay,
                        second: {
                            __typename: "MyNested",
                            morning: rawMorning,
                            list: [rawMorning, rawMorning2],
                        },
                    },
                });
                return Observable.of(cloneDeep(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convert: {
                    first: parsedMorningCustom,
                    nested: { nestedDay: parsedDay, days: [parsedDay, parsedDay2] },
                },
            },
        };
        const observable = execute(link, cloneDeep(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("override the scala resolvers with the custom functions map (with removeTypenameFromInputs -> removes __typename)", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema, typesMap, removeTypenameFromInputs: true }),
            new ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        first: rawDay,
                        second: { morning: rawMorning, list: [rawMorning, rawMorning2] },
                    },
                });
                return Observable.of(cloneDeep(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convert: {
                    first: parsedMorningCustom,
                    nested: { nestedDay: parsedDay, days: [parsedDay, parsedDay2] },
                },
            },
        };
        const observable = execute(link, cloneDeep(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLWZyb20tbmVzdGVkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL3NlcmlhbGl6ZS1mcm9tLW5lc3RlZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE9BQU8sRUFBRSxHQUFHLEVBQWtCLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzNELE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E4Qm5CLENBQUM7QUFPRixNQUFNLFVBQVU7SUFFZCxZQUFZLENBQVM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFFRCxnREFBZ0Q7QUFDaEQsTUFBTSxRQUFRO0lBRVosWUFBWSxDQUFrQjtRQUM1QixJQUFJLENBQUMsWUFB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