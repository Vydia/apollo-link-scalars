import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { withScalars } from "..";
const typeDefs = gql `
  type Query {
    day: String
  }
`;
const schema = makeExecutableSchema({ typeDefs });
const queryDocument = gql `
  query MyQuery {
    day
  }
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
        day: null,
    },
};
describe("builtin scalars behave like usual", () => {
    it("parses null values for nullable leaf types", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema }),
            new ApolloLink(() => {
                return Observable.of(response);
            }),
        ]);
        const observable = execute(link, request);
        observable.subscribe((result) => {
            expect(result).toEqual({ data: { day: null } });
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbHRpbi1zY2FsYXJzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL2J1aWx0aW4tc2NhbGFycy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE9BQU8sRUFBRSxHQUFHLEVBQWtCLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFBOzs7O0NBSW5CLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFFbEQsTUFBTSxhQUFhLEdBQWlCLEdBQUcsQ0FBQTs7OztDQUl0QyxDQUFDO0FBQ0YsTUFBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzRCxJQUFJLENBQUMsa0JBQWtCO0lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpFLE1BQU0sT0FBTyxHQUFtQjtJQUM5QixLQUFLLEVBQUUsYUFBYTtJQUNwQixTQUFTLEVBQUUsRUFBRTtJQUNiLGFBQWEsRUFBRSxrQkFBa0I7Q0FDbEMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHO0lBQ2YsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLElBQUk7S0FDVjtDQUNGLENBQUM7QUFFRixRQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO0lBQ2pELEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==