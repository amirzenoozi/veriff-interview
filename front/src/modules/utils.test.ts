import { type Check } from '../interfaces/check'
import { getChecksUpToFirstNo } from './utils'

describe('Utils: getChecksUpToFirstNo', () => {
	test('should return checks up to and including the first "no"', () => {
		const checks: Check[] = [
			{ checkId: 'aaa', result: 'yes' },
			{ checkId: 'bbb', result: 'yes' },
			{ checkId: 'ccc', result: 'no' },
			{ checkId: 'ddd', result: 'no' }
		]
		const expected: Check[] = [
			{ checkId: 'aaa', result: 'yes' },
			{ checkId: 'bbb', result: 'yes' },
			{ checkId: 'ccc', result: 'no' }
		]
		expect(getChecksUpToFirstNo(checks)).toEqual(expected)
	})

	test('should return only the first check if it is "no"', () => {
		const checks: Check[] = [
			{ checkId: 'aaa', result: 'no' },
			{ checkId: 'bbb', result: 'yes' }
		]
		const expected: Check[] = [
			{ checkId: 'aaa', result: 'no' }
		]
		expect(getChecksUpToFirstNo(checks)).toEqual(expected)
	})

	test('should return all checks if there is no "no"', () => {
		const checks: Check[] = [
			{ checkId: 'aaa', result: 'yes' },
			{ checkId: 'bbb', result: 'yes' }
		]
		expect(getChecksUpToFirstNo(checks)).toEqual(checks)
	})

	test('should return an empty array if input is empty', () => {
		const checks: Check[] = []
		expect(getChecksUpToFirstNo(checks)).toEqual([])
	})
})
