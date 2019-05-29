
export const getStyle = function (el: HTMLElement, type: any) {
	return window.getComputedStyle(el)[type];
};
//获取元素的纵坐标（相对于窗口）
export const getTop = function (e: HTMLElement) {
	let offset = e.offsetTop;
	if (e.offsetParent != null) offset += getTop(e.offsetParent as HTMLElement);
	return offset;
};
//获取元素的横坐标（相对于窗口）
export const getLeft = function (e: HTMLElement) {
	let offset = e.offsetLeft;
	if (e.offsetParent != null) {
		offset += getLeft(e.offsetParent as HTMLElement);
	}
	return offset;
};

export const getPos = function (el: HTMLElement) {
	return {
		x: parseInt(getStyle(el, 'left')),
		y: parseInt(getStyle(el, 'top'))
	};
};

// 获取dom宽高
export const getDomSize = function (dom: HTMLElement) {
	return {
		width: dom.clientWidth,
		height: dom.clientHeight
	};
};

export const getDom = function (data: HTMLElement | string) {
	if (typeof data === 'string') {
		return document.querySelector(data);
	}
	return data;
};
