'use strict'

// based on: https://gist.github.com/EtienneLem/7e3bc7af2ed75a15eae9006557ef790e#file-preload-js

const os			= require( 'os' ).release()
const parts			= os.split( '.' )
const color			= require( 'color' )
const Store			= require( 'electron-store' )
const store			= new Store()

// Safe remote initialization with fallback
let remote, systemPreferences, nativeTheme
try {
	remote = require( '@electron/remote' )
	systemPreferences = remote ? remote.systemPreferences : null
	nativeTheme = remote ? remote.nativeTheme : null
	console.log('DEBUG: Preload remote initialized:', !!remote)
} catch (error) {
	console.error('DEBUG: Preload remote initialization failed:', error)
	remote = null
	systemPreferences = null
	nativeTheme = null
}


const setOSTheme = () => {
	
	// Don't override accent colors if user has manually selected a theme
	if (window.localStorage.user_theme) {
		// Only update OS theme detection, but preserve user's theme choice
		let theme = 'light'
		try {
			if (nativeTheme && systemPreferences) {
				theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
			}
		} catch (error) {
			console.log('DEBUG: Using fallback theme due to:', error.message)
		}
		
		if( parts[0] <= 17 ) { 
			theme = 'light'
		}
		
		window.localStorage.os_theme = theme
		
		if ('__setTheme' in window) {
			window.__setTheme()
		}
		return
	}
	
	// Fallback theme detection if remote is not available
	let theme = 'light'
	let accent = '0a5fff'
	
	try {
		if (nativeTheme && systemPreferences) {
			theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
			accent = systemPreferences.getAccentColor().substr(0, 6)
		}
	} catch (error) {
		console.log('DEBUG: Using fallback theme due to:', error.message)
	}
		
	if( parts[0] <= 17 ) { 
		theme = 'light'
		accent = '0a5fff'
	}
	
	let light = color('#'+accent).lighten(.15).hex()
	let dark = color('#'+accent).darken(.175).hex()
	
	window.localStorage.os_theme = theme
	window.localStorage.accent = `#${accent}`
	window.localStorage.accent_light = light
	window.localStorage.accent_dark = dark

	if ('__setTheme' in window) {
		window.__setTheme()
	}
}


// Only subscribe to notifications if systemPreferences is available
if (systemPreferences) {
	try {
		systemPreferences.subscribeNotification(
			'AppleInterfaceThemeChangedNotification',
			setOSTheme,
		)
	} catch (error) {
		console.log('DEBUG: Could not subscribe to theme notifications:', error.message)
	}
}


setOSTheme()
