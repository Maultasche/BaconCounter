/**
 * Defines the map that maps action commands to validation functions
 */

import commandTypeNames from '../commands/commandTypeNames';
import counterValidation from './counterValidation';

//Maps command types to their corresponding validation functions
const commandValidationMap = {
	[commandTypeNames.increment]: counterValidation.canIncrementCounter,
	[commandTypeNames.decrement]: counterValidation.canDecrementCounter,
	[commandTypeNames.add]: counterValidation.canAddToCounter,
	[commandTypeNames.subtract]: counterValidation.canSubtractFromCounter		
};

export default commandValidationMap;