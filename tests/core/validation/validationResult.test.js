/**
 * Validation Result Tests
 */

import validationResult from '../../../src/core/validation/validationResult';

/**
 * Tests the createSuccessValidationResult() function
 */
describe("creating a success validation result", () => {
	test("can create a success validation result with a message", () => {
		const message = "Test message";
		
		const successResult = validationResult.createSuccessValidationResult(message);
		
		expect(typeof successResult).toBe("object");
		expect(successResult.success).toBe(true);
		expect(successResult.errorType).toBeUndefined();
		expect(successResult.message).toBe(message);
	});

	test("can create an success validation result with a null message", () => {
		const message = null;
		
		const successResult = validationResult.createSuccessValidationResult(message);
		
		expect(typeof successResult).toBe("object");
		expect(successResult.success).toBe(true);
		expect(successResult.errorType).toBeUndefined();
		expect(successResult.message).toBeNull();
	});	
});

/**
 * Tests the createErrorValidationResult() function
 */
describe("creating an error validation result", () => {
	test("can create an error validation result with a message", () => {
		const message = "Test message";
		const errorType = "Error Type";
		
		const successResult = validationResult.createErrorValidationResult(errorType, message);
		
		expect(typeof successResult).toBe("object");
		expect(successResult.success).toBe(false);
		expect(successResult.errorType).toBe(errorType);
		expect(successResult.message).toBe(message);
	});

	test("can create an error validation result with a null message", () => {
		const message = null;
		const errorType = "Error Type";
		
		const successResult = validationResult.createErrorValidationResult(errorType, message);
		
		expect(typeof successResult).toBe("object");
		expect(successResult.success).toBe(false);
		expect(successResult.errorType).toBe(errorType);
		expect(successResult.message).toBeNull();
	});	
})