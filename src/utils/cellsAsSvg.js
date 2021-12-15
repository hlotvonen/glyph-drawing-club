import store from "../models/CanvasStore"
import React, { Component } from "react"
import { rawSvgCell } from "../components/canvas/Cell"
import { rawSvgCellBg } from "../components/canvas/CellBg"

export const cellsAsSvg = () => (
	<>	
		{store.canvas.map((row, y) => (
			<g key={"bg"+y} transform={`translate(0 ${y * store.cellHeight})`}>
				{row.map((cell, x) => (
					<g key={"bg"+x} transform={`translate(${(x * store.cellWidth)})`}>
						{rawSvgCellBg({
							bgColor: cell[4],
						})}
					</g>
				))}
			</g>
		))}
		<g transform={`translate(${((store.canvasWidth - 1) / 2) * store.cellWidth * -1} 0)`}>
			{store.canvas.map((row, y) => (
				<g key={y} transform={`translate(0 ${y * store.cellHeight})`}>
					{row.map((cell, x) => (
						<g key={x} transform={`translate(${(x * store.cellWidth)})`}>
							{rawSvgCell({
								layer1: cell[0],
								layer2: cell[1],
								layer3: cell[2],
								layer4: cell[3]
							})}
						</g>
					))}
				</g>
			))}
		</g>
	</>
)