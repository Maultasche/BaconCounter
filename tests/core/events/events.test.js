/**
 * Event Functionality Tests
 */

import R from 'ramda';
import events from '../../../src/core/events/events';

/**
 * Tests the event types to ensure that the necessary event types are available
 */
describe("creating an event", () => {
	test("can create an event with data", () => {
		const testEventType = "Test Event Type";
		const data = { value: 3 };
		
		const event = events.createEvent(testEventType, data);
		
		expect(typeof event).toBe("object");
		expect(event.type).toBe(testEventType);
		expect(event.data).toBe(data);
	});

	test("can create an event without data", () => {
		const testEventType = "Test Event Type";
		const data = null;
		
		const event = events.createEvent(testEventType, data);
		
		expect(typeof event).toBe("object");
		expect(event.type).toBe(testEventType);
		expect(event.data).toBeNull();
	});	
	
	test("the create event function is curried", () => {
		const testEventType = "Test Event Type";
		const data = { value: 3 };
		
		const createTestEvent = events.createEvent(testEventType);
		
		expect(typeof createTestEvent).toBe("function");
		
		const event = createTestEvent(data);
		
		expect(typeof event).toBe("object");
		expect(event.type).toBe(testEventType);
		expect(event.data).toBe(data);
	});	
});