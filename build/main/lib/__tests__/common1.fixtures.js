"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedFragmentsReduced = exports.operationQuery = void 0;
exports.operationQuery = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GetClientDashboardFocus" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "clientKey" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
                    },
                    directives: [],
                },
            ],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "client" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "clientKey" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "clientKey" },
                                },
                            },
                        ],
                        directives: [],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "Client" },
                                    directives: [],
                                },
                                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            ],
                        },
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "visibleDashboards" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "clientKey" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "clientKey" },
                                },
                            },
                        ],
                        directives: [],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "DashboardInfo" },
                                    directives: [],
                                },
                                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            ],
                        },
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "visibleFocusList" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "clientKey" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "clientKey" },
                                },
                            },
                        ],
                        directives: [],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "Focus" },
                                    directives: [],
                                },
                                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                            ],
                        },
                    },
                ],
            },
        },
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
    ],
};
// 1. resolve fragments
exports.expectedFragmentsReduced = {
    kind: "OperationDefinition",
    operation: "query",
    name: { kind: "Name", value: "GetClientDashboardFocus" },
    variableDefinitions: [
        {
            kind: "VariableDefinition",
            variable: {
                kind: "Variable",
                name: { kind: "Name", value: "clientKey" },
            },
            type: {
                kind: "NonNullType",
                type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
            },
            directives: [],
        },
    ],
    directives: [],
    selectionSet: {
        kind: "SelectionSet",
        selections: [
            {
                kind: "Field",
                name: { kind: "Name", value: "client" },
                arguments: [
                    {
                        kind: "Argument",
                        name: { kind: "Name", value: "clientKey" },
                        value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "clientKey" },
                        },
                    },
                ],
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
                kind: "Field",
                name: { kind: "Name", value: "visibleDashboards" },
                arguments: [
                    {
                        kind: "Argument",
                        name: { kind: "Name", value: "clientKey" },
                        value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "clientKey" },
                        },
                    },
                ],
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
                },
            },
            {
                kind: "Field",
                name: { kind: "Name", value: "visibleFocusList" },
                arguments: [
                    {
                        kind: "Argument",
                        name: { kind: "Name", value: "clientKey" },
                        value: {
                            kind: "Variable",
                            name: { kind: "Name", value: "clientKey" },
                        },
                    },
                ],
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
                },
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uMS5maXh0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvX190ZXN0c19fL2NvbW1vbjEuZml4dHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxjQUFjLEdBQWlCO0lBQzFDLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRTtRQUNYO1lBQ0UsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixTQUFTLEVBQUUsT0FBTztZQUNsQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtZQUN4RCxtQkFBbUIsRUFBRTtnQkFDbkI7b0JBQ0UsSUFBSSxFQUFFLG9CQUFvQjtvQkFDMUIsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxVQUFVO3dCQUNoQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7cUJBQzNDO29CQUNELElBQUksRUFBRTt3QkFDSixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtxQkFDckU7b0JBQ0QsVUFBVSxFQUFFLEVBQUU7aUJBQ2Y7YUFDRjtZQUNELFVBQVUsRUFBRSxFQUFFO1lBQ2QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxjQUFjO2dCQUNwQixVQUFVLEVBQUU7b0JBQ1Y7d0JBQ0UsSUFBSSxFQUFFLE9BQU87d0JBQ2IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO3dCQUN2QyxTQUFTLEVBQUU7NEJBQ1Q7Z0NBQ0UsSUFBSSxFQUFFLFVBQVU7Z0NBQ2hCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FB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