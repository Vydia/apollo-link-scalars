import { FetchResult, Operation } from "@apollo/client/core";
import { GraphQLSchema } from "graphql";
import { FunctionsMap } from "..";
declare type TreatResultParams = {
    schema: GraphQLSchema;
    functionsMap: FunctionsMap;
    operation: Operation;
    result: FetchResult;
    validateEnums: boolean;
};
export declare function treatResult({ schema, functionsMap, operation, result, validateEnums, }: TreatResultParams): FetchResult;
export {};
