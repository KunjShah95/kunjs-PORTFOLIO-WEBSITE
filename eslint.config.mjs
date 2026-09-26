import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * eslint-config-next v16 ships native flat configs, so these are spread
 * directly instead of going through the legacy FlatCompat shim.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".archive/**"],
  },
];

export default eslintConfig;
