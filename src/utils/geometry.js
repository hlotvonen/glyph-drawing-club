export const getBoundingRectangle = (point1, point2) => {
	const start_x = Math.min(point1[1], point2[1])
	const end_x = Math.max(point1[1], point2[1])

	const start_y = Math.min(point1[0], point2[0])
	const end_y = Math.max(point1[0], point2[0])

	return [[start_y, start_x], [end_y, end_x]]
}
