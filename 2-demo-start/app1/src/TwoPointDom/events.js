/**
 * @method 鼠标按下事件
 */
export function mouseDown(e) {
	this.flag = true;
	this.clickFlag = false;
	this.oldTime = Date.now();
	this.startPosition = e.clientX;
	// this.leftPadding = document.getElementsByTagName('body')[0].firstElementChild.offsetLeft;
	this.leftPadding = e.target.parentElement.parentElement.offsetLeft;
}

/**
 * @method 鼠标移动事件
 */
export function mouseMove(e) {
	if (this.state.isShow) {
		this.newTime = Date.now();
		if (this.newTime - this.oldTime >= 30 && this.flag) {
			let nextWidth = e.clientX - this.leftPadding - this.props.extrWidth;
			this.refs.leftDom.style.width = nextWidth + 'px';
			this.refs.rightDom.style.width = `calc(100% - ${nextWidth}px)`;
			this.refs.leftDom.style.flex = '0 0 ' + nextWidth + 'px';
			this.oldTime = this.newTime;
		}
	}
}

/**
 * @method 鼠标抬起事件
 */
export function mouseUp(e) {
	this.endPosition = e.clientX;
	if (this.startPosition == this.endPosition) {
		this.clickFlag = true;
	}
	// 当 isAutoExcuteOnAfter==false时，不自动执行 必须是触发了拖拽才回调 this.flag
	if (this.flag && this.props.isAutoExcuteOnAfter && this.props.onAfter && this.props.onAfter instanceof Function) {
		this.props.onAfter();
	}
	this.flag = false;
	this.oldTime = null;
	this.newTime = null;
	this.startPosition = null;
	this.endPosition = null;
	this.leftPadding = null;
}

/**
 * @method 箭头点击事件
 */
export function clickArrow() {
	if (this.clickFlag) {
		this.setState(
			{
				isShow: !this.state.isShow,
			},
			() => {
				if (this.props.onAfter && this.props.onAfter instanceof Function) {
					this.props.onAfter();
				}
			}
		);
	}
}

/**
 * @method 上下结构箭头点击事件
 */
export function clickTopArrow() {
	this.setState(
		{
			isShowRightTop: !this.state.isShowRightTop,
		},
		() => {
			if (this.props.onAfter && this.props.onAfter instanceof Function) {
				this.props.onAfter(this.state.isShowRightTop);
			}
		}
	);
}
