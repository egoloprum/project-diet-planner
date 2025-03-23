import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginBoundaries from 'eslint-plugin-boundaries'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      boundaries: eslintPluginBoundaries,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            '**/index',
            '**/?(*.)+(container|page|api)',
            '**/shared/**',
            '**/features/**',
            '**/entities/**',
            '**/widgets/**',
            'next/link',
            '@hookform/resolvers/zod',
            'next/navigation',
            'next/headers',
            'next/image',
            'next/font/google',
            'next/server'
          ]
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          message: 'FSD: {{ fromType }} не может импортировать {{ toType }}',
          rules: [
            {
              from: ['app'],
              allow: ['entities', 'features', 'widgets', 'shared']
            },
            {
              from: ['widgets'],
              allow: ['entities', 'features', 'shared']
            },
            {
              from: ['features'],
              allow: ['entities', 'shared']
            },
            {
              from: ['entities'],
              allow: ['shared']
            },
            {
              from: ['shared'],
              allow: ['shared']
            }
          ]
        }
      ]
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/**/*'
        },
        {
          type: 'entities',
          pattern: 'src/entities/**/*'
        },
        {
          type: 'features',
          pattern: 'src/features/**/*'
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/**/*'
        },
        {
          type: 'shared',
          pattern: 'src/shared/**/*'
        }
      ]
    }
  }
]

export default eslintConfig
