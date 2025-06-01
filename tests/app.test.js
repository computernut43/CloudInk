// Basic test to verify the test framework is working

describe('CloudInk', () => {
	test('should have a valid package.json', () => {
		const pkg = require('../package.json')
		expect(pkg.name).toBe('cloudink')
		expect(pkg.version).toBeDefined()
		expect(pkg.main).toBeDefined()
	})

	test('should have proper build scripts', () => {
		const pkg = require('../package.json')
		expect(pkg.scripts.build).toBeDefined()
		expect(pkg.scripts.start).toBeDefined()
		expect(pkg.scripts.test).toBeDefined()
	})
})