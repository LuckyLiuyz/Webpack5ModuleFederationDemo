import React, {useState} from "react";

export default function Modal() {
	let [show, setShow] = useState(false);
	return (
		<div>
			<h1>我是 Modal</h1>
			<span onClick={() => setShow(true)}>button</span>
			{show ? (
				<div
					className='modal'
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						width: "1200px",
						height: "1200px",
						border: "1px solid red",
						background: "#fafafa",
					}}>
					<span onClick={() => setShow(false)}>close</span>
				</div>
			) : null}
		</div>
	);
}
