'use strict'

const i18n				= require( './i18n.min' )

const { remote }		= require( '@electron/remote' )
const app				= remote.app
const dialog			= remote.dialog
const path				= require('path')
const Store				= require( 'electron-store' )
const store				= new Store()
const fs				= require( 'fs-extra' )
const log				= require( 'electron-log' )


module.exports.importFile = function( callback ) {
	
	dialog.showOpenDialog(remote.getCurrentWindow(), {
		
		defaultPath: app.getPath( 'home' ),
		buttonLabel: i18n.t('app:dialog.button.import', 'Import File'),
		message: i18n.t( 'app:dialog.message.import', 'You can import the following file formats: .md, .txt'),
		properties: [	'openFile',
						'openDirectory'
					],
		filters: [
				{	name:		'notes',
					extensions:	['md', 'txt']
				}
			]
		}
	
	).then((data) => {
		
		if( data.canceled === false ) {
			
			let	filename = path.basename( data.filePaths[0] )
			
			fs.readFile( data.filePaths[0], 'utf8', function ( err, filecontents ) {
			
				if ( err ) {
					
					return log.info( err )
				}
				
				let body
				
				switch( store.get( 'categories.selected' ) ) {
				
					case '##all##':
					case '##none##':
						
						body = {
							"content": filecontents
						}
						
					break
					
					case '##fav##':
						
						body = {
							"content": filecontents,
							"favorite": true
						}
						
					break
					
					default:
						
						body = {
							"content": filecontents,
							"category": $('.categories li button.selected').data('category')
						}
				}
				
				callback( filename, body )
			})
		}
	})
}
