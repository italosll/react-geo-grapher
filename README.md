<h1 align="center">
  <img width="1920px" src="https://i.ibb.co/1J9g10T/banner-react-geo-grapher.png" alt="react-geo-grapher-banner">
</h1>

`react-geo-grapher` is a library that allows you to display quantitative data across sections of a geographic region.

> You must have a geojson file that matches the desired region and this file must follow a specific structure.  
> <a  href="https://raw.githubusercontent.com/italosll/react-geo-grapher/main/example/src/goias.json" target="_blank">see this example</a>.

## Install

Using npm:

```bash
npm install react-geo-grapher
```

Using yarn:

```bash
yarn add react-geo-grapher
```

For the library to work correctly it is necessary to add the following line to the **`.env`** at the root of the project.

```bash
SKIP_PREFLIGHT_CHECK=true
```

<br/><br/>

## BarMap

<h1 align="center">
<img width="300px"  src="https://i.ibb.co/kXThJrJ/Page-1.png" alt="map">

</h1>
<a href="https://codesandbox.io/s/react-geo-grapher-lnyjq" target="_blank">   
<img
src="https://i.ibb.co/LhGcQms/codesandbox.png" target="_blank" alt="codesandbox" width="150px"
/>
</a>

```JSX

      // import your geojson file
      import goias from "./goias.json"
      import {BarMap} from  'react-geo-grapher'

      ...

      // Set the properties
      <BarMap
        style={{ width: "400px", background: "#ffffff" }}
        geojson={goias}
        limits={[40, 30, 30]}
        colors={['#040DA6', '#10863C', '#920B8E']}
        scale={5500}
      />

```

## Properties

| Parameter           | Type                                      | Definition                                                                                                                        |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| limits              | `Array<number>`                           | Each array index will correspond to a section in the map, the sum of array values ​​must equal 100, all numbers must be integers. |
| colors              | `Array<string>`                           | Each index of the array will match the color of a section on the map.                                                             |
| geojson             | `Feature` or `FeatureCollection` or `any` | Geojson file.                                                                                                                     |
| style               | `CSSProperties` or `undefined`            | Css properties that will be applied to the \</div> around the map.                                                                |
| scale               | `number`                                  | Property from `ComposableMapProps` that scale the geojson on the map.                                                             |
| ComposableMapProps? | `ComposableMapProps`                      | <a href="https://www.react-simple-maps.io/docs/composable-map/" target="_blank">More details here</a>                             |
| ZoomableGroupProps? | `ZoomableGroupProps`                      | <a href="https://www.react-simple-maps.io/docs/zoomable-group/" target="_blank">More details here</a>                             |

<br/><br/>

## LineMap

<h1 align="center">
<img width="300px"  src="https://i.ibb.co/dMDzK0R/Page-4.png" alt="map">
</h1>

<a href="https://codesandbox.io/s/react-geo-grapher-lnyjq" target="_blank">   
<img
src="https://i.ibb.co/LhGcQms/codesandbox.png" target="_blank" alt="codesandbox" width="150px"
/>
</a>

```JSX

      // import your geojson file
      import goias from "./goias.json";
      import {LineMap} from  'react-geo-grapher'
      ...

      // Set the properties
      <LineMap
        style={{ width: "400px", background: "#ffffff" }}
        geojson={goias}
        limits={[40, 30, 30]}
        colors={['#040DA6', '#10863C', '#920B8E']}
        scale={4700}
		scaleFactor={30}
		strokeWidth="15px"
      />

```

## Properties

| Parameter           | Type                                      | Definition                                                                                                                        |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| limits              | `Array<number>`                           | Each array index will correspond to a section in the map, the sum of array values ​​must equal 100, all numbers must be integers. |
| colors              | `Array<string>`                           | Each index of the array will match the color of a section on the map.                                                             |
| geojson             | `Feature` or `FeatureCollection` or `any` | Geojson file.                                                                                                                     |
| style               | `CSSProperties` or `undefined`            | Css properties that will be applied to the \</div> around the map.                                                                |
| scale               | `number`                                  | Property from `ComposableMapProps` that scale the geojson on the map.                                                             |
| scaleFactor         | `number`                                  | `number-1` of lines.                                                                                                              |
| strokeWidth         | `string`                                  | stroke width of line (The larger, the greater the height of each line).                                                           |
| ComposableMapProps? | `ComposableMapProps`                      | <a href="https://www.react-simple-maps.io/docs/composable-map/" target="_blank">More details here</a>                             |
| ZoomableGroupProps? | `ZoomableGroupProps`                      | <a href="https://www.react-simple-maps.io/docs/zoomable-group/" target="_blank">More details here</a>                             |

<br/><br/>

## CircMap

<h1 align="center">
<img width="300px"  src="https://i.ibb.co/D1yXYMD/Page-2.png" alt="map">
</h1>

<a href="https://codesandbox.io/s/react-geo-grapher-lnyjq" target="_blank">   
<img
src="https://i.ibb.co/LhGcQms/codesandbox.png" target="_blank" alt="codesandbox" width="150px"
/>
</a>

```JSX

      // import your geojson file
      import goias from "./goias.json";
      import {CircMap} from  'react-geo-grapher'
      ...

      // Set the properties
      <CircMap
        style={{ width: "400px", background: "#ffffff" }}
        geojson={goias}
        limits={[40, 30, 30]}
        colors={['#040DA6', '#10863C', '#920B8E']}
        scale={4700}
		spacing={25}
		itemSize={8}
      />

```

## Properties

| Parameter           | Type                                      | Definition                                                                                                                        |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| limits              | `Array<number>`                           | Each array index will correspond to a section in the map, the sum of array values ​​must equal 100, all numbers must be integers. |
| colors              | `Array<string>`                           | Each index of the array will match the color of a section on the map.                                                             |
| geojson             | `Feature` or `FeatureCollection` or `any` | Geojson file.                                                                                                                     |
| style               | `CSSProperties` or `undefined`            | Css properties that will be applied to the \</div> around the map.                                                                |
| scale               | `number`                                  | Property from `ComposableMapProps` that scale the geojson on the map.                                                             |
| spacing             | `number`                                  | Space between circles.                                                                                                            |
| itemSize            | `number`                                  | Circles radius.                                                                                                                   |
| ComposableMapProps? | `ComposableMapProps`                      | <a href="https://www.react-simple-maps.io/docs/composable-map/" target="_blank">More details here</a>                             |
| ZoomableGroupProps? | `ZoomableGroupProps`                      | <a href="https://www.react-simple-maps.io/docs/zoomable-group/" target="_blank">More details here</a>                             |

<br/><br/>

## SquaredMap

<h1 align="center">
<img width="300px"  src="https://i.ibb.co/D1yXYMD/Page-2.png" alt="map">
</h1>

<a href="https://codesandbox.io/s/react-geo-grapher-lnyjq" target="_blank">   
<img
src="https://i.ibb.co/LhGcQms/codesandbox.png" target="_blank" alt="codesandbox" width="150px"
/>
</a>

```JSX

      // import your geojson file
      import goias from "./goias.json";
      import {SquaredMap} from  'react-geo-grapher'
      ...

      // Set the properties
      <SquaredMap
        style={{ width: "400px", background: "#ffffff" }}
        geojson={goias}
        limits={[40, 30, 30]}
        colors={['#040DA6', '#10863C', '#920B8E']}
        scale={4700}
		spacing={25}
		itemSize={8}
      />

```

## Properties

| Parameter           | Type                                      | Definition                                                                                                                        |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| limits              | `Array<number>`                           | Each array index will correspond to a section in the map, the sum of array values ​​must equal 100, all numbers must be integers. |
| colors              | `Array<string>`                           | Each index of the array will match the color of a section on the map.                                                             |
| geojson             | `Feature` or `FeatureCollection` or `any` | Geojson file.                                                                                                                     |
| style               | `CSSProperties` or `undefined`            | Css properties that will be applied to the \</div> around the map.                                                                |
| scale               | `number`                                  | Property from `ComposableMapProps` that scale the geojson on the map.                                                             |
| spacing             | `number`                                  | Space between squares.                                                                                                            |
| itemSize            | `number`                                  | Width and height of squares.                                                                                                      |
| ComposableMapProps? | `ComposableMapProps`                      | <a href="https://www.react-simple-maps.io/docs/composable-map/" target="_blank">More details here</a>                             |
| ZoomableGroupProps? | `ZoomableGroupProps`                      | <a href="https://www.react-simple-maps.io/docs/zoomable-group/" target="_blank">More details here</a>                             |

<br/><br/>

### Considerations

- This library uses products from other libraries, such as `react-simple-maps` and `turf`.
- It is not recommended for use in commercial projects as it contains some incompatibility issues with some geojson file structures.
