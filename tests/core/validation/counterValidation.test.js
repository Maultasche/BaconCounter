/**
 * Counter Validation Tests
 *
 * Since we are testing so many different combinations of counter and range values,
 * we have a function that generates the test suites for a particular test configuration.
 * We then have several test suites that call the test suite generation function for
 * similar groups of test configurations
 */

import R from 'ramda';
import createCounterValidation from '../../../src/core/validation/counterValidation';

//This test suite tests ranges of positive numbers
describe("testing the counter validation with a range of only positive numbers", () => {
	//Test with a value in the middle of a range with only positive numbers
	testCounterValidationWithValueRange(5, 1, 10);
	// //Test with a value that is already below the range with only positive numbers
	// testCounterValidationWithValueRange(-1, 1, 10);
	// //Test with a value that is already above the range with only positive numbers
	// testCounterValidationWithValueRange(12, 1, 10);
	// //Test with a value at the low end of the range with only positive numbers
	// testCounterValidationWithValueRange(1, 1, 10);
	// //Test with a value at the high end of the range with only positive numbers
	// testCounterValidationWithValueRange(10, 1, 10);

	//TODO: Test with positive range where minValue === maxValue
});

//TODO: Test with larger positive range (1, 100)

//TODO: Test with ranges that includes negative and positive values, also include
//a test where the range is (0, 0)

//TODO: Test with a larger range that includes negative and positive values

//TODO: Test with ranges of negative values, also include a test where 
//minValue === maxValue and the number is negative

//TODO: Test with a larger range of negative values


/**
 * Tests counter validation using a specific counter value and value range
 *
 * @param {number} counterValue - The value of the counter when testing
 * @param {number} minValue - The minimum value of the allowed value range
 * @param {number} maxValue - The maximum value of the allowed value range
 */
function testCounterValidationWithValueRange(counterValue, minValue, maxValue) {
	const testDescriptor = createTestDescriptor(counterValue, minValue, maxValue);
	const testSuiteDescription = "testing counter validation functionality for " +
		testDescriptor;
		
	//Tests the counter validation functionality for a particular test configuration
	describe(testSuiteDescription, () => {
		let mockActions = createMockActions(counterValue);
		let counterValidation = createCounterValidation(mockActions, minValue, maxValue);
		
		//Tests the increment validator for this test configuration
		test(`testing increment validation for ${testDescriptor}`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue + 1, minValue, maxValue);
			
			expect(counterValidation.canIncrementCounter()).toBe(expectedResult);
		});
		
		//Tests the decrement validator for this test configuration
		test(`testing decrement validation for ${testDescriptor}`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue - 1, minValue, maxValue);
			
			expect(counterValidation.canDecrementCounter()).toBe(expectedResult);
		});
		
		//Tests the add validator for this test configuration when adding 0
		test(`testing add validation for ${testDescriptor} when adding 0`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue + 0, minValue, maxValue);
			
			expect(counterValidation.canAddToCounter(0)).toBe(expectedResult);
		});
		
		//Tests the add validator for this test configuration when adding 1
		test(`testing add validation for ${testDescriptor} when adding 1`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue + 1, minValue, maxValue);
			
			expect(counterValidation.canAddToCounter(1)).toBe(expectedResult);
		});

		//Tests the add validator for this test configuration when adding 10
		test(`testing add validation for ${testDescriptor} when adding 10`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue + 10, minValue, maxValue);
			
			expect(counterValidation.canAddToCounter(10)).toBe(expectedResult);
		});
		
		//Tests the add validator for this test configuration when adding 100
		test(`testing add validation for ${testDescriptor} when adding 100`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue + 100, minValue, maxValue);
			
			expect(counterValidation.canAddToCounter(100)).toBe(expectedResult);
		});
		
		//Tests the subtract validator for this test configuration when subtracting 0
		test(`testing subtract validation for ${testDescriptor} when subtracting 0`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue - 0, minValue, maxValue);
			
			expect(counterValidation.canSubtractFromCounter(0)).toBe(expectedResult);
		});
		
		//Tests the subtract validator for this test configuration when subtracting 1
		test(`testing subtract validation for ${testDescriptor} when subtracting 1`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue - 1, minValue, maxValue);
			
			expect(counterValidation.canSubtractFromCounter(1)).toBe(expectedResult);
		});
		
		//Tests the subtract validator for this test configuration when subtracting 10
		test(`testing subtract validation for ${testDescriptor} when subtracting 10`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue - 10, minValue, maxValue);
			
			expect(counterValidation.canSubtractFromCounter(10)).toBe(expectedResult);
		});
		
		//Tests the subtract validator for this test configuration when subtracting 100
		test(`testing subtract validation for ${testDescriptor} when subtracting 100`, () => {	
			//Calculate the expected result
			const expectedResult = rangeComparisonValue(counterValue - 100, minValue, maxValue);
			
			expect(counterValidation.canSubtractFromCounter(100)).toBe(expectedResult);
		});
	});		
}

/**
 * Mocks the action functions 
 *
 * @param {number} counterValue - The counter value the action functions 
 *	are to operate on
 * @returns {Object} The object containing the action functions
 */
function createMockActions(counterValue) {
	const actions = {
		incrementCounter: R.partial(R.inc, [counterValue]),
		decrementCounter: R.partial(R.dec, [counterValue]),
		addToCounter: R.partial(R.add, [counterValue]),
		subtractFromCounter: R.partial(R.subtract, [counterValue])
	};
	
	return actions;
}

/**
 * Calculates the range comparison value for a value and a value range
 *
 * @param {number} value - The value to be compared to the value range
 * @param {number} minValue - The minimum value in the value range
 * @param {number} maxValue - The maximum value in the value range
 * @returns {number} -1 if value < minValue, 0 if minValue <= value <= maxValue,
 *	1 if value > maxValue
 */
function rangeComparisonValue(value, minValue, maxValue) {
	let comparisonValue = 0;
	
	if(value < minValue) {
		comparisonValue = -1;
	}
	else if(value > maxValue) {
		comparisonValue = 1;
	}
	
	return comparisonValue;
}

/**
 * Creates a test descriptor that is a string representation of a particular
 * test configuration.
 *
 * @param {number} value - The test configuration value
 * @param {number} minValue - The minimum value in the test configuration value range
 * @param {number} maxValue - The maximum value in the test configuration value range
 * @returns {string} A string representation of the test configuration
 */
function createTestDescriptor(counterValue, minValue, maxValue) { 
	return `{ counter: ${counterValue}, min: ${minValue}, max: ${maxValue} }`;
}