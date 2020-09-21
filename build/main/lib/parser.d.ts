import { GraphQLEnumType, GraphQLFieldMap, GraphQLInputFieldMap, GraphQLInputObjectType, GraphQLInputType, GraphQLInterfaceType, GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLScalarType, GraphQLSchema, GraphQLUnionType } from "graphql";
import { FunctionsMap } from "..";
import { MutOrRO } from "../types/mut-or-ro";
import { ReducedFieldNode } from "./node-types";
declare type Data = {
    [key: string]: any;
};
export declare class Parser {
    readonly schema: GraphQLSchema;
    readonly functionsMap: FunctionsMap;
    readonly validateEnums: boolean;
    constructor(schema: GraphQLSchema, functionsMap: FunctionsMap, validateEnums: boolean);
    parseObjectWithSelections(data: Data, type: GraphQLObjectType | GraphQLInputObjectType, selections: MutOrRO<ReducedFieldNode[]>): Data;
    protected treatSelection(data: Data, fieldMap: GraphQLInputFieldMap | GraphQLFieldMap<any, any>, fieldNode: ReducedFieldNode): Data;
    protected treatValue(value: any, givenType: GraphQLOutputType | GraphQLInputType, fieldNode: ReducedFieldNode): any;
    protected parseScalar(value: any, type: GraphQLScalarType): any;
    protected validateEnum(value: any, type: GraphQLEnumType): void;
    protected parseArray(value: any, type: GraphQLList<GraphQLOutputType>, fieldNode: ReducedFieldNode): any;
    protected parseNestedObject(value: any, givenType: GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType | GraphQLInputObjectType, fieldNode: ReducedFieldNode): any;
    protected getObjectTypeFrom(value: any, type: GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType | GraphQLInputObjectType): GraphQLObjectType | GraphQLInputObjectType | null;
}
export {};
