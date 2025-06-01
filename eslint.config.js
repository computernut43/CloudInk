import js from '@eslint/js'

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'commonjs',
			globals: {
				require: 'readonly',
				module: 'readonly',
				exports: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				console: 'readonly',
				Buffer: 'readonly',
				global: 'readonly',
				window: 'readonly',
				document: 'readonly',
				$: 'readonly',
				jQuery: 'readonly',
				electronAPI: 'readonly'
			}
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'error',
			'semi': ['error', 'never'],
			'quotes': ['error', 'single'],
			'indent': ['error', 'tab'],
			'no-trailing-spaces': 'error',
			'eol-last': 'error',
			'no-console': 'off',
			'no-mixed-spaces-and-tabs': 'error'
		},
		files: ['app-source/js/**/*.js']
	}
]