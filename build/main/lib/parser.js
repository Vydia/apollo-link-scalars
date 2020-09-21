"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const graphql_1 = require("graphql");
const lodash_reduce_1 = __importDefault(require("lodash.reduce"));
const is_none_1 = require("./is-none");
function ensureNullable(type) {
    return graphql_1.isNonNullType(type) ? type.ofType : type;
}
class Parser {
    constructor(schema, functionsMap, validateEnums) {
        this.schema = schema;
        this.functionsMap = functionsMap;
        this.validateEnums = validateEnums;
    }
    parseObjectWithSelections(data, type, selections) {
        const fieldMap = type.getFields();
        const fn = (d, fieldNode) => this.treatSelection(d, fieldMap, fieldNode);
        return lodash_reduce_1.default(selections, fn, data);
    }
    treatSelection(data, fieldMap, fieldNode) {
        const name = fieldNode.name.value;
        const field = fieldMap[name];
        if (!field)
            return data;
        const key = fieldNode.alias ? fieldNode.alias.value : fieldNode.name.value;
        data[key] = this.treatValue(data[key], field.type, fieldNode);
        return data;
    }
    treatValue(value, givenType, fieldNode) {
        const type = ensureNullable(givenType);
        if (is_none_1.isNone(value))
            return value;
        if (graphql_1.isScalarType(type)) {
            return this.parseScalar(value, type);
        }
        if (graphql_1.isEnumType(type)) {
            this.validateEnum(value, type);
            return value;
        }
        if (graphql_1.isListType(type)) {
            return this.parseArray(value, type, fieldNode);
        }
        return this.parseNestedObject(value, type, fieldNode);
    }
    parseScalar(value, type) {
        const fns = this.functionsMap[type.name] || type;
        return fns.parseValue(value);
    }
    validateEnum(value, type) {
        if (!this.validateEnums || !value)
            return;
        const enumValues = type.getValues().map((v) => v.value);
        if (!enumValues.includes(value)) {
            throw new graphql_1.GraphQLError(`enum "${type.name}" with invalid value`);
        }
    }
    parseArray(value, type, fieldNode) {
        return Array.isArray(value) ? value.map((v) => this.treatValue(v, type.ofType, fieldNode)) : value;
    }
    parseNestedObject(value, givenType, fieldNode) {
        if (!value || !fieldNode || !fieldNode.selectionSet || !fieldNode.selectionSet.selections.length) {
            return value;
        }
        const type = this.getObjectTypeFrom(value, givenType);
        return type ? this.parseObjectWithSelections(value, type, fieldNode.selectionSet.selections) : value;
    }
    getObjectTypeFrom(value, type) {
        if (graphql_1.isInputObjectType(type) || graphql_1.isObjectType(type))
            return type;
        if (!value.__typename)
            return null;
        const valueType = this.schema.getType(value.__typename);
        return graphql_1.isInputObjectType(valueType) || graphql_1.isObjectType(valueType) ? valueType : null;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBcUJpQjtBQUNqQixrRUFBbUM7QUFHbkMsdUNBQW1DO0FBS25DLFNBQVMsY0FBYyxDQUFDLElBQTBDO0lBQ2hFLE9BQU8sdUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUFhLE1BQU07SUFDakIsWUFBcUIsTUFBcUIsRUFBVyxZQUEwQixFQUFXLGFBQXNCO1FBQTNGLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFXLGtCQUFhLEdBQWIsYUFBYSxDQUFTO0lBQUcsQ0FBQztJQUU3Ryx5QkFBeUIsQ0FDOUIsSUFBVSxFQUNWLElBQWdELEVBQ2hELFVBQXVDO1FBRXZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQU8sRUFBRSxTQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakcsT0FBTyx1QkFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVTLGNBQWMsQ0FDdEIsSUFBVSxFQUNWLFFBQTBELEVBQzFELFNBQTJCO1FBRTNCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFH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