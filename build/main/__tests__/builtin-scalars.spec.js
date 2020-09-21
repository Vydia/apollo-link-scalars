"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@apollo/client/core");
const utilities_1 = require("@apollo/client/utilities");
const schema_1 = require("@graphql-tools/schema");
const __1 = require("..");
const typeDefs = core_1.gql `
  type Query {
    day: String
  }
`;
const schema = schema_1.makeExecutableSchema({ typeDefs });
const queryDocument = core_1.gql `
  query MyQuery {
    day
  }
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
        day: null,
    },
};
describe("builtin scalars behave like usual", () => {
    it("parses null values for nullable leaf types", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema }),
            new core_1.ApolloLink(() => {
                return core_1.Observable.of(response);
            }),
        ]);
        const observable = core_1.execute(link, request);
        observable.subscribe((result) => {
            expect(result).toEqual({ data: { day: null } });
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbHRpbi1zY2FsYXJzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL2J1aWx0aW4tc2NhbGFycy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXlHO0FBQ3pHLHdEQUE0RDtBQUM1RCxrREFBNkQ7QUFDN0QsMEJBQWlDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQUcsQ0FBQTs7OztDQUluQixDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsNkJBQW9CLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBRWxELE1BQU0sYUFBYSxHQUFpQixVQUFHLENBQUE7Ozs7Q0FJdEMsQ0FBQztBQUNGLE1BQU0sa0JBQWtCLEdBQUcsNEJBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0QsSUFBSSxDQUFDLGtCQUFrQjtJQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUV6RSxNQUFNLE9BQU8sR0FBbUI7SUFDOUIsS0FBSyxFQUFFLGFBQWE7SUFDcEIsU0FBUyxFQUFFLEVBQUU7SUFDYixhQUFhLEVBQUUsa0JBQWtCO0NBQ2xDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNmLElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxJQUFJO0tBQ1Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsRUFBRTtJQUNqRCxFQUFFLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4RCxNQUFNLElBQUksR0FBRyxpQkFBVSxDQUFDLElBQUksQ0FBQztZQUMzQixlQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2QixJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixPQUFPLGlCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=