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
                days: [parsedDay, parsedDay2],
                sureDays: [parsedDay, parsedDay2],
                mornings: [parsedMorning, parsedMorning2],
                myMornings: [parsedMorning, parsedMorning2],
                empty: [],
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
                days: [parsedDay, parsedDay2],
                sureDays: [parsedDay, parsedDay2],
                mornings: [parsedMorningCustom, parsedMorningCustom2],
                myMornings: [parsedMorningCustom, parsedMorningCustom2],
                empty: [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFyLWFycmF5LWZyb20tcXVlcnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vc2NhbGFyLWFycmF5LWZyb20tcXVlcnkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUF5RztBQUN6Ryx3REFBNEQ7QUFDNUQsa0RBQTZEO0FBQzdELHFDQUEyRDtBQUMzRCwwQkFBaUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsVUFBRyxDQUFBOzs7Ozs7Ozs7Ozs7O0NBYW5CLENBQUM7QUFFRixNQUFNLFVBQVU7SUFDZCxZQUFxQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFHLENBQUM7SUFFNUIsV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBRUQsTUFBTSxNQUFNLEdBQUcsMEJBQTBCLENBQUM7QUFDMUMsTUFBTSxPQUFPLEdBQUcsMEJBQTBCLENBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsMEJBQTBCLENBQUM7QUFDOUMsTUFBTSxXQUFXLEdBQUcsMEJBQTBCLENBQUM7QUFFL0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0MsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxRCxNQUFNLG9CQUFvQixHQUFHLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVELE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7UUFDbkMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUN2QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0tBQ2hCO0lBQ0QsSUFBSSxFQUFFLElBQUksMkJBQWlCLENBQUM7UUFDMUIsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQyxNQUFtQixFQUFFLEVBQUUsQ0FBQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxFQUFFO1FBQ3pELFVBQVUsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM5QyxZQUFZLENBQUMsR0FBRztZQUNkLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxjQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLEdBQUcsRUFBRTtnQkFDckQsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FDRixDQUFDO0lBQ0YsVUFBVSxFQUFFLElBQUksMkJBQWlCLENBQUM7UUFDaEMsSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLENBQUMsTUFBbUIsRUFBRSxFQUFFLENBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsRUFBRTtRQUN6RCxVQUFVLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN0QixNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsWUFBWSxDQUFDLEdBQUc7WUFDZCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGNBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JELE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNmLFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSxDQUFDLE1BQWdDLEVBQUUsRUFBRSxDQUFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxXQUFXLEVBQUU7UUFDdEUsVUFBVSxFQUFFLENBQUMsR0FBUSxFQUFxQixFQUFFO1lBQzFDLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyw2QkFBb0IsQ0FBQztJQUNsQyxRQUFRO0lBQ1IsU0FBUztDQUNWLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHOzs7Ozs7OztDQVFuQixDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQWlCLFVBQUcsQ0FBQTtJQUNuQyxXQUFXO0NBQ2QsQ0FBQztBQUNGLE1BQU0sa0JBQWtCLEdBQUcsNEJBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0QsSUFBSSxDQUFDLGtCQUFrQjtJQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RSxNQUFNLE9BQU8sR0FBbUI7SUFDOUIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsU0FBUyxFQUFFLEVBQUU7SUFDYixhQUFhLEVBQUUsa0JBQWtCO0NBQ2xDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNmLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7UUFDdkIsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUMzQixRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO1FBQ25DLFVBQVUsRUFBRSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7UUFDckMsS0FBSyxFQUFFLEVBQUU7S0FDVjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsbURBQW1ELEVBQUUsR0FBRyxFQUFFO0lBQ2pFLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFDdkMsTUFBTSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrSUFBa0ksRUFBRSxHQUFTLEVBQUU7UUFDaEosTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLGFBQWEsR0FBRyxNQUFNLGlCQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xFLE1BQU0sSUFBSSxHQUFHLGlCQUFVLENBQUMsSUFBSSxDQUFDO1lBQzNCLGVBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3ZCLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8saUJBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztZQUN2QixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQkFDakMsUUFBUSxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztnQkFDekMsVUFBVSxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztnQkFDM0MsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDeEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4RSxNQUFNLElBQUksR0FBRyxpQkFBVSxDQUFDLElBQUksQ0FBQztZQUMzQixlQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFDakMsSUFBSSxpQkFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsT0FBTyxpQkFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxNQUFNLGdCQUFnQixHQUFHO1lBQ3ZCLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO2dCQUM3QixRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztnQkFDckQsVUFBVSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDRixDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsY0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==