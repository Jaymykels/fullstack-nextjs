import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // TypeGraphQL & class decorators support
    if (!config.module) {
      config.module = {
        rules: [],
      };
    }

    if (!config.module.rules) {
      config.module.rules = [];
    }

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
