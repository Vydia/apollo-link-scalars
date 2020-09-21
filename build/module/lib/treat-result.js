import { fragmentReducer } from "./fragment-reducer";
import { isFieldNode } from "./node-types";
import { Parser } from "./parser";
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
export function treatResult({ schema, functionsMap, operation, result, validateEnums, }) {
    const data = result.data;
    if (!data)
        return result;
    const operationDefinitionNode = fragmentReducer(operation.query);
    if (!operationDefinitionNode)
        return result;
    const rootType = rootTypeFor(operationDefinitionNode, schema);
    if (!rootType)
        return result;
    const parser = new Parser(schema, functionsMap, validateEnums);
    const rootSelections = operationDefinitionNode.selectionSet.selections.filter(isFieldNode);
    const newData = parser.parseObjectWithSelections(data, rootType, rootSelections);
    return Object.assign(Object.assign({}, result), { data: newData });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXQtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmVhdC1yZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFdBQVcsQ0FDbEIsdUJBQWdELEVBQ2hELE1BQXFCO0lBRXJCLElBQUksdUJBQXVCLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtRQUNqRCxPQUFPLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUM7S0FDdEM7SUFFRCxJQUFJLHVCQUF1QixDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7UUFDcEQsT0FBTyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksSUFBSSxDQUFDO0tBQ3pDO0lBRUQsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLEtBQUssY0FBYyxFQUFFO1FBQ3hELE9BQU8sTUFBTSxDQUFDLG1CQUFtQixFQUFFLElBQUksSUFBSSxDQUFDO0tBQzdDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBVUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxFQUMxQixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxNQUFNLEVBQ04sYUFBYSxHQUNLO0lBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUV6QixNQUFNLHVCQUF1QixHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsSUFBSSxDQUFDLHVCQUF1QjtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RCxJQUFJLENBQUMsUUFBUTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTdCLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0QsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakYsdUNBQVksTUFBTSxLQUFFLElBQUksRUFBRSxPQUFPLElBQUc7QUFDdEMsQ0FBQyJ9