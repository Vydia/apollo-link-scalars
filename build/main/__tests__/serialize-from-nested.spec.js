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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@apollo/client/core");
const utilities_1 = require("@apollo/client/utilities");
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const lodash_isnumber_1 = __importDefault(require("lodash.isnumber"));
const lodash_isstring_1 = __importDefault(require("lodash.isstring"));
const __1 = require("..");
const typeDefs = core_1.gql `
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
    Date: new graphql_1.GraphQLScalarType({
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
            if (lodash_isstring_1.default(raw) || lodash_isnumber_1.default(raw)) {
                return new MainDate(raw);
            }
            throw new Error(`given date to parse is not a string or a number!!: ${raw}`);
        },
        parseLiteral(ast) {
            if (ast.kind === graphql_1.Kind.STRING || ast.kind === graphql_1.Kind.INT) {
                return new MainDate(ast.value);
            }
            return null;
        },
    }),
    StartOfDay: new graphql_1.GraphQLScalarType({
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
            if (lodash_isstring_1.default(raw) || lodash_isnumber_1.default(raw)) {
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
            if (ast.kind === graphql_1.Kind.STRING || ast.kind === graphql_1.Kind.INT) {
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
const schema = schema_1.makeExecutableSchema({
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
const queryDocument = core_1.gql `
  ${querySource}
`;
const queryOperationName = utilities_1.getOperationName(queryDocument);
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
    it("ensure the response and request fixtures are valid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const queryResponse = yield graphql_1.graphql({
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
    }));
    it("use the scalar resolvers in the schema to serialize (without removeTypenameFromInputs)", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema }),
            new core_1.ApolloLink((operation) => {
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
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
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
        const observable = core_1.execute(link, lodash_clonedeep_1.default(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("use the scalar resolvers in the schema to serialize (with removeTypenameFromInputs -> removes __typename)", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, removeTypenameFromInputs: true }),
            new core_1.ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        first: rawDay,
                        second: {
                            morning: rawMorning,
                            list: [rawMorning, rawMorning2],
                        },
                    },
                });
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
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
        const observable = core_1.execute(link, lodash_clonedeep_1.default(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("override the scala resolvers with the custom functions map (without removeTypenameFromInputs)", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, typesMap }),
            new core_1.ApolloLink((operation) => {
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
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
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
        const observable = core_1.execute(link, lodash_clonedeep_1.default(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("override the scala resolvers with the custom functions map (with removeTypenameFromInputs -> removes __typename)", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, typesMap, removeTypenameFromInputs: true }),
            new core_1.ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    input: {
                        first: rawDay,
                        second: { morning: rawMorning, list: [rawMorning, rawMorning2] },
                    },
                });
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
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
        const observable = core_1.execute(link, lodash_clonedeep_1.default(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLWZyb20tbmVzdGVkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL3NlcmlhbGl6ZS1mcm9tLW5lc3RlZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlHO0FBQ3pHLHdEQUE0RDtBQUM1RCxrREFBNkQ7QUFDN0QscUNBQTJEO0FBQzNELHdFQUF5QztBQUN6QyxzRUFBdUM7QUFDdkMsc0VBQXVDO0FBQ3ZDLDBCQUFpQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxVQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQThCbkIsQ0FBQztBQU9GLE1BQU0sVUFBVTtJQUVkLFlBQVksQ0FBUztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRjtBQUVELGdEQUFnRDtBQUNoRCxNQUFNLFFBQVE7SUFFWixZQUFZLENBQWtCO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBRUQsTUFBTSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7QUFDMUMsTUFBTSxVQUFVLEdBQUcsMEJBQTBC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