import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import { withScalars } from "..";
const typeDefs = gql `
  type Query {
    item: Item!
  }

  type Item {
    title: String
    subItem: Item!
  }
`;
const resolvers = {
    Query: {
        item: () => ({}),
    },
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const querySource = `
  query MyQuery($skip: Boolean!) {
    item1: item @skip(if: $skip) {
		title
	}
    item2: item {
		title
		subItem @skip(if: $skip) {
			title
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
    variables: { skip: true },
    operationName: queryOperationName,
};
const response = {
    data: {
        item2: {
            title: null,
        },
    },
};
describe("skip directive on non-nullable field", () => {
    it("ensure the response fixture is valid", async () => {
        expect.assertions(1);
        const queryResponse = await graphql(schema, querySource, {}, {}, { skip: true });
        expect(queryResponse).toEqual(response);
    });
    it("disregards field type non-nullability", (done) => {
        const link = ApolloLink.from([
            withScalars({ schema }),
            new ApolloLink(() => {
                return Observable.of(response);
            }),
        ]);
        const expectedResponse = {
            data: {
                item2: {
                    title: null,
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLW5vbi1udWxsYWJpbGl0eS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pZ25vcmUtbm9uLW51bGxhYmlsaXR5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsT0FBTyxFQUFFLEdBQUcsRUFBa0IsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7O0NBU25CLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDakI7Q0FDRixDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsb0JBQW9CLENBQUM7SUFDbEMsUUFBUTtJQUNSLFNBQVM7Q0FDVixDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVcsR0FBRzs7Ozs7Ozs7Ozs7O0NBWW5CLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBaUIsR0FBRyxDQUFBO0lBQ25DLFdBQVc7Q0FDZCxDQUFDO0FBQ0YsTUFBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzRCxJQUFJLENBQUMsa0JBQWtCO0lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpFLE1BQU0sT0FBTyxHQUFtQjtJQUM5QixLQUFLLEVBQUUsYUFBYTtJQUNwQixTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3pCLGFBQWEsRUFBRSxrQkFBa0I7Q0FDbEMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHO0lBQ2YsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7SUFDcEQsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3BELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxhQUFhLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25ELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkIsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxnQkFBZ0IsR0FBRztZQUN2QixJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==