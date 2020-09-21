"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragment_reducer_1 = require("../fragment-reducer");
const common1_fixtures_1 = require("./common1.fixtures");
const common2_fixtures_1 = require("./common2.fixtures");
describe("fragmentReducer(documentNode): operationNode", () => {
    it("returns null with no definitions", () => {
        expect(fragment_reducer_1.fragmentReducer(null)).toBeNull();
        expect(fragment_reducer_1.fragmentReducer({})).toBeNull();
        expect(fragment_reducer_1.fragmentReducer({ definitions: [] })).toBeNull();
    });
    it("returns null with no OperationDefinitionNode in the definitions", () => {
        expect(fragment_reducer_1.fragmentReducer({
            definitions: [{ whatever: null }],
        })).toBeNull();
    });
    it("example1", () => {
        expect(fragment_reducer_1.fragmentReducer(common1_fixtures_1.operationQuery)).toEqual(common1_fixtures_1.expectedFragmentsReduced);
    });
    it("example2", () => {
        expect(fragment_reducer_1.fragmentReducer(common2_fixtures_1.operationQuery)).toEqual(common2_fixtures_1.expectedFragmentsReduced);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtcmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9fX3Rlc3RzX18vZnJhZ21lbnQtcmVkdWNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMERBQXNEO0FBQ3RELHlEQUE2RjtBQUM3Rix5REFBNkY7QUFFN0YsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEdBQUcsRUFBRTtJQUM1RCxFQUFFLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO1FBQzFDLE1BQU0sQ0FBQyxrQ0FBZSxDQUFFLElBQWdDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxrQ0FBZSxDQUFFLEVBQThCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxrQ0FBZSxDQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBOEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsaUVBQWlFLEVBQUUsR0FBRyxFQUFFO1FBQ3pFLE1BQU0sQ0FDSixrQ0FBZSxDQUFFO1lBQ2YsV0FBVyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDTixDQUFDLENBQy9CLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxrQ0FBZSxDQUFDLGlDQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQywyQ0FBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUNsQixNQUFNLENBQUMsa0NBQWUsQ0FBQyxpQ0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsMkNBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==