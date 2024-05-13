import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: [
    "src/requetes/queries/*.queries.ts",
    "src/requetes/mutations/*.mutations.ts",
  ],
  generates: {
    "./src/types/graphql.ts": {
      config: {
        useIndexSignature: true,
        // maybeValue: "T | undefined",
        // This could remove if we set __typename to false in the GraphQL memory cache
        // skipTypeNameForRoot: true
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};
export default config;
