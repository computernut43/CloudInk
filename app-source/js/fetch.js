'use strict'

const i18n = require( './i18n.min' )

const { remote }	= require( '@electron/remote' )
const dialog		= remote ? remote.dialog : null
const Store			= require( 'electron-store' )
const store			= new Store()
const log			= require( 'electron-log' )


module.exports.apiCall = function ( call, id, body, callback ) {
	
	let server 		= store.get( 'loginCredentials.server' ),
		username 	= store.get( 'loginCredentials.username' ),
		password 	= store.get( 'loginCredentials.password' )
		
	let method
	
	switch( call ) {
		
		case 'new':
			method = 'POST'
		break
		
		case 'save':
		case 'update':
		case 'category':
			method = 'PUT'
		break
		
		case 'delete':
			method = 'DELETE'
		break
		
		default: // = all, single or export
			method = 'GET'
	}
	
	let url = '/index.php/apps/notes/api/v0.2/notes',
	init = {
		
		method: method,
		headers: {
			'Authorization': 'Basic ' + btoa( username + ':' + password ),
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'omit'
	}
	
	if( id ) { url += `/${id}` }
	if( body ) { init.body = JSON.stringify( body ) }
	
	log.info( `URL: ${server}${url}` )
	
	fetch(server + url, init)
	.then(function(response) {
		
		if(!response.ok) {
			
			log.warn(`fetch error: ${response.status} - ${response.statusText}`)
			let errTxt = parseErrorMessage( response.status )
			throw Error( `${response.status} ${errTxt}` )
			
		} else {
		
			log.info( `response ok` )
			return response.text()
		}
	
	}).then(function(message) {
		
		let notes = JSON.parse(message)
		
		if (notes['status'] == 'error') {
			
			dialog.showErrorBox(
				i18n.t('app:dialog.error.json.title', 'JSON parsing error'),
				i18n.t('app:dialog.error.json.text', 'An error occured parsing the notes')
			)
			
			log.error( notes['message'] )
		
		} else {
			
			callback( call, id, body, notes )
		}
	
	}).catch( function( error ) {
		
		log.error(error)
		
		dialog.showErrorBox(
			i18n.t('app:dialog.error.server.title', 'Server error'),
			i18n.t('app:dialog.error.server.text', 'there was an error retrieving') + `:\n${server}${url}\n\n${error}`
		)
	})
}



function parseErrorMessage( message ) {
	
	let errMsg
	
	switch( message ) {
		
		case 400: errMsg = i18n.t('app:dialog.error.message.400', 'Bad Request')
		break
		case 401: errMsg = i18n.t('app:dialog.error.message.401', 'Unauthorized')
		break
		case 403: errMsg = i18n.t('app:dialog.error.message.403', 'Forbidden')
		break
		case 404: errMsg = i18n.t('app:dialog.error.message.404', 'Not Found')
		break
		case 500: errMsg = i18n.t('app:dialog.error.message.500', 'Internal Server Error')
		break
		case 501: errMsg = i18n.t('app:dialog.error.message.501', 'Not Implemented')
		break
		case 502: errMsg = i18n.t('app:dialog.error.message.502', 'Bad Gateway')
		break
		case 503: errMsg = i18n.t('app:dialog.error.message.503', 'Service Unavailable')
		break
		case 504: errMsg = i18n.t('app:dialog.error.message.504', 'Gateway Timeout')
		break
		
		default: errMsg =  i18n.t('app:dialog.error.message.default', 'Unspecified')
	}
	
	return errMsg
}
