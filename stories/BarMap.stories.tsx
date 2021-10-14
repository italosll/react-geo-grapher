import React from 'react';

import { Story } from '@storybook/react';
import { BarMap, BarMapProps } from '../src/Maps/BarMap';
import goias from './mock/goias.json';

const colors = [
  '#FE0022',
  '#FF6A6A',
  '#FF9537',
  '#FFD500',
  '#C84F32',
  '#FF5500',
];

export default {
  title: 'src/Maps/BarMap',
  component: BarMap,
  args: {
    style: { width: '450px', height: '450px', background: '#3c97ff' },
    limits: [30, 40, 30],
    geojson: goias,
    colors,
  },

};

export const Goias:Story<BarMapProps> = (args) => <BarMap {...args} />;
