import { DefinitionNode, FieldNode, FragmentDefinitionNode, FragmentSpreadNode, InlineFragmentNode, ListTypeNode, NamedTypeNode, NonNullTypeNode, OperationDefinitionNode, SelectionNode, SelectionSetNode, TypeNode } from "graphql";
import { MutOrRO } from "../types/mut-or-ro";
declare type ReducedSelectionSetNode = Omit<SelectionSetNode, "selections"> & {
    selections: MutOrRO<ReducedFieldNode[]>;
};
export declare type ReducedFieldNode = Omit<FieldNode, "selectionSet"> & {
    selectionSet?: ReducedSelectionSetNode;
};
export declare type ReducedOperationDefinitionNode = Omit<OperationDefinitionNode, "selectionSet"> & {
    readonly selectionSet: ReducedSelectionSetNode;
};
export declare function isOperationDefinitionNode(node: DefinitionNode): node is OperationDefinitionNode;
export declare function isFragmentDefinitionNode(node: DefinitionNode): node is FragmentDefinitionNode;
export declare function isFieldNode(node: SelectionNode): node is FieldNode;
export declare function isFragmentSpreadNode(node: SelectionNode): node is FragmentSpreadNode;
export declare function isInlineFragmentNode(node: SelectionNode): node is InlineFragmentNode;
export declare function isNamedTypeNode(node: TypeNode): node is NamedTypeNode;
export declare function isListTypeNode(node: TypeNode): node is ListTypeNode;
export declare function isNonNullTypeNode(node: TypeNode): node is NonNullTypeNode;
export {};
