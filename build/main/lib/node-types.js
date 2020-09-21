"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonNullTypeNode = exports.isListTypeNode = exports.isNamedTypeNode = exports.isInlineFragmentNode = exports.isFragmentSpreadNode = exports.isFieldNode = exports.isFragmentDefinitionNode = exports.isOperationDefinitionNode = void 0;
const graphql_1 = require("graphql");
function isOperationDefinitionNode(node) {
    return node.kind === graphql_1.Kind.OPERATION_DEFINITION;
}
exports.isOperationDefinitionNode = isOperationDefinitionNode;
function isFragmentDefinitionNode(node) {
    return node.kind === graphql_1.Kind.FRAGMENT_DEFINITION;
}
exports.isFragmentDefinitionNode = isFragmentDefinitionNode;
function isFieldNode(node) {
    return node.kind === graphql_1.Kind.FIELD;
}
exports.isFieldNode = isFieldNode;
function isFragmentSpreadNode(node) {
    return node.kind === graphql_1.Kind.FRAGMENT_SPREAD;
}
exports.isFragmentSpreadNode = isFragmentSpreadNode;
function isInlineFragmentNode(node) {
    return node.kind === graphql_1.Kind.INLINE_FRAGMENT;
}
exports.isInlineFragmentNode = isInlineFragmentNode;
function isNamedTypeNode(node) {
    return node.kind === graphql_1.Kind.NAMED_TYPE;
}
exports.isNamedTypeNode = isNamedTypeNode;
function isListTypeNode(node) {
    return node.kind === graphql_1.Kind.LIST_TYPE;
}
exports.isListTypeNode = isListTypeNode;
function isNonNullTypeNode(node) {
    return node.kind === graphql_1.Kind.NON_NULL_TYPE;
}
exports.isNonNullTypeNode = isNonNullTypeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbm9kZS10eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FjaUI7QUFlakIsU0FBZ0IseUJBQXlCLENBQUMsSUFBb0I7SUFDNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQUksQ0FBQyxvQkFBb0IsQ0FBQztBQUNqRCxDQUFDO0FBRkQsOERBRUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxJQUFvQjtJQUMzRCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLG1CQUFtQixDQUFDO0FBQ2hELENBQUM7QUFGRCw0REFFQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFtQjtJQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLEtBQUssQ0FBQztBQUNsQyxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxJQUFtQjtJQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLGVBQWUsQ0FBQztBQUM1QyxDQUFDO0FBRkQsb0RBRUM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxJQUFtQjtJQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLGVBQWUsQ0FBQztBQUM1QyxDQUFDO0FBRkQsb0RBRUM7QUFDRCxTQUFnQixlQUFlLENBQUMsSUFBYztJQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLFVBQVUsQ0FBQztBQUN2QyxDQUFDO0FBRkQsMENBRUM7QUFFRCxTQUFnQixjQUFjLENBQUMsSUFBYztJQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBSSxDQUFDLFNBQVMsQ0FBQztBQUN0QyxDQUFDO0FBRkQsd0NBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFjO0lBQzlDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxjQUFJLENBQUMsYUFBYSxDQUFDO0FBQzFDLENBQUM7QUFGRCw4Q0FFQyJ9