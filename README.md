<img src="https://andrejsharapov.github.io/src/share.png" alt="GitHub Open Source Portfolio by Andrej Sharapov">

# andrejsharapov.github.io

Open Source Portfolio at GitHub

## Visual Studio Code Plugins to Run

+ Live Sass Compiler
+ Live Server

### Settings live Sass Compiler

1. CTRL+SHIFT+/
2. Search: liveSassCompile.settings.formats
3. Check: settings.json
4. Add code:

```js
"liveSassCompile.settings.formats": [
    {
        "format": "expanded",
        "extensionName": ".css",
        "savePath": "/build/css/"
    }
],
```

## NPM Sources

node -v `v10.16.0`  
npm -v `6.11.3`  
gulp cli -v `2.2.0`  
gulp -v `4.0.2`  

+ npm i -g gulp-cli
+ npm i -D gulp
+ npm i -D gulp-pug
+ npm i -D node-sass gulp-sass

+ npm i -D gulp-sourcemaps
+ npm i -D gulp-concat
+ npm i -D gulp-merge-media-queries
+ npm i -D gulp-clean-css
+ npm i -D gulp-babel @babel/core @babel/preset-env
+ npm i -D gulp-uglify
+ npm i -D gulp-rename

+ npm i -D gulp-cache
+ npm i -D gulp-newer
+ npm i -D gulp-imagemin
  + npm i -D imagemin-mozjpeg
  + npm i -D imagemin-optipng
  + npm i -D imagemin-svgo
  + npm i -D imagemin-webp
+ npm i -D gulp-flatten

### Google Chrome plugins for GitHub

+ Octotree
+ OctoLinker
+ GitHub Repository Size
+ GitHub NPM Stats
+ NPMHub
+ Isometric Contributions
+ GitHub Hovercard
+ Refiner GitHub
