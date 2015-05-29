# Structure Layout
A lightweight grid web component build around of viewports and fluid grids. No dependencies.

## Usage

```html
<html
<head>
    <script src="//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.2/webcomponents-lite.min.js"></script>
</head>
<body structure-solid>
    <structure-solid fixed top="0" left="0" width="100" height="7" >
    	This remains to the viewport
    </structure-solid>
    <structure-solid fixed top="7" left="0" width="20" height="93">
          <structure-fluid small="4" >
            This is fluid
          </structure-fluid>
          <structure-fluid small="4" >
            So is this is fluid
          </structure-fluid>
          <structure-fluid small="4" >
            Me too.
          </structure-fluid>
    </structure-solid>
    <structure-solid width="80" height="100" class="Skin">
        <structure-solid height="50">
        </structure-solid>
        <structure-solid>
        </structure-solid>
    </structure-solid>
</html>
```

## Designed for those who Value

	1. Modularity
	2. Ease of use
	3. Performance

## Design Implementation

	* Only defines structural CSS, not skin CSS, naturally enforcing OOCSS (Object Oriented CSS).
		# Modularity
	* No major dependencies needed. 
		# Modularity 
	* A grid debug dev environment library is available to provide for error handling and warnings for common pitfalls. This library isn't needed for distribution, leaving the production code thin and only doing non intensive calculations.
		# Modularity
		# Ease of use
	* A light JS layer is added to simplify and remove extra divs usually needed in grids, like adding a content div to flexbox elements.
		# Ease of use
	* The far majority of layout elements in this grid are done by native CSS. 
		# Performance
	* Use evergreen browser specifications.
		# Performance
		# Ease of use

## Packages

	* Native Web Component (Custom Elements + HTML Imports)
		* No Shadow DOM 
			# Performance
