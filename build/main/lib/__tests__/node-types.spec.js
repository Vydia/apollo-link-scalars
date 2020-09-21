"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_types_1 = require("../node-types");
describe("specific DefinitionNode", () => {
    describe("isOperationDefinitionNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(node_types_1.isOperationDefinitionNode({
                kind: "OperationDefinition",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(node_types_1.isOperationDefinitionNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isFragmentDefinitionNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(node_types_1.isFragmentDefinitionNode({
                kind: "FragmentDefinition",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(node_types_1.isFragmentDefinitionNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
});
describe("specific SelectionNode", () => {
    describe("isFieldNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(node_types_1.isFieldNode({
                kind: "Field",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(node_types_1.isFieldNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isFragmentSpreadNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(node_types_1.isFragmentSpreadNode({
                kind: "FragmentSpread",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(node_types_1.isFragmentSpreadNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isInlineFragmentNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(node_types_1.isInlineFragmentNode({
                kind: "InlineFragment",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(node_types_1.isInlineFragmentNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9fX3Rlc3RzX18vbm9kZS10eXBlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBTXVCO0FBRXZCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSixzQ0FBeUIsQ0FBRTtnQkFDekIsSUFBSSxFQUFFLHFCQUFxQjthQUNFLENBQUMsQ0FDakMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLHNDQUF5QixDQUFFO2dCQUN6QixJQUFJLEVBQUUsVUFBVTthQUNhLENBQUMsQ0FDakMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSixxQ0FBd0IsQ0FBRTtnQkFDeEIsSUFBSSxFQUFFLG9CQUFvQjthQUNHLENBQUMsQ0FDakMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLHFDQUF3QixDQUFFO2dCQUN4QixJQUFJLEVBQUUsVUFBVTthQUNhLENBQUMsQ0FDakMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQzNCLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxDQUNKLHdCQUFXLENBQUU7Z0JBQ1gsSUFBSSxFQUFFLE9BQU87YUFDZSxDQUFDLENBQ2hDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1lBQzVCLE1BQU0sQ0FDSix3QkFBVyxDQUFFO2dCQUNYLElBQUksRUFBRSxVQUFVO2FBQ1ksQ0FBQyxDQUNoQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxDQUNKLGlDQUFvQixDQUFFO2dCQUNwQixJQUFJLEVBQUUsZ0JBQWdCO2FBQ00sQ0FBQyxDQUNoQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtZQUM1QixNQUFNLENBQ0osaUNBQW9CLENBQUU7Z0JBQ3BCLElBQUksRUFBRSxVQUFVO2FBQ1ksQ0FBQyxDQUNoQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxDQUNKLGlDQUFvQixDQUFFO2dCQUNwQixJQUFJLEVBQUUsZ0JBQWdCO2FBQ00sQ0FBQyxDQUNoQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtZQUM1QixNQUFNLENBQ0osaUNBQW9CLENBQUU7Z0JBQ3BCLElBQUksRUFBRSxVQUFVO2FBQ1ksQ0FBQyxDQUNoQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9