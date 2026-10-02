import { globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      // These React Compiler checks flag established legacy patterns here.
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
];

export default eslintConfig;
