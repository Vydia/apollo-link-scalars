import { GraphQLLeafType, GraphQLScalarSerializer, GraphQLScalarValueParser } from "graphql";
export declare type ParsingFunctionsObject<TParsed = any, TRaw = any> = {
    serialize: GraphQLScalarSerializer<TRaw>;
    parseValue: GraphQLScalarValueParser<TParsed>;
};
export declare type FunctionsMap = {
    [key: string]: GraphQLLeafType | ParsingFunctionsObject;
};
