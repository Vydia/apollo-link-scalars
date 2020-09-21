import { FieldNode, FragmentDefinitionNode, SelectionNode } from "graphql";
import { Dictionary } from "../types/dictionary";
import { MutOrRO } from "../types/mut-or-ro";
import { ReducedFieldNode } from "./node-types";
export declare function uniqueNodes<T extends FieldNode>(nodes: T[]): T[];
export declare function replaceFragmentsOn(selections: MutOrRO<SelectionNode[]>, fragmentMap: Dictionary<FragmentDefinitionNode | ReducedFieldNode[]>): ReducedFieldNode[];
export declare function fragmentMapFrom(fragments: FragmentDefinitionNode[]): Dictionary<ReducedFieldNode[]>;
