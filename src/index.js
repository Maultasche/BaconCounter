"use strict";

const readline = require('readline');
const process = require('process');
import _  from 'lodash';
const Bacon = require('baconjs');





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