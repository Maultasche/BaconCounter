/**
 * Defines the map that maps action commands to validation functions
 */

import commandTypeNames from '../commands/commandTypeNames';

function createCommandValidationMap(counterValidation) {
	//Maps command types to their corresponding validation functions
	const commandValidationMap = {
		[commandTypeNames.increment]: counterValidation.canIncrementCounter,
		[commandTypeNames.decrement]: counterValidation.canDecrementCounter,
		[commandTypeNames.add]: counterValidation.canAddToCounter,
		[commandTypeNames.subtract]: counterValidation.canSubtractFromCounter		
	};
	
	return commandValidationMap;
}

export default createCommandValidationMap;