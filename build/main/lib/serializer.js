"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const graphql_1 = require("graphql");
const lodash_has_1 = __importDefault(require("lodash.has"));
const lodash_mapvalues_1 = __importDefault(require("lodash.mapvalues"));
const lodash_omit_1 = __importDefault(require("lodash.omit"));
const __1 = require("..");
class Serializer {
    constructor(schema, functionsMap, removeTypenameFromInputs) {
        this.schema = schema;
        this.functionsMap = functionsMap;
        this.removeTypenameFromInputs = removeTypenameFromInputs;
    }
    serialize(value, type) {
        if (__1.isNone(value))
            return value;
        return this.serializeNullable(value, graphql_1.getNullableType(type));
    }
    serializeNullable(value, type) {
        if (graphql_1.isScalarType(type) || graphql_1.isEnumType(type)) {
            return this.serializeLeaf(value, type);
        }
        if (graphql_1.isListType(type)) {
            return __1.mapIfArray(value, (v) => this.serialize(v, type.ofType));
        }
        return this.serializeInputObject(value, type);
    }
    serializeLeaf(value, type) {
        const fns = this.functionsMap[type.name] || type;
        return fns.serialize(value);
    }
    serializeInputObject(givenValue, type) {
        const value = this.removeTypenameFromInputs && lodash_has_1.default(givenValue, "__typename") ? lodash_omit_1.default(givenValue, "__typename") : givenValue;
        const fields = type.getFields();
        return lodash_mapvalues_1.default(value, (v, key) => {
            const f = fields[key];
            return f ? this.serialize(v, f.type) : v;
        });
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FVaUI7QUFDakIsNERBQTZCO0FBQzdCLHdFQUF5QztBQUN6Qyw4REFBK0I7QUFDL0IsMEJBQXNEO0FBRXRELE1BQWEsVUFBVTtJQUNyQixZQUNXLE1BQXFCLEVBQ3JCLFlBQTBCLEVBQzFCLHdCQUFpQztRQUZqQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBUztJQUN6QyxDQUFDO0lBRUcsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFzQjtRQUNqRCxJQUFJLFVBQU0sQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVoQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUseUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxLQUFVLEVBQUUsSUFBc0I7UUFDNUQsSUFBSSxzQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUVELElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixPQUFPLGNBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFUyxhQUFhLENBQUMsS0FBVSxFQUFFLElBQXlDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqRCxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVTLG9CQUFvQixDQUFDLFVBQWUsRUFBRSxJQUE0QjtRQUMxRSxNQUFNLEtBQUssR0FDVCxJQUFJLENBQUMsd0JBQXdCLElBQUksb0JBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFL0csTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sMEJBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDakMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhDRCxnQ0F3Q0MifQ==