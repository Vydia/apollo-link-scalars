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
    "returns a Date object with time"
    convertToMorning(date: Date!): StartOfDay!
    convertToDay(date: StartOfDay!): Date!
    convertToDays(dates: [StartOfDay!]!): [Date!]!
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
const parsedMorningCustom2 = new CustomDate(rawMorning2);
const resolvers = {
    Query: {
        convertToMorning: (_root, { date }) => {
            const d = date.getNewDate();
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            return new MainDate(d.toISOString());
        },
        convertToDay: (_root, { date }) => {
            const d = date.getNewDate();
            d.setUTCHours(12);
            d.setUTCMinutes(13);
            d.setUTCSeconds(14);
            d.setUTCMilliseconds(0);
            return new MainDate(d.toISOString());
        },
        convertToDays: (_root, { dates }) => {
            return dates.map((date) => {
                const d = date.getNewDate();
                d.setUTCHours(12);
                d.setUTCMinutes(13);
                d.setUTCSeconds(14);
                d.setUTCMilliseconds(0);
                return new MainDate(d.toISOString());
            });
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
  query MyQuery($morning: StartOfDay!, $mornings: [StartOfDay!]!, $day: Date!) {
    convertToMorning(date: $day)
    convertToDay(date: $morning)
    convertToDays(dates: $mornings)
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
        day: parsedDay,
        morning: parsedMorning,
        mornings: [parsedMorning, parsedMorning2],
    },
    operationName: queryOperationName,
};
const response = {
    data: {
        convertToMorning: rawMorning,
        convertToDay: rawDay,
        convertToDays: [rawDay, rawDay2],
    },
};
describe("scalar returned directly from first level queries", () => {
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
                morning: rawMorning,
                day: rawDay,
                mornings: [rawMorning, rawMorning2],
            },
        });
        expect(queryResponse).toEqual(response);
    }));
    it("use the scalar resolvers in the schema to serialize", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema }),
            new core_1.ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    morning: rawMorning,
                    day: rawDay,
                    mornings: [rawMorning, rawMorning2],
                });
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convertToDay: parsedDay,
                convertToDays: [parsedDay, parsedDay2],
                convertToMorning: parsedMorning,
            },
        };
        const observable = core_1.execute(link, lodash_clonedeep_1.default(request));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
    it("override the scala resolvers with the custom functions map", (done) => {
        const customRequest = {
            query: Object.assign({}, queryDocument),
            variables: {
                morning: parsedMorningCustom,
                mornings: [parsedMorningCustom, parsedMorningCustom2],
                day: parsedDay,
            },
            operationName: queryOperationName,
        };
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema, typesMap }),
            new core_1.ApolloLink((operation) => {
                expect(operation.variables).toEqual({
                    morning: rawMorning,
                    mornings: [rawMorning, rawMorning2],
                    day: rawDay,
                });
                return core_1.Observable.of(lodash_clonedeep_1.default(response));
            }),
        ]);
        const expectedResponse = {
            data: {
                convertToDay: parsedDay,
                convertToDays: [parsedDay, parsedDay2],
                convertToMorning: parsedMorningCustom,
            },
        };
        const observable = core_1.execute(link, lodash_clonedeep_1.default(customRequest));
        observable.subscribe((value) => {
            expect(value).toEqual(expectedResponse);
            done();
        });
        expect.assertions(2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLWZyb20tcXVlcnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vc2VyaWFsaXplLWZyb20tcXVlcnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5RztBQUN6Ryx3REFBNEQ7QUFDNUQsa0RBQTZEO0FBQzdELHFDQUEyRDtBQUMzRCx3RUFBeUM7QUFDekMsc0VBQXVDO0FBQ3ZDLHNFQUF1QztBQUN2QywwQkFBaUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsVUFBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0NBYW5CLENBQUM7QUFFRixNQUFNLFVBQVU7SUFFZCxZQUFZLENBQVM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFFRCxnREFBZ0Q7QUFDaEQsTUFBTSxRQUFRO0lBRVosWUFBWSxDQUFrQjtRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRjtBQUVELE1BQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBQzFDLE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO0FBRTlDLE1BQU0sU0FB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