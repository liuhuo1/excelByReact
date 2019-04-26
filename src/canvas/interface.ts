export interface PointData {
	x: number,
	y: number
}

export interface HTMLCanvasElement {
	getContext(contextId: '2d'): CanvasRenderingContext2D;
}

export interface LineStyle {
	color?: string;
}

export interface TextStyle {
	color?: string;
}
