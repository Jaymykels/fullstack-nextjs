import './envConfig.ts'
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT,
  documents: "src/**/*.ts",
  generates: {
    "src/graphql/codegen/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      }
    }
  }
};

export default config;
