import { useEffect, useState } from 'react'
import { getSingleVerification } from '../modules/api'

const useSingleQuestion = (uuid: string) => {
	const [items, setItems] = useState<any[]>([])
	const [fetching, setFetching] = useState<boolean>(true)
	const [verificationId, setVerificationId] = useState<string>('')
	const [error, setError] = useState<any>(undefined)

	// Get questions from API
	useEffect(() => {
		setFetching(true)
		getSingleVerification(uuid).then((res: any) => {
			const sortedQuestions = res.questions.sort((a: any, b: any) => a.priority - b.priority)
			setVerificationId(res.uuid)
			setItems(sortedQuestions)
		}).catch((e) => {
			setError(e)
		}).finally(() => {
			setFetching(false)
		})
	}, [])

	return { questions: items, fetching, verificationId, error }
}

export default useSingleQuestion
