import React, { Component } from "react"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import store from "../models/CanvasStore.js"
import { FixedSizeGrid as Grid } from 'react-window';
 
const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    Item {rowIndex},{columnIndex}
  </div>
);
 
const Example = () => (
  <Grid
    columnCount={1000}
    columnWidth={100}
    height={150}
    rowCount={1000}
    rowHeight={35}
    width={300}
  >
    {Cell}
  </Grid>
)