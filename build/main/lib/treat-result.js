"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatResult = void 0;
const fragment_reducer_1 = require("./fragment-reducer");
const node_types_1 = require("./node-types");
const parser_1 = require("./parser");
function rootTypeFor(operationDefinitionNode, schema) {
    if (operationDefinitionNode.operation === "query") {
        return schema.getQueryType() || null;
    }
    if (operationDefinitionNode.operation === "mutation") {
        return schema.getMutationType() || null;
    }
    if (operationDefinitionNode.operation === "subscription") {
        return schema.getSubscriptionType() || null;
    }
    return null;
}
function treatResult({ schema, functionsMap, operation, result, validateEnums, }) {
    const data = result.data;
    if (!data)
        return result;
    const operationDefinitionNode = fragment_reducer_1.fragmentReducer(operation.query);
    if (!operationDefinitionNode)
        return result;
    const rootType = rootTypeFor(operationDefinitionNode, schema);
    if (!rootType)
        return result;
    const parser = new parser_1.Parser(schema, functionsMap, validateEnums);
    const rootSelections = operationDefinitionNode.selectionSet.selections.filter(node_types_1.isFieldNode);
    const newData = parser.parseObjectWithSelections(data, rootType, rootSelections);
    return Object.assign(Object.assign({}, result), { data: newData });
}
exports.treatResult = treatResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXQtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmVhdC1yZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EseURBQXFEO0FBQ3JELDZDQUEyQztBQUMzQyxxQ0FBa0M7QUFFbEMsU0FBUyxXQUFXLENBQ2xCLHVCQUFnRCxFQUNoRCxNQUFxQjtJQUVyQixJQUFJLHVCQUF1QixDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7UUFDakQsT0FBTyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDO0tBQ3RDO0lBRUQsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO1FBQ3BELE9BQU8sTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQztLQUN6QztJQUVELElBQUksdUJBQXVCLENBQUMsU0FBUyxLQUFLLGNBQWMsRUFBRTtRQUN4RCxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLElBQUksQ0FBQztLQUM3QztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVVELFNBQWdCLFdBQVcsQ0FBQyxFQUMxQixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxHQUNLO0lBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUV6QixNQUFNLHVCQUF1QixHQUFHLGtDQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLElBQUksQ0FBQyx1QkFBdUI7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUU1QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUU3QixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLHdCQUFXLENBQUMsQ0FBQztJQUMzRixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRix1Q0FBWSxNQUFNLEtBQUUsSUFBSSxFQUFFLE9BQU8sSUFBRztBQUN0QyxDQUFDO0FBcEJELGtDQW9CQyJ9