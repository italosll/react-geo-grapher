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

export type BarMapProps= {
  limits: any[],
  colors: any[],
  geojson: Feature | FeatureCollection |any
  style: CSSProperties | undefined
  ComposableMapProps?: ComposableMapProps
  ZoomableGroupProps?: ZoomableGroupProps
}

export const BarMap = ({
  limits,
  colors,
  geojson,
  style,
  ComposableMapProps: ComposableProps,
  ZoomableGroupProps: ZoomableProps,
}:BarMapProps) => {
  const [cliped, setCliped] = useState<any>()

  useEffect(() => { if (!!limits && !!geojson) setCliped(plotSections(geojson, limits)) }, [limits])

  return (
    <>
      <div style={style}>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 4500, rotate: [49.5, 16, 0] }}
          style={{ height: '100%', width: '100%' }}
          {...ComposableProps}
        >
          <ZoomableGroup zoom={1} {...ZoomableProps}>
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
