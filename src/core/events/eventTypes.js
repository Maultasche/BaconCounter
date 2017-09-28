/**
 * Enumerates the types of events that can be emitted from
 * the counter logic in the response stream
 */

const eventTypes = {
	commandSuccess: "commandSuccess",
	counterUpdate: "counterUpdate",
	validationError: "validationError",
};

export default eventTypes;