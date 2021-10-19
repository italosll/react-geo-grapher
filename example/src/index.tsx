/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BarMap, BarMapProps } from 'react-geo-grapher'

import goias from './goias.json'

const App = () => (

  <BarMap style={{ background: '#345' }} geojson={goias} limits={[25, 20, 55]} colors={['#0f0', '#f00', '#000']} />
)

ReactDOM.render(<App />, document.getElementById('root'))
