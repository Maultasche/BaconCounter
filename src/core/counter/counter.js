/**
 * Contains the core logic to interact with the counter
 */

import commandActionMap from './commandActionMap';
 
//The minimum-allowed counter value
const minCounterValue = 0;

//The maximum-allowed counter value
const maxCounterValue = 100;
	
//The current counter value
let counter = 0;
	
//Receives a command stream and returns a response stream
function processCommands(commandStream) {
	commandStream.map(command => {
		
	});

	//Transform the commands into validation results.
	//Filter out the success results and transformed the failed results
	//into validation events.
	//Filter out the failure results and transform the sucess results
	//into a stream of successful commands (the command objects, not the
	//validation objects)
	//Map the command stream into action events and current counter value
	//events, running the commands along the way (onValue for running
	//commands?)
	//Merge the action/counter value events with the failed validation
	//events and return them as the response stream
}

//Create the counter logic interface
const counterLogic = {
	minCounterValue,
	maxCounterValue,
	processCommands
};

export default counterLogic;