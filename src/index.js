"use strict";

const readline = require('readline');
const process = require('process');
import _  from 'lodash';
const Bacon = require('baconjs');

const commandTypeNames = {
	increment: "increment",
	decrement: "decrement",
	add: "add",
	subtract: "subtract"
};

const commandTypes = [
  {
    name: commandTypeNames.increment,
    token: "i",
    args: []
  },
  {
    name: commandTypeNames.decrement,
    token: "d",
    args: []
  },
  {
    name: commandTypeNames.add,
    token: "a",
    args: [ "number" ]
  },
  {
    name: commandTypeNames.subtract,
    token: "s",
    args: [ "number" ]
  }
];

function getCounterLogic(commandTypesNames) {
	const minCounterValue = 0;
	const maxCounterValue = 100;
	
	let counter = 0;
	
	//Enumerates the types of events that can be emitted from 
	//the counter logic in the response stream
	const eventTypes = {
		//The command was executed successfully
		success: "success",
		//The command could not be executed successfully
		error: "error"
	};

	//Enumerates the types of errors that can occur
	const errorTypes = {
		//The command would cause the counter to go under the minimum allowed value
		minCounterValue: "minCounterValue",
		//The command would cause the counter to go over the maximum allowed value
		maxCounterValue: "maxCounterValue",
		//The command was not recognized
		commandNotRecognized: "commandNotRecognized"
	};
	
	//Action functions
	
	//Increments the counter
	const incrementCounter = counterValue => counterValue + 1;
	
	//Decrements the counter
	const decrementCounter = counterValue => counterValue - 1;
	
	//Adds a number to the counter
	const addToCounter = (counterValue, number) => counterValue + number;
		
	//Substracts a number from the counter
	const subtractFromCounter = (counterValue, number) => counterValue - number;
	
	//Validation Functions
	//TODO: Separate validation functions and action functions into separate modules
	
	//Verifies that a value falls within the allowed counter range
	//Returns -1 if the value is below the range, 0 if the value is within
	//the range, and 1 if the value is above the range
	const verifyCounterRange = _.curry(verifyWithinRange)(_, minCounterValue, maxCounterValue);
	
	//Indicates whether the counter value can be incremented
	//Returns -1 if incrementing the value would cause it to be below the range, 
	//0 if incrementing the value leaves it within the range, and 1 if 
	//incrementing the value would cause it to be above the range
	const canIncrementCounter = (counterValue) => 
		verifyCounterRange(incrementCounter(counterValue));
	
	//Indicates whether the counter value can be decremented
	//Returns -1 if decrementing the value would cause it to be below the range, 
	//0 if the decrementing the value leaves it within the range, and 1 if 
	//decrementing the value would cause it to be above the range
	const canDecrementCounter = (counterValue) => 
		verifyCounterRange(decrementCounter(counterValue));
	
	//Indicates whether the counter value can be added to
	//Returns -1 if adding to the value would cause it to be below the range, 
	//0 if adding to the value leaves it within the range, and 1 if 
	//adding to the value would cause it to be above the range
	const canAddToCounter = 
		(counterValue, number) => verifyCounterRange(addToCounter(counterValue));
	
	//Indicates whether the counter value can be subtracted from
	//Returns -1 if subtracting from the value would cause it to be below the range, 
	//0 if subtracting from the value leaves it within the range, and 1 if 
	//subtracting from the value would cause it to be above the range
	const canSubtractFromCounter = 
		(counterValue, number) => verifyCounterRange(subtractFromCounter(counterValue));

	//Creates a result
	const createResult = (eventType, errorType, message) => {
		return { eventType, errorType, message };
	};
	
	//Creates a success validation result
	const createSuccessValidationResult = _.curry(createResult)
		(eventTypes.success, null);

	//Creates an error validation result
	const createErrorValidationResult = _.curry(createResult)
		(eventTypes.error);
		
	//Receives a command stream and returns a response stream
	function processCommands(commandStream) {
		commandStream.map(command => {
		});
	}

    //Validates whether a command can be permitted or not. 
	//Returns an object indicating whether the command is permitted,
	//and if not, a code indicating why not
	function validateCommandPermitted(command, errorTypes) {
		let validationResult;
		
		const validationFunction = commandTypeMap[command.type];
		
		if(validationFunction) {
			let result = validationFunction(counter, command.args);
			
			if(result === 0) {
				validationResult = createSuccessValidationResult();
			}
			else if(result === -1) {
				validationResult = createErrorValidationResult(
					errorTypes.minValue);
			}
			else {
				validationResult = createErrorValidationResult(
					errorTypes.maxValue);
			}
		}
		else {
			validationResult = createErrorValidationResult(
				errorTypes.commandNotRecognized); 
		}
		
		return validationResult;
	}
	
	//Verifies that a value is within an inclusive number range.
	//Returns -1 if the value is below the range, 0 if the value is within
	//the range, and 1 if the value is above the range
	function verifyWithinRange(value, minValue, maxValue) {
		return (value >= minValue) && (value <= maxValue) ? 0 :
			value < minValue ? -1 : 1;
	}

	//Maps command types to their corresponding functions
	const commandTypeMap = {
		[commandTypeNames.increment]: incrementCounter,
		[commandTypeNames.decrement]: decrementCounter,
		[commandTypeNames.add]: addToCounter,
		[commandTypeNames.subtract]: subtractFromCounter
	};

	const commandValidationMap = {
		[commandTypeNames.increment]: canIncrementCounter,
		[commandTypeNames.decrement]: canDecrementCounter,
		[commandTypeNames.add]: canAddToCounter,
		[commandTypeNames.subtract]: canSubtractFromCounter		
	};
	
	//Create the counter logic interface
	const counterLogic = {
		eventTypes,
		errorTypes,
		processCommands
	};

	return counterLogic;
}

//Curry functions that accept command types so that they don't have to
//reference the command types directly
const createCommandFromInput = _.curry(createCommand)(_, commandTypes);
const getCounterLogicWithTypes = _.curry(getCounterLogic(commandTypeNames))

runCli();

function runCli() {
	const lineReader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: '> '
	});

	lineReader.prompt();

	const lineReaderStream = Bacon.fromEvent(lineReader, 'line');
	
	const commandStream = lineReaderStream
		.map(line => createCommandFromInput(line.trim()));
	
	const validCommandStream = commandStream.filter(command => command !== null);
	const invalidCommandStream = commandStream.filter(command => command === null);
	
	validCommandStream.onValue(command => {
		console.log(commandToDisplayString(command));
		lineReader.prompt();
	});
	
	invalidCommandStream.onValue(() => {
		console.log("Invalid command");
		lineReader.prompt();
	});

	Bacon.fromEvent(lineReader, 'close').onValue(() => {
		console.log('Goodbye');
		process.exit(0);
	});  
}

//Transforms the input string to a command object, or if the input
//string does not correspond to a valid command, returns a null.
function createCommand(input, commandTypes) {
  let command = null;
  
  //Parse the input
  let tokens = input.split(" ");
  
  let commandType = commandTypes
    .find(commandType => commandType.token === tokens[0]);

  if(commandType) {
    //If the command was found verify that the arguments are correct
    if(tokens.length - 1 === commandType.args.length &&
		validateCommandArgs(tokens.slice(1), commandType.args)) {
	
      //The command is valid, so create the command object
      command = createCommandFromType(commandType, tokens.slice(1));
    }
  }

  return command;
}

//Validates command arguments to verify that they are of the corresponding type
function validateCommandArgs(commandArgs, commandArgTypes) {
	//Zip the arrays together, attempt to convert the argument string to its corresponding
	//type, and then and verify that the type of the argument matches the correct
	//argument type
	//Then reduce the boolean values down to a single boolean value by doing an &&
	//If one of the matches fail, a false will be returned. Otherwise, a true
	//will be returned
	const valid = _.zip(commandArgs, commandArgTypes)
		.map(([arg, argType]) => [ convertToType(arg, argType), argType])
		.map(([arg, argType]) => {
			return !isNaN(arg) && typeof(arg) === argType;
		})
		.reduce((allArgsMatch, currentArgMatches) => allArgsMatch && currentArgMatches, true);
		
	return valid;
}

//Creates a command object given a command type object and some
//command arguments
function createCommandFromType(commandType, commandArgs) {
  var command = {
    type: commandType.name,
    args: commandArgs ? commandArgs : []
  };
  
  return command;
}

//Transforms a command into a string for display
function commandToDisplayString(command) {
	let displayString = command.type;
	
	if(command.args.length > 0) {
		displayString = displayString + " " + command.args[0];
	}
	
	return displayString;
}

//Converts data to a specified type
function convertToType(data, type) {
	let convertedData = data;
	
	switch(type) {
		case "number":
			convertedData = parseInt(data, 10);
			break;
	}
	
	return convertedData;
}