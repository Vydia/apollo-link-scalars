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
const schema = schema_1.makeExecutableSchema({
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
const queryDocument = core_1.gql `
  ${querySource}
`;
const queryOperationName = utilities_1.getOperationName(queryDocument);
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
    it("ensure the response fixture is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const queryResponse = yield graphql_1.graphql(schema, querySource, {}, {}, { skip: true });
        expect(queryResponse).toEqual(response);
    }));
    it("disregards field type non-nullability", (done) => {
        const link = core_1.ApolloLink.from([
            __1.withScalars({ schema }),
            new core_1.ApolloLink(() => {
                return core_1.Observable.of(response);
            }),
        ]);
        const expectedResponse = {
            data: {
                item2: {
                    title: null,
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlLW5vbi1udWxsYWJpbGl0eS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9pZ25vcmUtbm9uLW51bGxhYmlsaXR5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUc7QUFDekcsd0RBQTREO0FBQzVELGtEQUE2RDtBQUM3RCxxQ0FBa0M7QUFDbEMsMEJBQWlDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQUcsQ0FBQTs7Ozs7Ozs7O0NBU25CLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDakI7Q0FDRixDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsNkJBQW9CLENBQUM7SUFDbEMsUUFBUTtJQUNSLFNBQVM7Q0FDVixDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVcsR0FBRzs7Ozs7Ozs7Ozs7O0NBWW5CLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBaUIsVUFBRyxDQUFBO0lBQ25DLFdBQVc7Q0FDZCxDQUFDO0FBQ0YsTUFBTSxrQkFBa0IsR0FBRyw0QkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzRCxJQUFJLENBQUMsa0JBQWtCO0lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpFLE1BQU0sT0FBTyxHQUFtQjtJQUM5QixLQUFLLEVBQUUsYUFBYTtJQUNwQixTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3pCLGFBQWEsRUFBRSxrQkFBa0I7Q0FDbEMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHO0lBQ2YsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7SUFDcEQsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLEdBQVMsRUFBRTtRQUNwRCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuRCxNQUFNLElBQUksR0FBRyxpQkFBVSxDQUFDLElBQUksQ0FBQztZQUMzQixlQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2QixJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQixPQUFPLGlCQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztTQUNILENBQUMsQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkIsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=