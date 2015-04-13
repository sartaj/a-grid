# Evergreen Grid (eg-grid)
Simplified grid using Flexbox and native Web Components.

## Usage

```html
	<html>
		<head>
			<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script> <!-- No ShadowDOM needed -->
			<link rel="import" href="src/eg-grid.html">
		</head>
		<body>
			<eg-grid group>
				<eg-grid small="2" medium="2" large="3"></eg-grid>
				<eg-grid small="2" ></eg-grid>
			</eg-grid>
		</body>
	</html>
```


## Purpose
Simplify the usage of CSS grids by leveraging evergreen technologies (i.e. tech that requires latest browsers).

## Features
* Flexbox Grid
* Native Web Component (no Polymer needed)
* No Shadow DOM Polyfill needed

## Roadmap
* Add to bower/npm
* Versioning
* Gulp
* Tests
* Error/debug hander
* Auto div creation when needed 
* Coverage
* Debug
* Add debug for common misuses of grid
* Box Ordering
* Box Offset
* Viewport usage
