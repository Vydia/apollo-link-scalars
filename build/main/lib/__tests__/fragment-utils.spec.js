"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = exports.fragments = void 0;
const fragment_utils_1 = require("../fragment-utils");
exports.fragments = [
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
exports.flatten = {
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
        expect(fragment_utils_1.fragmentMapFrom(exports.fragments)).toEqual(exports.flatten);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnQtdXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvX190ZXN0c19fL2ZyYWdtZW50LXV0aWxzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsc0RBQW9EO0FBR3ZDLFFBQUEsU0FBUyxHQUE2QjtJQUNqRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ3ZDLGFBQWEsRUFBRTtZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtTQUN4QztRQUNELFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLGNBQWM7WUFDcEIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDbkMsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO29CQUMxQyxTQUFTLEVBQUUsRUFBRTtvQkFDYixVQUFVLEVBQUUsRUFBRTtpQkFDZjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7b0JBQ3JDLFNBQVMsRUFBRSxFQUFFO29CQUNiLFVBQVUsRUFBRSxFQUFFO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUks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