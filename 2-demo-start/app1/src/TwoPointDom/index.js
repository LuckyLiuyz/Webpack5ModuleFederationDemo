import "./index.less";
import * as Events from "./events";
import React, {Component} from "react";

export default class TwoPointDom extends Component {
	static defaultProps = {
		LeftDom: () => {},
		RightDom: () => {},
		PopWidth: 248, // 正常展示时的宽度/高度
		Position: "left", // 标识当前组件类型：left-左右结构，往左侧缩；right-左右结构，往右侧缩；默认-上下结构，往上缩
		extrWidth: 0,
	};
	constructor(props) {
		super(props);
		this.state = {
			isShow: true,
			isShowRightTop: true, // 因为报表数据中心首先是左右结构；其次右侧又分上下结构；所有需要增加此状态进行不同的控制
		};
		for (let key in Events) {
			this[key] = Events[key].bind(this);
		}
	}
	render() {
		let {PopWidth, LeftDom, RightDom} = this.props;
		let newW = this.state.isShow ? PopWidth : 0;
		let popWidthStyle = {
			width: `${newW}px`,
			flex: `0 0 ${newW}px`,
			maxWidth: "45%",
		};
		let isShowStyle = {
			display: this.state.isShow ? "block" : "none",
		};

		let leftIconfont = `button iconfontnew ${
			this.state.isShow ? "iconzuo" : "iconyou"
		}`;

		return (
			<div
				className='twoPointDom_left_container'
				onMouseUp={this.mouseUp}
				onMouseMove={this.mouseMove}>
				<div className='twoPointDom_left_popMenu' style={popWidthStyle}>
					<div className='popMenu_content' style={isShowStyle}>
						{LeftDom instanceof Function ? LeftDom() : LeftDom}
					</div>
					<div
						className={leftIconfont}
						onClick={this.clickArrow}
						onMouseDown={this.mouseDown}
						onMouseUp={this.mouseUp}
						onMouseMove={this.mouseMove}></div>
					{/*分割线*/}
					<div
						className={"divider-line"}
						title={"divider"}
						onMouseDown={this.mouseDown}
						onMouseUp={this.mouseUp}
						onMouseMove={this.mouseMove}>
						<div className={"divider-border"}></div>
					</div>
				</div>
				<div className='twoPointDom_left_wraper' style={{minWidth: "55%"}}>
					{RightDom instanceof Function ? RightDom() : RightDom}
				</div>
			</div>
		);
	}
}
