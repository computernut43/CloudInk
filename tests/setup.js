// Jest setup file for Electron environment

// Mock Electron modules for testing
jest.mock('electron', () => ({
	app: {
		getPath: jest.fn(() => '/mock/path'),
		on: jest.fn(),
		quit: jest.fn()
	},
	ipcMain: {
		on: jest.fn(),
		send: jest.fn()
	},
	BrowserWindow: jest.fn(() => ({
		loadURL: jest.fn(),
		show: jest.fn(),
		on: jest.fn(),
		webContents: {
			send: jest.fn()
		}
	})),
	dialog: {
		showErrorBox: jest.fn()
	}
}))

jest.mock('@electron/remote', () => ({
	app: {
		getPath: jest.fn(() => '/mock/path')
	},
	dialog: {
		showErrorBox: jest.fn()
	}
}))

jest.mock('electron-store', () => {
	return jest.fn().mockImplementation(() => ({
		get: jest.fn(),
		set: jest.fn(),
		openInEditor: jest.fn()
	}))
})

jest.mock('electron-log', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn()
}))