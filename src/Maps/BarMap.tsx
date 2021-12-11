import {
  ComposableMap,
  ComposableMapProps,
  Geographies,
  Geography,
  ZoomableGroup,
  ZoomableGroupProps,
} from 'react-simple-maps'

import React, { CSSProperties, useEffect, useState } from 'react'
import { Feature, FeatureCollection } from '@turf/turf'
import { plotSections } from '../Core/index'

export type BarMapProps = {
  percents: any[];
  colors: any[];
  geojson: Feature | FeatureCollection | any;
  style: CSSProperties | undefined;
  scale?: number;
  rotate?: [number, number, number];
  ComposableMapProps?: ComposableMapProps;
  ZoomableGroupProps?: ZoomableGroupProps;
};

export const BarMap = ({
  percents,
  colors,
  geojson,
  style,
  scale,
  rotate,
  ComposableMapProps,
  ZoomableGroupProps,
}: BarMapProps) => {
  const [cliped, setCliped] = useState<any>()

  useEffect(() => {
    if (!!percents && !!geojson) setCliped(plotSections(geojson, percents))
  }, [percents])

  return (
    <>
      <div style={style}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: scale || 4500,
            rotate: rotate || [49.5, 16, 0],
          }}
          style={{ height: '100%', width: '100%' }}
          {...ComposableMapProps}
        >
          <ZoomableGroup zoom={1} {...ZoomableGroupProps}>
            <Geographies geography={cliped}>
              {({ geographies }) => geographies.map((geo, index) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={!!colors && colors[index]}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  )
}
