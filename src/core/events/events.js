/**
 * Event-related functionality
 */

import R from 'ramda';

/**
 * Creates an event object
 *
 * @param {string} eventType - The type of event being created
 * @param {} data - The data associated with the event
 * @returns {Object} An event object
 */
const createEvent = R.curry((eventType, data) => ({type: eventType, data}));

const events = {
	createEvent
};

export default events;