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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragmentReducer = void 0;
const fragment_utils_1 = require("./fragment-utils");
const node_types_1 = require("./node-types");
function fragmentReducer(doc) {
    if (!doc || !doc.definitions || !doc.definitions.length)
        return null;
    const operationNode = doc.definitions.find(node_types_1.isOperationDefinitionNode) || null;
    if (!operationNode)
        return null;
    const fragments = doc.definitions.filter(node_types_1.isFragmentDefinitionNode);
    const fragmentMap = fragment_utils_1.fragmentMapFrom(fragments);
    const _a = operationNode.selectionSet, { selections } = _a, selectionSet = __rest(_a, ["selections"]);
    const list = fragment_utils_1.replaceFragmentsOn(selections, fragmentMap);
    return Object.assign(Object.assign({}, operationNode), { selectionSet: Object.assign(Object.assign({}, selectionSet), { selections: list }) });
}
exports.fragmentReducer = fragmentReducer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtcmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnJhZ21lbnQtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUF1RTtBQUN2RSw2Q0FBbUg7QUFFbkgsU0FBZ0IsZUFBZSxDQUFDLEdBQWlCO0lBQy9DLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDckUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0NBQXlCLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDOUUsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUVoQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxxQ0FBd0IsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sV0FBVyxHQUFHLGdDQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsTUFBTSxLQUFrQyxhQUFhLENBQUMsWUFBWSxFQUE1RCxFQUFFLFVBQVUsT0FBZ0QsRUFBM0MsWUFBWSxjQUE3QixjQUErQixDQUE2QixDQUFDO0lBQ25FLE1BQU0sSUFBSSxHQUFHLG1DQUFrQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCx1Q0FDSyxhQUFhLEtBQ2hCLFlBQVksa0NBQU8sWUFBWSxLQUFFLFVBQVUsRUFBRSxJQUFJLE9BQ2pEO0FBQ0osQ0FBQztBQWJELDBDQWFDIn0=