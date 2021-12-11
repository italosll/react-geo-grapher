/* eslint-disable react/no-array-index-key */
import {
  ComposableMap,
  ComposableMapProps,
  Marker,
  ZoomableGroup,
  ZoomableGroupProps,
} from 'react-simple-maps'

import React, { CSSProperties } from 'react'
import { Feature, FeatureCollection } from '@turf/turf'

import {
  getBbox,
  getLimits,
  plotSections,
  plotGrid,
  getCenters,
  colorInRange,
} from '../Core/index'

export type SquaredMapProps = {
  percents: any[];
  colors: any[];
  scale?: number;
  spacing?: number;
  rotate?: [number, number, number];
  itemSize?: number;
  style: CSSProperties | undefined;
  geojson: Feature | FeatureCollection | any;
  ComposableMapProps?: ComposableMapProps;
  ZoomableGroupProps?: ZoomableGroupProps;
};

export const SquaredMap = ({
  percents,
  colors,
  geojson,
  style,
  scale,
  rotate,
  spacing,
  itemSize,
  ComposableMapProps,
  ZoomableGroupProps,
}: SquaredMapProps) => {
  const gridSpacing = spacing || 20 // km^2
  const bbox = getBbox(geojson.features) // bbox original shape
  const grid = plotGrid(bbox, gridSpacing, geojson)
  const centers = getCenters(grid.features)
  const cliped = plotSections(geojson, percents)
  const limits = getLimits(cliped)

  const getItemColor = (circ: any): string | undefined => {
    for (let l = 0; l < limits.length; l++) {
      if (
        colorInRange(circ.geometry.coordinates[1], limits[l][0], limits[l][1])
      ) {
        return colors[l]
      }
    }
    return undefined
  }

  return (
    <>
      <div style={style}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: scale || 5500,
            rotate: rotate || [49.5, 16, 0],
          }}
          {...ComposableMapProps}
        >
          <ZoomableGroup zoom={1} {...ZoomableGroupProps}>
            {centers?.map((circ: any, index) => (
              <Marker key={index} coordinates={circ.geometry.coordinates}>
                <rect
                  width={itemSize || 13}
                  height={itemSize || 13}
                  fill={getItemColor(circ)}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  )
}

export default Map
