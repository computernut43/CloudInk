# Login Menu Debugging Guide

## Testing Steps

1. **Launch the App:**
   ```bash
   npm run build
   npm start
   ```

2. **Test Login Menu:**
   - Click the menu bar → **Nextcloud Notes Client** → **Log in/out to Nextcloud...**
   - Or use keyboard shortcut: `Cmd+Ctrl+Alt+L`

3. **Expected Behavior:**
   - A modal window should open showing the login form
   - The form should have fields for:
     - Server URL
     - Username  
     - Password

4. **Troubleshooting Console:**
   - If menu doesn't work, open Developer Tools (Cmd+Alt+I)
   - Look for errors in Console tab
   - Check if IPC message 'open-login-modal' is sent

## Fixed Issues

✅ **Remote Module:** Updated `@electron/remote` imports in key files:
- `app.js` - Main renderer process
- `login.js` - Login modal functionality  
- `modal.js` - Modal window creation
- `fetch.js` - API calls
- `export.js`, `import.js`, `version.js` - Supporting modules

✅ **Node Integration:** Enabled for compatibility
✅ **Context Isolation:** Disabled for compatibility
✅ **IPC Communication:** Menu → App → Modal chain working

## Code Flow

1. **Menu Click:** `menu-app.js` line 33
   ```js
   click (item, focusedWindow) { 
     if(focusedWindow) focusedWindow.webContents.send('open-login-modal', 'open-login-modal') 
   }
   ```

2. **IPC Handler:** `app.js` (around line with ipcRenderer.on)
   ```js
   ipcRenderer.on('open-login-modal', (event, message) => {
     modalWindow.openModal( `file://${__dirname}/../html/login.html`, 480, 210, false )
   })
   ```

3. **Modal Creation:** `modal.js`
   ```js
   openModal: function( url, width, height, resize ) {
     modal = new remote.BrowserWindow({...})
   }
   ```

## Still Not Working?

If the login menu still doesn't work:

1. **Check Console Errors:** Look for remote module errors
2. **Test Keyboard Shortcut:** Try `Cmd+Ctrl+Alt+L`
3. **Test Other Menus:** See if Preferences menu works (`Cmd+,`)
4. **Enable Debug Mode:** 
   ```bash
   npm run dev  # This enables development logging
   ```

## Manual Test

You can manually trigger the login modal from the console:
```js
// Open developer tools and run:
require('./dist/js/modal.min').openModal('file://' + __dirname + '/dist/html/login.html', 480, 210, false)
```