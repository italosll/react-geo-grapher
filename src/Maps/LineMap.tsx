/* eslint-disable react/no-array-index-key */
import {
  ComposableMap,
  ComposableMapProps,
  Geographies,
  Geography,
  Line,
  ZoomableGroup,
  ZoomableGroupProps,
} from 'react-simple-maps'

import React, { CSSProperties } from 'react'
import { Feature, FeatureCollection, polygon } from '@turf/turf'

import {
  plotSections,
  getBbox,
  getLimits,
  getLinesOnAxisXY,
  getGridPointsPerLines,
  getAllLines,
  getAllLineStrings,
  colorInRange,
} from '../Core/index'

export type LineMapProps = {
  percents: any[];
  colors: any[];
  scale?: number;
  itemSize?: number;
  rotate?: [number, number, number];
  rectSize?: number;
  style: CSSProperties | undefined;
  geojson: Feature | FeatureCollection | any;
  strokeWidth?: string;
  scaleFactor?: number;
  ComposableMapProps?: ComposableMapProps;
  ZoomableGroupProps?: ZoomableGroupProps;
};

export const LineMap = ({
  percents,
  colors,
  geojson,
  style,
  scale,
  rotate,
  ComposableMapProps,
  ZoomableGroupProps,
  strokeWidth,
  scaleFactor,
}: LineMapProps) => {
  const stroke = strokeWidth || '20px'

  const bbox = getBbox(geojson.features)
  const polyMap = polygon([geojson.features[0].geometry.coordinates[0]])
  const linesOnAxisXY = getLinesOnAxisXY(scaleFactor || 25, bbox)
  const linesOnAxisX = linesOnAxisXY[0]
  const linesOnAxisY = linesOnAxisXY[1]

  const gridPointsPerLines = getGridPointsPerLines(
    scaleFactor,
    linesOnAxisX,
    linesOnAxisY,
  )
  const lines = getAllLines(gridPointsPerLines, polyMap)
  const lineStrings = getAllLineStrings(lines)
  const cliped = plotSections(geojson, percents)
  const limits = getLimits(cliped)

  const getItemColor = (lines: any): string | undefined => {
    for (let l = 0; l < limits.length; l++) {
      if (
        colorInRange(
          lines.geometry.coordinates[0][1],
          limits[l][0],
          limits[l][1],
        )
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
            <Geographies fill="transparent" strokeWidth={0.5}>
              {({ geographies }) => geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))}
            </Geographies>
            {lineStrings.map((line: any) => (
              <Line
                from={[
                  line?.geometry?.coordinates[0][0],
                  line?.geometry?.coordinates[0][1],
                ]}
                to={[
                  line?.geometry?.coordinates[1][0],
                  line?.geometry?.coordinates[1][1],
                ]}
                stroke={getItemColor(line)}
                strokeWidth={stroke}
                strokeLinecap="round"
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  )
}

export default Map
