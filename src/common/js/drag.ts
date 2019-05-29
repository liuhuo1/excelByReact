import { getTop, getStyle, getLeft, getPos, getDomSize, getDom } from '@src/common/js/dom';
window.addEventListener('load', function () {
	document.addEventListener('mousemove', handleDrag);
	document.addEventListener('mouseup', handleLeave, false);
});


/**
 * 元素可拖动指令
 * 参数
 * target            需要移动的元素若没有则默认为移动拖动的元素
 * wrap              移动元素的最大可移动范围默认为body元素
 **/
let movedDom;
let dragedDom;
let startPos;
let cacheStyle;
let defaultStyle = {
	'user-select': 'none',
	'cursor': 'move'
};
const handleMousedown = function (e, data) {
	if (movedDom) {
		handleLeave();
	}
	cacheStyle = {};
	Object.keys(defaultStyle).forEach((key) => {
		cacheStyle[key] = getStyle(e.target, key);
		e.target.style[key] = defaultStyle[key];
	});
	let target = getDom(data && data.target) || e.target;

	let mouse = {
		x: e.pageX,
		y: e.pageY
	};
	let start = getPos(target);
	let wrap = getDom(data && data.wrap) || document.body;
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
	console.log(startPos);
	movedDom = target;
	dragedDom = e.target;
};
const handleLeave = function () {
	if (!movedDom) {
		return;
	}
	Object.keys(cacheStyle).forEach((key) => {
		dragedDom.style[key] = cacheStyle[key];
	});
	movedDom = null;
	startPos = null;
	cacheStyle = null;
	dragedDom = null;
};
const handleDrag = function (e) {
	if (!movedDom) {
		return;
	}
	let bound = startPos.bound;
	let left = e.pageX + startPos.x;
	let top = e.pageY + startPos.y;
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
};



export default function (target: HTMLElement, parent: HTMLElement) {
	const start = function (e: HTMLElement) {
		handleMousedown(e, data);
	};
	const end = function (e: HTMLElement) {
		handleLeave(e, data);
	};
	if (el._simpleDrag) {
		el.removeEventListener('mousedown', el._dragFn.start);
		// el.removeEventListener('mouseup', el._dragFn.end);
		// el.removeEventListener('mouseleave', el._dragFn.end);
	}
	el.addEventListener('mousedown', start, false);
	// el.addEventListener('mouseup', end, false);
	// el.addEventListener('mouseleave', end, false);
	el._dragFn = {
		start,
		end
	};
	el._simpleDrag = true;
}
