"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNone = void 0;
const lodash_isnull_1 = __importDefault(require("lodash.isnull"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
/**
 * @hidden
 * @ignore
 */
function isNone(x) {
    return lodash_isundefined_1.default(x) || lodash_isnull_1.default(x);
}
exports.isNone = isNone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbm9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaXMtbm9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBbUM7QUFDbkMsNEVBQTZDO0FBRTdDOzs7R0FHRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxDQUFNO0lBQzNCLE9BQU8sNEJBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSx1QkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFGRCx3QkFFQyJ9