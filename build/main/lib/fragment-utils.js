"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragmentMapFrom = exports.replaceFragmentsOn = exports.uniqueNodes = void 0;
const lodash_every_1 = __importDefault(require("lodash.every"));
const lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
const lodash_frompairs_1 = __importDefault(require("lodash.frompairs"));
const lodash_uniqby_1 = __importDefault(require("lodash.uniqby"));
const node_types_1 = require("./node-types");
function uniqueNodes(nodes) {
    return lodash_uniqby_1.default(nodes, (fn) => { var _a; return JSON.stringify([(_a = fn.alias) === null || _a === void 0 ? void 0 : _a.value, fn.name.value]); });
}
exports.uniqueNodes = uniqueNodes;
function getCleanedSelections(selections, fragmentMap) {
    return lodash_flatmap_1.default(selections, (sn) => {
        if (node_types_1.isFieldNode(sn))
            return [sn];
        if (node_types_1.isInlineFragmentNode(sn))
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
function replaceFragmentsOn(selections, fragmentMap) {
    const cleaned = getCleanedSelections(selections, fragmentMap);
    if (!lodash_every_1.default(cleaned, node_types_1.isFieldNode)) {
        return replaceFragmentsOn(cleaned, fragmentMap);
    }
    const resolved = getResolvedFieldNodes(cleaned, fragmentMap);
    return uniqueNodes(resolved);
}
exports.replaceFragmentsOn = replaceFragmentsOn;
function fragmentMapFrom(fragments) {
    const initialMap = lodash_frompairs_1.default(fragments.map((f) => [f.name.value, f]));
    return lodash_frompairs_1.default(fragments.map((f) => {
        const fieldNodes = replaceFragmentsOn(f.selectionSet.selections, initialMap);
        return [f.name.value, fieldNodes];
    }));
}
exports.fragmentMapFrom = fragmentMapFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZyYWdtZW50LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0VBQWlDO0FBQ2pDLG9FQUFxQztBQUNyQyx3RUFBeUM7QUFDekMsa0VBQW1DO0FBR25DLDZDQUFtRjtBQUVuRixTQUFnQixXQUFXLENBQXNCLEtBQVU7SUFDekQsT0FBTyx1QkFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQUMsT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQUMsRUFBRSxDQUFDLEtBQUssMENBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFBLENBQUMsQ0FBQztBQUNqRixDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFTLG9CQUFvQixDQUMzQixVQUFvQyxFQUNwQyxXQUFvRTtJQUVwRSxPQUFPLHdCQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEMsSUFBSSx3QkFBVyxDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLGlDQUFvQixDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFFaEUsTUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFcEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCO0lBQ2pJLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQzVCLFVBQXVCLEVBQ3ZCLFdBQW9FO0lBRXBFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzNCLE1BQU0sRUFBRSxZQUFZLEtBQWdCLEVBQUUsRUFBYixNQUFNLFVBQUssRUFBRSxFQUFoQyxnQkFBMkIsQ0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDaEYseUJBQVksTUFBTSxFQUFHO1NBQ3RCO1FBRUQsTUFBTSxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BGLHVDQUNLLE1BQU0sS0FDVCxZQUFZLGtDQUFPLFlBQVksS0FBRSxVQUFVLEVBQUUsa0JBQWtCLE9BQy9EO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQ2hDLFVBQW9DLEVBQ3BDLFdBQW9FO0lBRXBFLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUU5RCxJQUFJLENBQUMsc0JBQUssQ0FBQyxPQUFPLEVBQUUsd0JBQVcsQ0FBQyxFQUFFO1FBQ2hDLE9BQU8sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsT0FBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RSxPQUFPLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBWkQsZ0RBWUM7QUFFRCxTQUFnQixlQUFlLENBQUMsU0FBbUM7SUFDakUsTUFBTSxVQUFVLEdBQUcsMEJBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxPQUFPLDBCQUFTLENBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQVJELDBDQVFDIn0=