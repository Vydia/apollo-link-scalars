import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, GraphQLScalarType, Kind } from "graphql";
import { withScalars } from "..";
const typeDefs = gql `
  type Query {
    days: [Date]!
    sureDays: [Date!]!
    mornings: [StartOfDay!]!
    empty: [Date]!
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
        days: [rawDay, rawDay2],
        sureDays: [rawDay, rawDay2],
        mornings: [rawMorning, rawMorning2],
        myMornings: [rawMorning, rawMorning2],
        empty: [],
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
                days: [parsedDay, parsedDay2],
                sureDays: [parsedDay, parsedDay2],
                mornings: [parsedMorning, parsedMorning2],
                myMornings: [parsedMorning, parsedMorning2],
                empty: [],
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
                days: [parsedDay, parsedDay2],
                sureDays: [parsedDay, parsedDay2],
                mornings: [parsedMorningCustom, parsedMorningCustom2],
                myMornings: [parsedMorningCustom, parsedMorningCustom2],
                empty: [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFyLWFycmF5LWZyb20tcXVlcnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vc2NhbGFyLWFycmF5LWZyb20tcXVlcnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixPQUFPLEVBQUUsR0FBRyxFQUFrQixVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7OztDQWFuQixDQUFDO0FBRUYsTUFBTSxVQUFVO0lBQ2QsWUFBcUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRTVCLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUVELE1BQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBQzFDLE1BQU0sT0FBTyxHQUFHLDBCQUEwQixDQUFDO0FBQzNDLE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO0FBQzlDLE1BQU0sV0FBVyxHQUFHLDBCQUEwQixDQUFDO0FBRS9DLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FB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