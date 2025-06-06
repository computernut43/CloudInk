
window.__setTheme = () => {
	
	let userTheme 		= localStorage.user_theme,
		OSTheme 		= localStorage.os_theme,
		defaultTheme 	= 'light',
		accent			= localStorage.accent,
		accent_light	= localStorage.accent_light,
		accent_dark		= localStorage.accent_dark

	// Use consistent accent colors for manually selected themes
	if( userTheme ) {
		// For manually selected themes, use predefined consistent colors
		accent = '#3478f6'
		accent_light = '#3279FF'
		accent_dark = '#004EE1'
		console.log('DEBUG: Using manual theme colors:', {accent, accent_light, accent_dark})
	} else {
		console.log('DEBUG: Using OS theme colors:', {accent, accent_light, accent_dark})
	}
	
	
	document.documentElement.setAttribute(
		'data-theme',
		userTheme || OSTheme || defaultTheme,
	)
	
	if( userTheme ) {
		
		document.documentElement.setAttribute( 'data-user', userTheme )
		
	} else {
		
		document.documentElement.removeAttribute( 'data-user' )
	}
	
	
	document.documentElement.setAttribute( 'style', `--accent: ${accent}; --accent-light: ${accent_light}; --accent-dark: ${accent_dark};`)
	document.documentElement.setAttribute( 'data-colors', `["${accent}","${accent_light}","${accent_dark}"]` )
}

__setTheme()
