import { getNullableType, isEnumType, isListType, isScalarType, } from "graphql";
import has from "lodash.has";
import mapValues from "lodash.mapvalues";
import omit from "lodash.omit";
import { isNone, mapIfArray } from "..";
export class Serializer {
    constructor(schema, functionsMap, removeTypenameFromInputs) {
        this.schema = schema;
        this.functionsMap = functionsMap;
        this.removeTypenameFromInputs = removeTypenameFromInputs;
    }
    serialize(value, type) {
        if (isNone(value))
            return value;
        return this.serializeNullable(value, getNullableType(type));
    }
    serializeNullable(value, type) {
        if (isScalarType(type) || isEnumType(type)) {
            return this.serializeLeaf(value, type);
        }
        if (isListType(type)) {
            return mapIfArray(value, (v) => this.serialize(v, type.ofType));
        }
        return this.serializeInputObject(value, type);
    }
    serializeLeaf(value, type) {
        const fns = this.functionsMap[type.name] || type;
        return fns.serialize(value);
    }
    serializeInputObject(givenValue, type) {
        const value = this.removeTypenameFromInputs && has(givenValue, "__typename") ? omit(givenValue, "__typename") : givenValue;
        const fields = type.getFields();
        return mapValues(value, (v, key) => {
            const f = fields[key];
            return f ? this.serialize(v, f.type) : v;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsZUFBZSxFQU1mLFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxHQUNiLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQztBQUM3QixPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLElBQUksTUFBTSxhQUFhLENBQUM7QUFDL0IsT0FBTyxFQUFnQixNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXRELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQ1csTUFBcUIsRUFDckIsWUFBMEIsRUFDMUIsd0JBQWlDO1FBRmpDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFTO0lBQ3pDLENBQUM7SUFFRyxTQUFTLENBQUMsS0FBVSxFQUFFLElBQXNCO1FBQ2pELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRWhDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsaUJBQWlCLENBQUMsS0FBVSxFQUFFLElBQXNCO1FBQzVELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsT0FBTyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRVMsYUFBYSxDQUFDLEtBQVUsRUFBRSxJQUF5QztRQUMzRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDakQsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUyxvQkFBb0IsQ0FBQyxVQUFlLEVBQUUsSUFBNEI7UUFDMUUsTUFBTSxLQUFLLEdBQ1QsSUFBSSxDQUFDLHdCQUF3QixJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUUvRyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsT0FBTyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YifQ==