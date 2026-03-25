import React from "react";
import Header from "@/widgets/app-header/ui/Header";


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
