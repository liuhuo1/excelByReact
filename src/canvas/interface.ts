export interface PointData {
	x: number,
	y: number
}

export interface HTMLCanvasElement {
	getContext(contextId: '2d'): CanvasRenderingContext2D;
	width: number;
	height: number;
}

export interface LineStyle {
	color?: string;
}

export interface TextStyle {
	// color?: string;
	// textBaseline?: string;
	// textAlign?: string;
	// font?: string;
	[key: string]: string;
}
