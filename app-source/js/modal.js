'use strict'

const path = require( 'path' )

// Safe remote initialization with fallback
let remote
try {
	const remoteModule = require( '@electron/remote' )
	remote = remoteModule
	console.log('DEBUG: Modal remote initialized:', !!remote)
} catch (error) {
	console.error('DEBUG: Modal remote initialization failed:', error)
	remote = null
}

let modal


module.exports = {
	
	openModal: function( url, width, height, resize ) {
		
		console.log('DEBUG: openModal called with:', { url, width, height, resize })
		console.log('DEBUG: remote object:', remote)
		
		if (!remote) {
			console.error('DEBUG: Remote module not available, cannot open modal')
			return
		}
		
		try {
			modal = new remote.BrowserWindow({
		
			parent: remote.getCurrentWindow(),
			modal: true,
			width: width,
			minWidth: width,
			maxWidth: width,
			height: height,
			minHeight: height,
			resizable: resize,
			show: false,
			transparent: true,
			vibrancy: 'window',
			webPreferences: {
				devTools: true,
				nodeIntegration: true,
				enableRemoteModule: true,
				contextIsolation: false,
				preload: path.join(__dirname, './preload.min.js')
			}	
		})
		
		console.log('DEBUG: Modal BrowserWindow created successfully')
		
		// Enable remote module for modal window
		try {
			const remoteMain = require('@electron/remote/main')
			remoteMain.enable(modal.webContents)
			console.log('DEBUG: Remote enabled for modal webContents')
		} catch (error) {
			console.error('DEBUG: Failed to enable remote for modal:', error)
		}
		
		modal.loadURL( url )
		console.log('DEBUG: Modal loadURL called')
		
		modal.once('ready-to-show', () => {
			console.log('DEBUG: Modal ready to show')
			modal.show()
			console.log('DEBUG: Modal show() called')
		})
		
		} catch (error) {
			console.error('DEBUG: Error in openModal:', error)
		}	
	},
	
	closeModal: function() {
		
		console.log('DEBUG: closeModal called, modal exists:', !!modal)
		if (modal) {
			try {
				modal.close()
				console.log('DEBUG: Modal closed successfully')
				modal = null
			} catch (error) {
				console.error('DEBUG: Error closing modal:', error)
			}
		} else {
			console.log('DEBUG: No modal to close')
		}
	}
}
