# use-context is changed from original version.

## use-context is modified to use statically loading store and nav inside host app

## What is changed
index.html has entry point for remote load nav/ and store/ but not as remote host.
lerna is introduced - can run yarn install from root of use-context as well as build


### How to run the example
1. cd use-context
2. yarn install
3. copy dist/ from store/ and nav/ folders (except main*.js) into host/dist. (should automate)
4. cd host/
5. npm run build:start

### How about hot reload
For local development we can modify index.html to use remote host and port option as before. Can introduce simple variable
to change remote loading option

e.g. 
```
<% if (developmentMode) { %>
    <script src="http://localhost:8081/nav.js" defer></script>
    <script src="http://localhost:8082/store.js" defer></script>
<% } else { %>
    <script src="/nav.js" defer></script>
    <script src="/store.js" defer></script>
<% } %>
    
```