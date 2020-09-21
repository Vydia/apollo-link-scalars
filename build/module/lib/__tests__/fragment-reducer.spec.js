import { fragmentReducer } from "../fragment-reducer";
import { expectedFragmentsReduced as efr1, operationQuery as op1 } from "./common1.fixtures";
import { expectedFragmentsReduced as efr2, operationQuery as op2 } from "./common2.fixtures";
describe("fragmentReducer(documentNode): operationNode", () => {
    it("returns null with no definitions", () => {
        expect(fragmentReducer(null)).toBeNull();
        expect(fragmentReducer({})).toBeNull();
        expect(fragmentReducer({ definitions: [] })).toBeNull();
    });
    it("returns null with no OperationDefinitionNode in the definitions", () => {
        expect(fragmentReducer({
            definitions: [{ whatever: null }],
        })).toBeNull();
    });
    it("example1", () => {
        expect(fragmentReducer(op1)).toEqual(efr1);
    });
    it("example2", () => {
        expect(fragmentReducer(op2)).toEqual(efr2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtcmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9fX3Rlc3RzX18vZnJhZ21lbnQtcmVkdWNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLElBQUksSUFBSSxFQUFFLGNBQWMsSUFBSSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RixPQUFPLEVBQUUsd0JBQXdCLElBQUksSUFBSSxFQUFFLGNBQWMsSUFBSSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RixRQUFRLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzVELEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7UUFDMUMsTUFBTSxDQUFDLGVBQWUsQ0FBRSxJQUFnQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RSxNQUFNLENBQUMsZUFBZSxDQUFFLEVBQThCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxlQUFlLENBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUE4QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2RixDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7UUFDekUsTUFBTSxDQUNKLGVBQWUsQ0FBRTtZQUNmLFdBQVcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ04sQ0FBQyxDQUMvQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=