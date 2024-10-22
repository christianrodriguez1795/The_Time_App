import React from 'react';
import { GoArrowUp, GoArrowDown, GoArrowLeft, GoArrowRight, GoArrowUpRight, GoArrowDownRight, GoArrowDownLeft, GoArrowUpLeft } from 'react-icons/go';

const directionIcons = {
  N: <GoArrowUp />,
  NE: <GoArrowUpRight />,
  E: <GoArrowRight />,
  SE: <GoArrowDownRight />,
  S: <GoArrowDown />,
  SW: <GoArrowDownLeft />,
  W: <GoArrowLeft />,
  NW: <GoArrowUpLeft />,
  SO: <GoArrowDownLeft />,
  O: <GoArrowLeft />,
};

const WindDirection = ({ direction }) => directionIcons[direction] || <GoArrowUp />;

export default WindDirection;
