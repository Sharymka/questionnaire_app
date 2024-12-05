import React from "react";
import Header from "../mainPage/Header";


const LayoutWithHeader = ({ children }) => {
	return (
		<>
			<Header/>
			<div className="appBackground">
				{children}
			</div>
		</>
	);
};

export default LayoutWithHeader;
