
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
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
