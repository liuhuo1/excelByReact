import { getTop, getStyle, getLeft, getPos, getDomSize, getDom } from '@src/common/js/dom';

window.addEventListener('load', function () {
	document.addEventListener('mousemove', handleDrag);
	document.addEventListener('mouseup', handleLeave, false);
});

const defaultStyle: any = {
	'user-select': 'none',
	'cursor': 'move'
};

interface StartPosInter {
	x: number;
	y: number;
	bound: any
}

interface DragHTMLElement extends HTMLElement {
	_simpleDrag: boolean;
	_dragFn: any;
}
/**
 * 元素可拖动指令
 * 参数
 * target            需要移动的元素若没有则默认为移动拖动的元素
 * wrap              移动元素的最大可移动范围默认为body元素
 **/
let movedDom: HTMLElement | null;
let dragedDom: HTMLElement | null;
let startPos: StartPosInter | null;
let cacheStyle: any | null;
let moveingCb: Function | null | undefined;

const handleMousedown = function (e: MouseEvent, wrapper?: HTMLElement, moveWrapper?: HTMLElement) {
	if (movedDom) {
		handleLeave();
	}
	cacheStyle = {};
	let moveTarget = e.target as HTMLElement;

	Object.keys(defaultStyle).forEach((key: string) => {
		cacheStyle[key] = getStyle(moveTarget, key);
		moveTarget.style[key] = defaultStyle[key];
	});

	let target = getDom(moveWrapper) || moveTarget;

	let mouse = {
		x: e.pageX,
		y: e.pageY
	};
	let start = getPos(target);
	let wrap = getDom(wrapper) || document.body;
	let wrapSize = getDomSize(wrap);
	let domSize = getDomSize(target);
	let bound = {
		minx: start.x - (getLeft(target) - getLeft(wrap)),
		maxx: start.x + (getLeft(wrap) + wrapSize.width) - (getLeft(target) + domSize.width),
		miny: start.y - (getTop(target) - getTop(wrap)),
		maxy: start.y + (getTop(wrap) + wrapSize.height) - (getTop(target) + domSize.height)
	};
	startPos = {
		x: start.x - mouse.x,
		y: start.y - mouse.y,
		bound
	};
	movedDom = target;
	dragedDom = moveTarget;
};

const handleLeave = function () {
	if (!movedDom) {
		return;
	}

	Object.keys(cacheStyle).forEach((key) => {
		dragedDom!.style[key] = cacheStyle[key];
	});

	movedDom = null;
	startPos = null;
	cacheStyle = null;
	dragedDom = null;
};
const handleDrag = function (e: MouseEvent) {
	if (!movedDom) {
		return;
	}
	let bound = startPos!.bound;
	let left = e.pageX + startPos!.x;
	let top = e.pageY + startPos!.y;
	if (bound.minx > left) {
		left = bound.minx;
	}
	if (bound.maxx < left) {
		left = bound.maxx;
	}
	if (bound.miny > top) {
		top = bound.miny;
	}
	if (bound.maxy < top) {
		top = bound.maxy;
	}
	movedDom.style.left = `${left}px`;
	movedDom.style.top = `${top}px`;
	if (moveingCb) {
		moveingCb({
			top, left
		});
	}
};


/**
 * 设置元素可以拖拽
 * @param {DragHTMLElement} target 触发拖动的元素
 * @param {HTMLElement} wrapper 允许拖动的范围
 * @param {HTMLElement} moveTarget 拖动时实际需要移动的元素,没有则移动target
 * @param {Function} cb 移动过程中的回调
 * @return {void}
 * */
export default function (target: DragHTMLElement, wrapper?: HTMLElement, moveTarget?: HTMLElement, cb?: Function): void {
	const start = function (e: MouseEvent) {
		handleMousedown(e, wrapper, moveTarget);
	};
	moveingCb = null;
	if (target._simpleDrag) {
		target.removeEventListener('mousedown', target._dragFn.start);
	}
	target.addEventListener('mousedown', start, false);
	target._dragFn = {
		start
	};
	target._simpleDrag = true;
	moveingCb = cb;
}
