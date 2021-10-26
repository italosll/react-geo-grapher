/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BarMap, BarMapProps } from 'react-geo-grapher'

import goias from './goias.json'

const App = () => (

  <BarMap
    style={{ width: '1200px', background: '#ffffff' }}
    geojson={goias}
    limits={[40, 30, 30]}
    colors={['#0077ff', '#ff7171', '#78ff73']}
  />
)

ReactDOM.render(<App />, document.getElementById('root'))
