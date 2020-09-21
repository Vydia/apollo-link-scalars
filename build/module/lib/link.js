import { ApolloLink, Observable } from "@apollo/client/core";
import { isInputType, isLeafType } from "graphql";
import pickBy from "lodash.pickby";
import { mapIfArray } from "./map-if-array";
import { isListTypeNode, isNonNullTypeNode, isOperationDefinitionNode } from "./node-types";
import { Serializer } from "./serializer";
import { treatResult } from "./treat-result";
export class ScalarApolloLink extends ApolloLink {
    constructor(pars) {
        super();
        this.schema = pars.schema;
        this.typesMap = pars.typesMap || {};
        this.validateEnums = pars.validateEnums || false;
        this.removeTypenameFromInputs = pars.removeTypenameFromInputs || false;
        const leafTypesMap = pickBy(this.schema.getTypeMap(), isLeafType);
        this.functionsMap = Object.assign(Object.assign({}, leafTypesMap), this.typesMap);
        this.serializer = new Serializer(this.schema, this.functionsMap, this.removeTypenameFromInputs);
    }
    // ApolloLink code based on https://github.com/with-heart/apollo-link-response-resolver
    request(givenOperation, forward) {
        const operation = this.cleanVariables(givenOperation);
        return new Observable((observer) => {
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
        return treatResult({
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
        const o = operation.query.definitions.find(isOperationDefinitionNode);
        const varDefs = (o === null || o === void 0 ? void 0 : o.variableDefinitions) || [];
        varDefs.forEach((vd) => {
            const key = vd.variable.name.value;
            operation.variables[key] = this.serialize(operation.variables[key], vd.type);
        });
        return operation;
    }
    serialize(value, typeNode) {
        if (isNonNullTypeNode(typeNode)) {
            return this.serialize(value, typeNode.type);
        }
        if (isListTypeNode(typeNode)) {
            return mapIfArray(value, (v) => this.serialize(v, typeNode.type));
        }
        return this.serializeNamed(value, typeNode);
    }
    serializeNamed(value, typeNode) {
        const typeName = typeNode.name.value;
        const schemaType = this.schema.getType(typeName);
        return schemaType && isInputType(schemaType) ? this.serializer.serialize(value, schemaType) : value;
    }
}
export const withScalars = (pars) => {
    return new ScalarApolloLink(pars);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF5QixVQUFVLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUMvRixPQUFPLEVBQWlCLFdBQVcsRUFBRSxVQUFVLEVBQTJCLE1BQU0sU0FBUyxDQUFDO0FBQzFGLE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQztBQUduQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVM3QyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQVE5QyxZQUFZLElBQTRCO1FBQ3RDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixJQUFJLEtBQUssQ0FBQztRQUV2RSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxtQ0FBUSxZQUFZLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxV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