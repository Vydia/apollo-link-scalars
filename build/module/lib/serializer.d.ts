import { GraphQLEnumType, GraphQLInputObjectType, GraphQLInputType, GraphQLScalarType, GraphQLSchema } from "graphql";
import { FunctionsMap } from "..";
export declare class Serializer {
    readonly schema: GraphQLSchema;
    readonly functionsMap: FunctionsMap;
    readonly removeTypenameFromInputs: boolean;
    constructor(schema: GraphQLSchema, functionsMap: FunctionsMap, removeTypenameFromInputs: boolean);
    serialize(value: any, type: GraphQLInputType): any;
    protected serializeNullable(value: any, type: GraphQLInputType): any;
    protected serializeLeaf(value: any, type: GraphQLScalarType | GraphQLEnumType): any;
    protected serializeInputObject(givenValue: any, type: GraphQLInputObjectType): any;
}
