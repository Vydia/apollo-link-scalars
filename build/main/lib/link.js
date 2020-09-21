"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withScalars = exports.ScalarApolloLink = void 0;
const core_1 = require("@apollo/client/core");
const graphql_1 = require("graphql");
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const map_if_array_1 = require("./map-if-array");
const node_types_1 = require("./node-types");
const serializer_1 = require("./serializer");
const treat_result_1 = require("./treat-result");
class ScalarApolloLink extends core_1.ApolloLink {
    constructor(pars) {
        super();
        this.schema = pars.schema;
        this.typesMap = pars.typesMap || {};
        this.validateEnums = pars.validateEnums || false;
        this.removeTypenameFromInputs = pars.removeTypenameFromInputs || false;
        const leafTypesMap = lodash_pickby_1.default(this.schema.getTypeMap(), graphql_1.isLeafType);
        this.functionsMap = Object.assign(Object.assign({}, leafTypesMap), this.typesMap);
        this.serializer = new serializer_1.Serializer(this.schema, this.functionsMap, this.removeTypenameFromInputs);
    }
    // ApolloLink code based on https://github.com/with-heart/apollo-link-response-resolver
    request(givenOperation, forward) {
        const operation = this.cleanVariables(givenOperation);
        return new core_1.Observable((observer) => {
            let sub;
            try {
                sub = forward(operation).subscribe({
                    next: (result) => {
                        try {
                            observer.next(this.parse(operation, result));
                        }
                        catch (treatError) {
                            const errors = result.errors || [];
                            observer.next({ errors: [...errors, treatError] });
                        }
                    },
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            }
            catch (e) {
                observer.error(e);
            }
            return () => {
                if (sub)
                    sub.unsubscribe();
            };
        });
    }
    parse(operation, result) {
        return treat_result_1.treatResult({
            operation,
            result,
            functionsMap: this.functionsMap,
            schema: this.schema,
            validateEnums: this.validateEnums,
        });
    }
    /**
     * mutate the operation object with the serialized variables
     * @param operation
     */
    cleanVariables(operation) {
        const o = operation.query.definitions.find(node_types_1.isOperationDefinitionNode);
        const varDefs = (o === null || o === void 0 ? void 0 : o.variableDefinitions) || [];
        varDefs.forEach((vd) => {
            const key = vd.variable.name.value;
            operation.variables[key] = this.serialize(operation.variables[key], vd.type);
        });
        return operation;
    }
    serialize(value, typeNode) {
        if (node_types_1.isNonNullTypeNode(typeNode)) {
            return this.serialize(value, typeNode.type);
        }
        if (node_types_1.isListTypeNode(typeNode)) {
            return map_if_array_1.mapIfArray(value, (v) => this.serialize(v, typeNode.type));
        }
        return this.serializeNamed(value, typeNode);
    }
    serializeNamed(value, typeNode) {
        const typeName = typeNode.name.value;
        const schemaType = this.schema.getType(typeName);
        return schemaType && graphql_1.isInputType(schemaType) ? this.serializer.serialize(value, schemaType) : value;
    }
}
exports.ScalarApolloLink = ScalarApolloLink;
exports.withScalars = (pars) => {
    return new ScalarApolloLink(pars);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBK0Y7QUFDL0YscUNBQTBGO0FBQzFGLGtFQUFtQztBQUduQyxpREFBNEM7QUFDNUMsNkNBQTRGO0FBQzVGLDZDQUEwQztBQUMxQyxpREFBNkM7QUFTN0MsTUFBYSxnQkFBaUIsU0FBUSxpQkFBVTtJQVE5QyxZQUFZLElBQTRCO1FBQ3RDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixJQUFJLEtBQUssQ0FBQztRQUV2RSxNQUFNLFlBQVksR0FBRyx1QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsb0JBQVUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLG1DQUFRLFlBQVksR0FBSyxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCx1RkFBdUY7SUFDaEYsT0FBTyxDQUFDLGNBQXlCLEVBQUUsT0FBaUI7UUFDekQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV0RCxPQUFPLElBQUksaUJBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFF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