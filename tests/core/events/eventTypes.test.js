/**
 * Event Type Tests
 */

import R from 'ramda';
import eventTypes from '../../../src/core/events/eventTypes';
 
/**
 * Tests the event types to ensure that the necessary event types are available
 */
describe("verifying event types", () => {
	test("there are at least three event types", () => {
		expect(R.keys(eventTypes).length).toBeGreaterThanOrEqual(3);
	});

	test("there is a command success event type", () => {
		expect(eventTypes.commandSuccess).not.toBe(undefined);
	});
	
	test("there is a counter update event type", () => {
		expect(eventTypes.counterUpdate).not.toBe(undefined);
	});
	
	test("there is a validation error event type", () => {
		expect(eventTypes.validationError).not.toBe(undefined);
	});
});