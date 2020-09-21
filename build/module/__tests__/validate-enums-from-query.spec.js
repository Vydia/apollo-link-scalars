import { ApolloLink, execute, gql, Observable } from "@apollo/client/core";
import { getOperationName } from "@apollo/client/utilities";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import { withScalars } from "..";
const typeDefs = gql `
  type Query {
    first: MyEnum
    second: MyEnum!
    third: MyEnum
  }

  enum MyEnum {
    a
    b
    c
  }
`;
const resolvers = {
    Query: {
        first: () => "a",
        second: () => "b",
        third: () => null,
    },
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const querySource = `
  query MyQuery {
    first
    second
    third
    otherFirst: first
    otherSecond: second
    otherThird: third
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
const validResponse = {
    data: {
        first: "a",
        second: "b",
        third: null,
        otherFirst: "a",
        otherSecond: "b",
        otherThird: null,
    },
};
const invalidResponse = {
    data: {
        first: "a",
        second: "b",
        third: null,
        otherFirst: "invalid",
        otherSecond: "b",
        otherThird: null,
    },
};
describe("enum returned directly from first level queries", () => {
    it("ensure the response fixture is valid (ensure that in the response we have the RAW, the Server is converting from Date to STRING)", async () => {
        expect.assertions(1);
        const queryResponse = await graphql(schema, querySource);
        expect(queryResponse).toEqual(validResponse);
    });
    describe("with valid enum values", () => {
        it("validateEnums false (or missing) => return response", (done) => {
            const link = ApolloLink.from([
                withScalars({ schema, validateEnums: false }),
                new ApolloLink(() => {
                    return Observable.of(validResponse);
                }),
            ]);
            const observable = execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(validResponse);
                done();
            });
            expect.assertions(1);
        });
        it("validateEnums false (or missing) => return response", (done) => {
            const link = ApolloLink.from([
                withScalars({ schema, validateEnums: true }),
                new ApolloLink(() => {
                    return Observable.of(validResponse);
                }),
            ]);
            const observable = execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(validResponse);
                done();
            });
            expect.assertions(1);
        });
    });
    describe("with invalid enum values", () => {
        it("validateEnums false (or missing) => return invalid response", (done) => {
            const link = ApolloLink.from([
                withScalars({ schema, validateEnums: false }),
                new ApolloLink(() => {
                    return Observable.of(invalidResponse);
                }),
            ]);
            const observable = execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(invalidResponse);
                done();
            });
            expect.assertions(1);
        });
        it("validateEnums true => return error", (done) => {
            const link = ApolloLink.from([
                withScalars({ schema, validateEnums: true }),
                new ApolloLink(() => {
                    return Observable.of(invalidResponse);
                }),
            ]);
            const observable = execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual({
                    errors: [
                        {
                            message: `enum "MyEnum" with invalid value`,
                        },
                    ],
                });
                done();
            });
            expect.assertions(1);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZW51bXMtZnJvbS1xdWVyeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy92YWxpZGF0ZS1lbnVtcy1mcm9tLXF1ZXJ5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsT0FBTyxFQUFFLEdBQUcsRUFBa0IsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWW5CLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNqQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNsQjtDQUNGLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztJQUNsQyxRQUFRO0lBQ1IsU0FBUztDQUNWLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHOzs7Ozs7Ozs7Q0FTbkIsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFpQixHQUFHLENBQUE7SUFDbkMsV0FBVztDQUNkLENBQUM7QUFDRixNQUFNLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNELElBQUksQ0FBQyxrQkFBa0I7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFF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