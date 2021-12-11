/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {
  BarMap, CircMap, LineMap, SquaredMap,
} from 'react-geo-grapher'

import goias from './goias.json'

const App = () => (
  <div style={{ display: 'flex' }}>
    <BarMap
      style={{ width: '700px', background: '#ffffff' }}
      geojson={goias}
      percents={[40, 30, 30]}
      colors={['#0077ff', '#ff7171', '#78ff73']}
    />

    <CircMap
      style={{ width: '200px', background: '#ffffff' }}
      geojson={goias}
      percents={[40, 30, 30]}
      colors={['#0077ff', '#ff7171', '#78ff73']}
      scale={4700}
      spacing={25}
      itemSize={8}
    />

    <SquaredMap
      style={{ width: '200px', background: '#ffffff' }}
      geojson={goias}
      percents={[40, 30, 30]}
      colors={['#0077ff', '#ff7171', '#78ff73']}
      scale={4700}
      spacing={25}
      itemSize={15}
    />

    <LineMap
      style={{ width: '200px', background: '#ffffff' }}
      geojson={goias}
      percents={[40, 30, 30]}
      colors={['#0077ff', '#ff7171', '#78ff73']}
      scale={4700}
      itemSize={110}
      scaleFactor={30}
      strokeWidth="15px"
    />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
