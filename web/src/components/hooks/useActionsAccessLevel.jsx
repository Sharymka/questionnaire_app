import React, {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsAccessLevel = (props) => {

	const { setShowUsers } = props;

	const { setAccessLevel, setSelectedUsers } = useContext(TemplateContext);

	const handleAccessLevel = (value) => {
		setAccessLevel(value);
		if(value === 'public'){
			setShowUsers(false);
			setSelectedUsers([]);
		}else {
			setShowUsers(true);
		}
	}
	return {
		handleAccessLevel,
	}


}
export default useActionsAccessLevel;