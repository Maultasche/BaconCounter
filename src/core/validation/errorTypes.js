/**
 * Enumerates the types of errors that can occur
 */
const errorTypes = {
	//The command would cause the counter to go under the minimum allowed value
	minCounterValue: "minCounterValue",
	//The command would cause the counter to go over the maximum allowed value
	maxCounterValue: "maxCounterValue",
	//The command was not recognized
	commandNotRecognized: "commandNotRecognized"
};

export default errorTypes;