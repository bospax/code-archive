# TypeScript + Webpack

### Setup & Use Cases

```ts
// using typescript with webpack
npm install webpack webpack-cli ts-loader typescript --save-dev

// create a file named webpack.config.js in root directory
// configuration:
// - Entry: This defines the starting point for Webpack to begin building the dependency graph, typically the main TypeScript file (index.ts).
// - Module Rules: Tells Webpack to process .ts files using ts-loader, which compiles TypeScript into JavaScript.
// - Output: Webpack will bundle all dependencies into a single bundle.js file and place it in the dist directory.

const path = require('path');

module.exports = {
	entry: './src/index.ts',  // Entry point for TypeScript file
	module: {
		rules: [
			{
				test: /\.ts$/,           // For .ts files
				use: 'ts-loader',         // Use ts-loader to transpile TypeScript
				exclude: /node_modules/   // Exclude node_modules from transpiling
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']    // Resolve both TypeScript and JavaScript files
	},
	output: {
		filename: 'bundle.js',        // Output file name
		path: path.resolve(__dirname, 'dist')  // Output directory
	}
};
```

```ts
// create project structure
/your-project-folder
├── /dist               // Where bundle.js will be output after running Webpack
├── /src
│   └── index.ts        // Your main TypeScript file
├── package.json        // Your npm dependencies
├── tsconfig.json       // Your TypeScript configuration
├── webpack.config.js   // Webpack configuration file

// run Webpack to bundle TypeScript files into a single bundle.js file
webpack // for global
npx webpack // for local
```

```html
<!-- reference bundle.js in HTML file to use the compiled JavaScript in a web app -->
<body>
	<script src="./dist/bundle.js"></script>
</body>
```
