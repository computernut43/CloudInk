'use strict'

const i18n 				= require( './i18n.min' )
const {ipcRenderer} 	= require( 'electron' )
const Store 			= require( 'electron-store' )
const store 			= new Store()
const Mousetrap 		= require( 'mousetrap' )

// Safe remote initialization with fallback
let remote
try {
	const remoteModule = require( '@electron/remote' )
	remote = remoteModule
	console.log('DEBUG: Login remote initialized:', !!remote)
} catch (error) {
	console.error('DEBUG: Login remote initialization failed:', error)
	remote = null
}

const log				= require( 'electron-log' )
const $ 				= require( 'jquery' )
const jqueryI18next 	= require( 'jquery-i18next' )


jqueryI18next.init(i18n, $)



//note(dgmid): log exceptions

window.onerror = function( error, url, line ) {
	
	ipcRenderer.send( 'error-in-render', {error, url, line} )
}



//note(dgmid): set lang & localize strings

$('html').attr('lang', i18n.language)
$('header').localize()
$('label').localize()
$('input').localize()
$('.cert-warning span').localize()
$('button').localize()



//note(dgmid): register kbd shortcut

Mousetrap.bind('command+.', function() {
	
	closeModal()
})



//note(dgmid): get login credentials

let 	server 		= store.get( 'loginCredentials.server' ),
		username 	= store.get( 'loginCredentials.username' ),
		password 	= store.get( 'loginCredentials.password' )

if( server ) { $('input[name="server"]').val( server ) }



//note(dgmid): close modal

function closeModal() {
	
	console.log('DEBUG: Login closeModal called, remote available:', !!remote)
	if (remote && remote.getCurrentWindow) {
		try {
			const modal = remote.getCurrentWindow()
			modal.close()
			console.log('DEBUG: Login modal closed via remote')
		} catch (error) {
			console.error('DEBUG: Error closing login modal via remote:', error)
			// Fallback: send IPC message to parent to close modal
			ipcRenderer.send('close-login-modal-request')
		}
	} else {
		console.log('DEBUG: Remote not available, using IPC fallback')
		// Fallback: send IPC message to parent to close modal
		ipcRenderer.send('close-login-modal-request')
	}
}



//note(dgmid): update-theme

ipcRenderer.on('set-theme', (event, message) => {
	
	__setTheme()
})

// Ensure theme is properly set when modal loads
function ensureTheme() {
	console.log('DEBUG: Ensuring theme is set for login modal')
	console.log('DEBUG: Current data-theme:', document.documentElement.getAttribute('data-theme'))
	
	// Force theme update if not set properly
	if (typeof __setTheme === 'function') {
		__setTheme()
	}
	
	// Log the current theme state
	console.log('DEBUG: After theme update, data-theme:', document.documentElement.getAttribute('data-theme'))
	console.log('DEBUG: OS theme from localStorage:', localStorage.os_theme)
}



$(document).ready(function() {	
	
	// Ensure theme is properly applied
	ensureTheme()
	
	//note(dgmid): set button states
	
	if( server ) {
		
		if( username && password ) {
			
			$('#update').prop('disabled', true)
			$('#logout').prop('disabled', false)
		
		} else {
			
			$('#update').prop('disabled', false)
			$('#logout').prop('disabled', true)
		}
		
	} else {
		
		$('#update').prop('disabled', false)
		$('#logout').prop('disabled', true)
	}
	
	$('#nocertificate').prop('checked', store.get('appSettings.nocertificate'))
	
	
	//note(dgmid): no certificate
	
	$('#nocertificate').click(function() {
		
		let cert = $(this).is(':checked')
		
		if( cert === true ) {
			
			log.warn(`allowing unsecure connection`)
		
		} else {
			
			log.info(`using secure connection`)
		}
		
		store.set('appSettings.nocertificate', cert)
	})
	
	
	//note(dgmid): cancel modal
	
	$('#cancel').click( function() {
		
		closeModal()
	})
	
	
	//note(dgmid): update data
	
	$('#modal-form').submit( function( e ) {
		
		e.preventDefault()
		
		let theserver = $('input[name="server"]').val()
		
		store.set( 'loginCredentials.server', theserver )
		ipcRenderer.send( 'loginflow', theserver )
		closeModal()
	})
	
	
	//note(dgmid): logout
	
	$('#logout').click( function() {
		
		store.set( 'loginCredentials', {
			
			server: '',
			username: '',
			password: ''
		})
		
		ipcRenderer.send('reload-sidebar', 'logout')
		closeModal()
	})
})
