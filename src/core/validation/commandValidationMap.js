/**
 * Defines the map that maps action commands to validation functions
 */

import R from 'ramda';
import commandTypeNames from '../commands/commandTypeNames';

function createCommandValidationMap(counterValidation) {
	//Maps command types to their corresponding validation functions
	const commandValidationMap = {
		[commandTypeNames.increment]: counterValidation.canIncrementCounter,
		[commandTypeNames.decrement]: counterValidation.canDecrementCounter,
		[commandTypeNames.add]: R.pipe(R.prop("number"), counterValidation.canAddToCounter),
		[commandTypeNames.subtract]: R.pipe(R.prop("number"), 
			counterValidation.canSubtractFromCounter)
	};
	
	return commandValidationMap;
}

export default createCommandValidationMap;