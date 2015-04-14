# Evergreen Grid (eg-grid)
Simplified grid using Flexbox and native Web Components.

## Usage

```html
<html>
	<head>
		<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script> <!-- No ShadowDOM needed -->
		<link rel="import" href="bower_components/evergreen-grid/dist/eg-grid.html">
	</head>
	<body>
		<eg-grid group>
			<eg-grid small="2" medium="2" large="3"></eg-grid>
			<eg-grid small="2" ></eg-grid>
		</eg-grid>
	</body>
</html>
```

## Design Goals
1. Easy enough for beginner web developers to use.
2. Performant enough for professional developers to use.

## Implementation
1. The far majority of layout elements in this grid are done by native CSS. This allows for good performance.
2. A light JS layer is added to simplify and remove extra divs usually needed in grids, like adding a content div to flexbox elements.
3. A Grid debug dev environment library is available to provide for error handling and warnings for common pitfalls. This library isn't needed for production, leaving the production thin and performant.

## Features
* Flexbox Grid.
* Native Web Component (no Polymer needed).
* No Shadow DOM Polyfill needed.