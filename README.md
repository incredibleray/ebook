# thank you, devs and contributors of these libraries!
react, 
electron
Create-react-app
React-bootstrap: https://react-bootstrap.github.io/
Recharts: https://github.com/recharts/recharts
electron-builder: https://www.electron.build/

## and authors of these articles
https://mmazzarolo.com/blog/2021-08-12-building-an-electron-application-using-create-react-app/
https://www.section.io/engineering-education/desktop-application-with-react/

# build on a new device
git clone
npm run build
cp electron.js build/
edit the index.html in build/ and add 
```
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' 'unsafe-inline';"
/>
```
after say, `<meta name="theme-color" content="#000000"/>`


# Add main property
package.json
{
  "name": "my-electron-app",
  "version": "0.1.0",
  "private": true,
  "main": "./public/electron.js",
  "dependencies": {
Electron’s preload script
By default, the process running in your browser won’t be able to communicate with the Node.js process. Electron solves this problem by allowing the use of a preload script: a script that runs before the renderer process is loaded and has access to both renderer globals (e.g., window and document) and a Node.js environment.

In our electron.js script, we already specified that we expect a preload script to be loaded from <project-root>/public/preload.js. So, let’s create it:


# Update the homepage property
We need to enforce Create React App to infer a relative root path in the generated HTML file. This is a requirement because we’re not going to serve the HTML file; it will be loaded directly by Electron. To do so, we can set the homepage property of the package.json to ./ (see Building For Relative Paths in the Create React App documentation for more details).

package.json
{
  "name": "my-electron-app",
  "version": "0.1.0",
  "private": true,
  "homepage": "./",
  "main": "./public/electron.js",
  "dependencies": {

# Update browserslist’s targets
Update the browserslist section of package.json to support only the latest Electron version. This ensures Webpack/Babel will only add the polyfills and features we strictly need, keeping the bundle size to the minimum.

package.json
"browserslist": {
   "production": [
      "last 1 electron version",
   ],
   "development": [
      "last 1 electron version",
   ]
 },

# Define a Content Security Policy
A Content Security Policy (CSP) is an additional layer of protection against cross-site scripting attacks and data injection attacks. So I highly recommend to enable it in <project-root>/public/index.html.
The following CSP will allow Electron to run only inline scripts (the ones injected in the HTML file by Create React App’s build process).

public/index.html
   <meta name="theme-color" content="#000000" />
   <meta
     name="description"
     content="Web site created using create-react-app"
   />
   <meta
     http-equiv="Content-Security-Policy"
     content="script-src 'self' 'unsafe-inline';"
   />