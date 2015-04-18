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

## Designed for those who Value

	1. Modularity
	2. Ease of use
	3. Performance

## Design Implementation

	* Enforces OOCSS (Object Oriented CSS). Only dictates structure, not skin.
		-> Modularity
	* No major dependencies needed. 
		-> Modularity 
	* A grid debug dev environment library is available to provide for error handling and warnings for common pitfalls. This library isn't needed for distribution, leaving the production code thin and only doing non intensive calculations.
		-> Modularity
		-> Ease of use
	* A light JS layer is added to simplify and remove extra divs usually needed in grids, like adding a content div to flexbox elements.
		-> Ease of use
	* The far majority of layout elements in this grid are done by native CSS. 
		-> Performance
	* Use evergreen browser specifications.
		-> Performance
		-> Ease of use

## Packages

	* Native Web Component 
		* No Polymer + or ShadowDOM polyfill needed.
			-> Performance
