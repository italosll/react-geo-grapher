<h1 align="center">
  <img width="450px" src="https://i.ibb.co/w0Tm4yh/react-geo-grapher-banner.png" alt="react-geo-grapher-banner">
</h1>

`react-geo-grapher` is a library that allows you to display quantitative data across sections of a geographic region.

> You must have a geojson file that matches the desired region and this file must follow a specific structure.  
> <a  href="https://raw.githubusercontent.com/italosll/react-geo-grapher/main/example/src/goias.json" target="_blank">see this example</a>.

<a href="https://codesandbox.io/s/react-geo-grapher-lnyjq" target="_blank">
<img
src="https://i.ibb.co/LhGcQms/codesandbox.png" alt="codesandbox" width="150px"
/>
</a>   

## Install

Using npm:

```bash
npm install react-geo-grapher
```

Using yarn:

```bash
npm add react-geo-grapher
```

For the library to work correctly it is necessary to add the following line to the **`.env`** at the root of the project.

```bash
SKIP_PREFLIGHT_CHECK=true
```

## Example

<h1 align="center">
<img width="300px"  src="https://i.ibb.co/MDwwdBX/map.png" alt="map">
</h1>

```JSX
      // import your geojson file
      import goias from "./goias.json";

      ...

      // Set the properties
      <BarMap
        style={{ width: "400px", background: "#ffffff" }}
        geojson={goias}
        limits={[40, 30, 30]}
        colors={["#0077ff", "#ff7171", "#78ff73"]}
      />
```

## Properties

| Parameter           | Type                                      | Definition                                                                                                                        |
| ------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| limits              | `Array<number>`                           | Each array index will correspond to a section in the map, the sum of array values ​​must equal 100, all numbers must be integers. |
| colors              | `Array<string>`                           | Each index of the array will match the color of a section on the map.                                                             |
| geojson             | `Feature` or `FeatureCollection` or `any` | Geojson file.                                                                                                                     |
| style               | `CSSProperties` or `undefined`            | css properties that will be applied to the \</div> around the map.                                                                |
| ComposableMapProps? | `ComposableMapProps`                      | <a href="https://www.react-simple-maps.io/docs/composable-map/" target="_blank">more details here</a>                             |
| ZoomableGroupProps? | `ZoomableGroupProps`                      | <a href="https://www.react-simple-maps.io/docs/zoomable-group/" target="_blank">more details here</a>                             |

### Considerations

- This library uses products from other libraries, such as `react-simple-maps` and `turf`.
- It is not recommended for use in commercial projects as it contains some incompatibility issues with some geojson file structures.
