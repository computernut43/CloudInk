module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/*.(test|spec).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	collectCoverageFrom: [
		'app-source/js/**/*.{js,ts}',
		'!app-source/js/**/*.min.js',
		'!**/node_modules/**',
		'!**/dist/**'
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}