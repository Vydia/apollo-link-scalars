import { fragmentMapFrom } from "../fragment-utils";
export const fragments = [
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "Client" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "Client" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "id" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "clientKey" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "name" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "status" },
                    arguments: [],
                    directives: [],
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "DashboardInfo" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "Dashboard" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "id" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "clientKey" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "dashboardKey" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "name" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "visibility" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "description" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "owner" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "UserProfile" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "createdBy" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "UserProfile" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "UserProfile" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "UserProfile" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "id" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "email" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "name" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "nickname" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "picture" },
                    arguments: [],
                    directives: [],
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "Focus" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "Focus" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "id" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "clientKey" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "focusKey" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "name" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "visibility" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "boardKeys" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "peopleIds" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "multiFilters" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "MultiFilter" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "boolFilters" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "BoolFilter" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "owner" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "UserProfile" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "createdBy" },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                        kind: "SelectionSet",
                        selections: [
                            {
                                kind: "FragmentSpread",
                                name: { kind: "Name", value: "UserProfile" },
                                directives: [],
                            },
                            { kind: "Field", name: { kind: "Name", value: "__typename" } },
                        ],
                    },
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "MultiFilter" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "MultiFilter" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "key" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "values" },
                    arguments: [],
                    directives: [],
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
    {
        kind: "FragmentDefinition",
        name: { kind: "Name", value: "BoolFilter" },
        typeCondition: {
            kind: "NamedType",
            name: { kind: "Name", value: "BoolFilter" },
        },
        directives: [],
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: { kind: "Name", value: "key" },
                    arguments: [],
                    directives: [],
                },
                {
                    kind: "Field",
                    name: { kind: "Name", value: "value" },
                    arguments: [],
                    directives: [],
                },
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
            ],
        },
    },
];
export const flatten = {
    Client: [
        {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "clientKey" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "status" },
            arguments: [],
            directives: [],
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
    DashboardInfo: [
        {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "clientKey" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "dashboardKey" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "visibility" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "description" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "email" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "nickname" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "email" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "nickname" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
    UserProfile: [
        {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "email" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "nickname" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "picture" },
            arguments: [],
            directives: [],
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
    Focus: [
        {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "clientKey" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "focusKey" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "visibility" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "boardKeys" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "peopleIds" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "multiFilters" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "key" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "values" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "boolFilters" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "key" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "value" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "email" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "nickname" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            arguments: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "email" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "nickname" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                        arguments: [],
                        directives: [],
                    },
                    { kind: "Field", name: { kind: "Name", value: "__typename" } },
                ],
            },
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
    MultiFilter: [
        {
            kind: "Field",
            name: { kind: "Name", value: "key" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "values" },
            arguments: [],
            directives: [],
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
    BoolFilter: [
        {
            kind: "Field",
            name: { kind: "Name", value: "key" },
            arguments: [],
            directives: [],
        },
        {
            kind: "Field",
            name: { kind: "Name", value: "value" },
            arguments: [],
            directives: [],
        },
        { kind: "Field", name: { kind: "Name", value: "__typename" } },
    ],
};
describe("fragmentMapFrom(fragmentList: FragmentDefinitionNode[]): Dictionary<ReducedFieldNode[]>", () => {
    it("returns an object with each Fragment name as key, and as value the list of all FieldNodes, replacing all fragment spreads for the actual Field nodes, deeply", () => {
        expect(fragmentMapFrom(fragments)).toEqual(flatten);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtdXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvX190ZXN0c19fL2ZyYWdtZW50LXV0aWxzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3BELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBNkI7SUFDakQ7UUFDRSxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUN2QyxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7U0FDeEM7UUFDRCxVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQ25DLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUNyQyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQ3ZDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTthQUMvRDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO1FBQzlDLGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtTQUMzQztRQUNELFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLGNBQWM7WUFDcEIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDbkMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUMxQyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7b0JBQzdDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtvQkFDckMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO29CQUMzQyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQzVDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDdEMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2dDQUM1QyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2dDQUM1QyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTthQUMvRDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO1FBQzVDLGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtTQUM3QztRQUNELFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLGNBQWM7WUFDcEIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDbkMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO29CQUN0QyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ3JDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtvQkFDekMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO29CQUN4QyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7YUFDL0Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUN0QyxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7U0FDdkM7UUFDRCxVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQ25DLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO29CQUN6QyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ3JDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtvQkFDM0MsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUMxQyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7b0JBQzFDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtvQkFDN0MsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2dDQUM1QyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtvQkFDNUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO2dDQUMzQyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDdEMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2dDQUM1QyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7b0JBQ2QsWUFBWSxFQUFFO3dCQUNaLElBQUksRUFBRSxjQUFjO3dCQUNwQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2dDQUM1QyxVQUFVLEVBQUUsRUFBRTs2QkFDZjs0QkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7eUJBQy9EO3FCQUNGO2lCQUNGO2dCQUNELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTthQUMvRDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO1FBQzVDLGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtTQUM3QztRQUNELFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLGNBQWM7WUFDcEIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtvQkFDcEMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUN2QyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7YUFDL0Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtRQUMzQyxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7U0FDNUM7UUFDRCxVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7b0JBQ3BDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtvQkFDdEMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFO2FBQy9EO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQW1DO0lBQ3JELE1BQU0sRUFBRTtRQUNOO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDbkMsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsRUFBRTtTQUNmO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtZQUMxQyxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ3JDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLEVBQUU7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7WUFDdkMsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsRUFBRTtTQUNmO1FBQ0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFO0tBQy9EO0lBQ0QsYUFBYSxFQUFFO1FBQ2I7WUFDRSxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtZQUNuQyxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO1lBQzFDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLEVBQUU7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7WUFDN0MsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsRUFBRTtTQUNmO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUNyQyxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO1lBQzNDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLEVBQUU7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtB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