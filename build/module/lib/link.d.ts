/// <reference types="zen-observable" />
import { ApolloLink, FetchResult, NextLink, Observable, Operation } from "@apollo/client/core";
import { GraphQLSchema, NamedTypeNode, TypeNode } from "graphql";
import { FunctionsMap } from "..";
import { Serializer } from "./serializer";
declare type ScalarApolloLinkParams = {
    schema: GraphQLSchema;
    typesMap?: FunctionsMap;
    validateEnums?: boolean;
    removeTypenameFromInputs?: boolean;
};
export declare class ScalarApolloLink extends ApolloLink {
    readonly schema: GraphQLSchema;
    readonly typesMap: FunctionsMap;
    readonly validateEnums: boolean;
    readonly removeTypenameFromInputs: boolean;
    readonly functionsMap: FunctionsMap;
    readonly serializer: Serializer;
    constructor(pars: ScalarApolloLinkParams);
    request(givenOperation: Operation, forward: NextLink): Observable<FetchResult> | null;
    protected parse(operation: Operation, result: FetchResult): FetchResult;
    /**
     * mutate the operation object with the serialized variables
     * @param operation
     */
    protected cleanVariables(operation: Operation): Operation;
    protected serialize(value: any, typeNode: TypeNode): any;
    protected serializeNamed(value: any, typeNode: NamedTypeNode): any;
}
export declare const withScalars: (pars: ScalarApolloLinkParams) => ApolloLink;
export {};
