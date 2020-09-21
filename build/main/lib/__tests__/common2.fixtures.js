"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedFragmentsReduced = exports.operationQuery = void 0;
exports.operationQuery = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GetClients" },
            variableDefinitions: [],
            directives: [],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "clients" },
                        arguments: [],
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
                        alias: { kind: "Name", value: "more" },
                        name: { kind: "Name", value: "clients" },
                        arguments: [],
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
                        name: { kind: "Name", value: "now" },
                        arguments: [],
                        directives: [],
                    },
                    {
                        kind: "Field",
                        alias: { kind: "Name", value: "what" },
                        name: { kind: "Name", value: "now" },
                        arguments: [],
                        directives: [],
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
    ],
};
// 1. resolve fragments
exports.expectedFragmentsReduced = {
    kind: "OperationDefinition",
    operation: "query",
    name: { kind: "Name", value: "GetClients" },
    variableDefinitions: [],
    directives: [],
    selectionSet: {
        kind: "SelectionSet",
        selections: [
            {
                kind: "Field",
                name: { kind: "Name", value: "clients" },
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
                alias: { kind: "Name", value: "more" },
                name: { kind: "Name", value: "clients" },
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
                name: { kind: "Name", value: "now" },
                arguments: [],
                directives: [],
            },
            {
                kind: "Field",
                alias: { kind: "Name", value: "what" },
                name: { kind: "Name", value: "now" },
                arguments: [],
                directives: [],
            },
        ],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uMi5maXh0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvX190ZXN0c19fL2NvbW1vbjIuZml4dHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxjQUFjLEdBQWlCO0lBQzFDLElBQUksRUFBRSxVQUFVO0lBQ2hCLFdBQVcsRUFBRTtRQUNYO1lBQ0UsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixTQUFTLEVBQUUsT0FBTztZQUNsQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7WUFDM0MsbUJBQW1CLEVBQUUsRUFBRTtZQUN2QixVQUFVLEVBQUUsRUFBRTtZQUNkLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsY0FBYztnQkFDcEIsVUFBVSxFQUFFO29CQUNWO3dCQUNFLElBQUksRUFBRSxPQUFPO3dCQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTt3QkFDeEMsU0FBUyxFQUFFLEVBQUU7d0JBQ2IsVUFBVSxFQUFFLEVBQUU7d0JBQ2QsWUFBWSxFQUFFOzRCQUNaLElBQUksRUFBRSxjQUFjOzRCQUNwQixVQUFVLEVBQUU7Z0NBQ1Y7b0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtvQ0FDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29DQUN2QyxVQUFVLEVBQUUsRUFBRTtpQ0FDZjtnQ0FDRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQUU7NkJBQy9EO3lCQUNGO3FCQUNGO29CQUNEO3dCQUNFLElBQUksRUFBRSxPQUFPO3dCQUNiLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxF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