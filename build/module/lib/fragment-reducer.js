var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { fragmentMapFrom, replaceFragmentsOn } from "./fragment-utils";
import { isFragmentDefinitionNode, isOperationDefinitionNode } from "./node-types";
export function fragmentReducer(doc) {
    if (!doc || !doc.definitions || !doc.definitions.length)
        return null;
    const operationNode = doc.definitions.find(isOperationDefinitionNode) || null;
    if (!operationNode)
        return null;
    const fragments = doc.definitions.filter(isFragmentDefinitionNode);
    const fragmentMap = fragmentMapFrom(fragments);
    const _a = operationNode.selectionSet, { selections } = _a, selectionSet = __rest(_a, ["selections"]);
    const list = replaceFragmentsOn(selections, fragmentMap);
    return Object.assign(Object.assign({}, operationNode), { selectionSet: Object.assign(Object.assign({}, selectionSet), { selections: list }) });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtcmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhZ21lbnQtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQWtDLE1BQU0sY0FBYyxDQUFDO0FBRW5ILE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBaUI7SUFDL0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQztJQUNyRSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUM5RSxJQUFJLENBQUMsYUFBYTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRWhDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDbkUsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sS0FBa0MsYUFBYSxDQUFDLFlBQVksRUFBNUQsRUFBRSxVQUFVLE9BQWdELEVBQTNDLFlBQVksY0FBN0IsY0FBK0IsQ0FBNkIsQ0FBQztJQUNuRSxNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsdUNBQ0ssYUFBYSxLQUNoQixZQUFZLGtDQUFPLFlBQVksS0FBRSxVQUFVLEVBQUUsSUFBSSxPQUNqRDtBQUNKLENBQUMifQ==