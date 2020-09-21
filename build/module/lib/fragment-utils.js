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
import every from "lodash.every";
import flatMap from "lodash.flatmap";
import fromPairs from "lodash.frompairs";
import uniqBy from "lodash.uniqby";
import { isFieldNode, isInlineFragmentNode } from "./node-types";
export function uniqueNodes(nodes) {
    return uniqBy(nodes, (fn) => { var _a; return JSON.stringify([(_a = fn.alias) === null || _a === void 0 ? void 0 : _a.value, fn.name.value]); });
}
function getCleanedSelections(selections, fragmentMap) {
    return flatMap(selections, (sn) => {
        if (isFieldNode(sn))
            return [sn];
        if (isInlineFragmentNode(sn))
            return sn.selectionSet.selections;
        const nodeOrSelectionList = fragmentMap[sn.name.value];
        if (!nodeOrSelectionList)
            return [];
        return Array.isArray(nodeOrSelectionList) ? nodeOrSelectionList : nodeOrSelectionList.selectionSet.selections; // fragment node
    });
}
function getResolvedFieldNodes(fieldNodes, fragmentMap) {
    return fieldNodes.map((fn) => {
        const { selectionSet } = fn, restFn = __rest(fn, ["selectionSet"]);
        if (!selectionSet || !selectionSet.selections || !selectionSet.selections.length) {
            return Object.assign({}, restFn);
        }
        const replacedSelections = replaceFragmentsOn(selectionSet.selections, fragmentMap);
        return Object.assign(Object.assign({}, restFn), { selectionSet: Object.assign(Object.assign({}, selectionSet), { selections: replacedSelections }) });
    });
}
export function replaceFragmentsOn(selections, fragmentMap) {
    const cleaned = getCleanedSelections(selections, fragmentMap);
    if (!every(cleaned, isFieldNode)) {
        return replaceFragmentsOn(cleaned, fragmentMap);
    }
    const resolved = getResolvedFieldNodes(cleaned, fragmentMap);
    return uniqueNodes(resolved);
}
export function fragmentMapFrom(fragments) {
    const initialMap = fromPairs(fragments.map((f) => [f.name.value, f]));
    return fromPairs(fragments.map((f) => {
        const fieldNodes = replaceFragmentsOn(f.selectionSet.selections, initialMap);
        return [f.name.value, fieldNodes];
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZyYWdtZW50LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBQ2pDLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQztBQUduQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFvQixNQUFNLGNBQWMsQ0FBQztBQUVuRixNQUFNLFVBQVUsV0FBVyxDQUFzQixLQUFVO0lBQ3pELE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQUMsT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQUMsRUFBRSxDQUFDLEtBQUssMENBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFBLENBQUMsQ0FBQztBQUNqRixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FDM0IsVUFBb0MsRUFDcEMsV0FBb0U7SUFFcEUsT0FBTyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEMsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksb0JBQW9CLENBQUMsRUFBRSxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUVoRSxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxtQkFBbUI7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVwQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0I7SUFDakksQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsVUFBdUIsRUFDdkIsV0FBb0U7SUFFcEUsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDM0IsTUFBTSxFQUFFLFlBQVksS0FBZ0IsRUFBRSxFQUFiLE1BQU0sVUFBSyxFQUFFLEVBQWhDLGdCQUEyQixDQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNoRix5QkFBWSxNQUFNLEVBQUc7U0FDdEI7UUFFRCxNQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEYsdUNBQ0ssTUFBTSxLQUNULFlBQVksa0NBQU8sWUFBWSxLQUFFLFVBQVUsRUFBRSxrQkFBa0IsT0FDL0Q7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLFVBQW9DLEVBQ3BDLFdBQW9FO0lBRXBFLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUU5RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRTtRQUNoQyxPQUFPLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNqRDtJQUVELE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLE9BQXNCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUUsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBbUM7SUFDakUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLE9BQU8sU0FBUyxDQUNkLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMifQ==