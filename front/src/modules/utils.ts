import type { Check } from '../interfaces/check'

const getChecksUpToFirstNo = (checks: Check[]): Check[] => {
	const result: Check[] = []
	for (const check of checks) {
		result.push(check)
		if (check.result.toLowerCase() === 'no') {
			break
		}
	}
	return result
}

export {
	getChecksUpToFirstNo
}
