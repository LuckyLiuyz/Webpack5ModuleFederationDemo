import React from "react";
import ReactDOM from "react-dom";

import SayHelloFromA from "application_a/SayHelloFromA";

import App from "./app";

ReactDOM.render(
	<>
		B-123
		<App />
		<SayHelloFromA />
	</>,
	document.getElementById("root")
);
