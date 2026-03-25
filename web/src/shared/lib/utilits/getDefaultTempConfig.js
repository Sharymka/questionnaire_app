
export function getDefaultTempConfig(context) {
	switch (context) {
		case "addTemplate":
			return {
				header: 'edit',
				sidePanel: { mainBlock: true, exit: false },
			}
		case "templatesTable":
			return {}
		case "templateEditor":
			return {
				header: 'edit',
				sidePanel: { mainBlock: true, exit: true },
			}
		case "filledFormsTable":
			return {
				header: 'readOnly',
				sidePanel: { mainBlock: false, exit: true },
			}
		case "form":
			return {
				header: 'readOnly',
				sidePanel: { mainBlock: false, exit: true },
			}
		case "filledForm":
			return {
				header: 'readOnly',
				sidePanel: { mainBlock: false, exit: true },
			}
		default:
			return {
				header: 'readOnly',
				sidePanel: { mainBlock: false, exit: false },
			}
	}
}