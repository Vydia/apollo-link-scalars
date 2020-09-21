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
const schema = schema_1.makeExecutableSchema({
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
    it("ensure the response fixture is valid (ensure that in the response we have the RAW, the Server is converting from Date to STRING)", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const queryResponse = yield graphql_1.graphql(schema, querySource);
        expect(queryResponse).toEqual(validResponse);
    }));
    describe("with valid enum values", () => {
        it("validateEnums false (or missing) => return response", (done) => {
            const link = core_1.ApolloLink.from([
                __1.withScalars({ schema, validateEnums: false }),
                new core_1.ApolloLink(() => {
                    return core_1.Observable.of(validResponse);
                }),
            ]);
            const observable = core_1.execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(validResponse);
                done();
            });
            expect.assertions(1);
        });
        it("validateEnums false (or missing) => return response", (done) => {
            const link = core_1.ApolloLink.from([
                __1.withScalars({ schema, validateEnums: true }),
                new core_1.ApolloLink(() => {
                    return core_1.Observable.of(validResponse);
                }),
            ]);
            const observable = core_1.execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(validResponse);
                done();
            });
            expect.assertions(1);
        });
    });
    describe("with invalid enum values", () => {
        it("validateEnums false (or missing) => return invalid response", (done) => {
            const link = core_1.ApolloLink.from([
                __1.withScalars({ schema, validateEnums: false }),
                new core_1.ApolloLink(() => {
                    return core_1.Observable.of(invalidResponse);
                }),
            ]);
            const observable = core_1.execute(link, request);
            observable.subscribe((value) => {
                expect(value).toEqual(invalidResponse);
                done();
            });
            expect.assertions(1);
        });
        it("validateEnums true => return error", (done) => {
            const link = core_1.ApolloLink.from([
                __1.withScalars({ schema, validateEnums: true }),
                new core_1.ApolloLink(() => {
                    return core_1.Observable.of(invalidResponse);
                }),
            ]);
            const observable = core_1.execute(link, request);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZW51bXMtZnJvbS1xdWVyeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy92YWxpZGF0ZS1lbnVtcy1mcm9tLXF1ZXJ5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUc7QUFDekcsd0RBQTREO0FBQzVELGtEQUE2RDtBQUM3RCxxQ0FBa0M7QUFDbEMsMEJBQWlDO0FBRWpDLE1BQU0sUUFBUSxHQUFHLFVBQUcsQ0FBQTs7Ozs7Ozs7Ozs7O0NBWW5CLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztRQUNqQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtLQUNsQjtDQUNGLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyw2QkFBb0IsQ0FBQztJQUNsQyxRQUFRO0lBQ1IsU0FBUztDQUNWLENBQUMsQ0FBQztBQUVILE1BQU0sV0FBVyxHQUFHOzs7Ozs7Ozs7Q0FTbkIsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFpQixVQUFHLENBQUE7SUFDbkMsV0FBVztDQUNkLENBQUM7QUFDRixNQUFNLGtCQUFrQixHQUFHLDRCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNELElBQUksQ0FBQyxrQkFBa0I7SUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFekUsTUFBTSxPQUFPLEdBQW1CO0lBQzlCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsYUFBYSxFQUFFLGtCQUFrQjtDQUNsQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUc7SUFDcEIsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztR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