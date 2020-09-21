import { isFieldNode, isFragmentDefinitionNode, isFragmentSpreadNode, isInlineFragmentNode, isOperationDefinitionNode, } from "../node-types";
describe("specific DefinitionNode", () => {
    describe("isOperationDefinitionNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(isOperationDefinitionNode({
                kind: "OperationDefinition",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(isOperationDefinitionNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isFragmentDefinitionNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(isFragmentDefinitionNode({
                kind: "FragmentDefinition",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(isFragmentDefinitionNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
});
describe("specific SelectionNode", () => {
    describe("isFieldNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(isFieldNode({
                kind: "Field",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(isFieldNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isFragmentSpreadNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(isFragmentSpreadNode({
                kind: "FragmentSpread",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(isFragmentSpreadNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
    describe("isInlineFragmentNode", () => {
        it("with kind OperationDefinition => true", () => {
            expect(isInlineFragmentNode({
                kind: "InlineFragment",
            })).toBeTruthy();
        });
        it("otherwise => false", () => {
            expect(isInlineFragmentNode({
                kind: "whatever",
            })).toBeFalsy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9fX3Rlc3RzX18vbm9kZS10eXBlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxXQUFXLEVBQ1gsd0JBQXdCLEVBQ3hCLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIseUJBQXlCLEdBQzFCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSix5QkFBeUIsQ0FBRTtnQkFDekIsSUFBSSxFQUFFLHFCQUFxQjthQUNFLENBQUMsQ0FDakMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLHlCQUF5QixDQUFFO2dCQUN6QixJQUFJLEVBQUUsVUFBVTthQUNhLENBQUMsQ0FDakMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSix3QkFBd0IsQ0FBRTtnQkFDeEIsSUFBSSxFQUFFLG9CQUFvQjthQUNHLENBQUMsQ0FDakMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLHdCQUF3QixDQUFFO2dCQUN4QixJQUFJLEVBQUUsVUFBVTthQUNhLENBQUMsQ0FDakMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQzNCLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxDQUNKLFdBQVcsQ0FBRTtnQkFDWCxJQUFJLEVBQUUsT0FBTzthQUNlLENBQUMsQ0FDaEMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLFdBQVcsQ0FBRTtnQkFDWCxJQUFJLEVBQUUsVUFBVTthQUNZLENBQUMsQ0FDaEMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtRQUNwQyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSixvQkFBb0IsQ0FBRTtnQkFDcEIsSUFBSSxFQUFFLGdCQUFnQjthQUNNLENBQUMsQ0FDaEMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLG9CQUFvQixDQUFFO2dCQUNwQixJQUFJLEVBQUUsVUFBVTthQUNZLENBQUMsQ0FDaEMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtRQUNwQyxFQUFFLENBQUMsdUNBQXVDLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sQ0FDSixvQkFBb0IsQ0FBRTtnQkFDcEIsSUFBSSxFQUFFLGdCQUFnQjthQUNNLENBQUMsQ0FDaEMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUNKLG9CQUFvQixDQUFFO2dCQUNwQixJQUFJLEVBQUUsVUFBVTthQUNZLENBQUMsQ0FDaEMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==