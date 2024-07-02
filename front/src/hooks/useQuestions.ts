import { useEffect, useState } from 'react'
import { getVerifications } from '../modules/api'

const useQuestions = (limit: number, page: number, orderBy: string, order: string) => {
	const [items, setItems] = useState<any[]>([])
	const [fetching, setFetching] = useState<boolean>(true)
	const [verificationId, setVerificationId] = useState<string>('')

	// Create Initial Socket Connection
	useEffect(() => {
		setFetching(true)
		getVerifications(limit, page, orderBy, order).then((res: any) => {
			const sortedQuestions = res.data[0].questions.sort((a: any, b: any) => a.priority - b.priority)
			setVerificationId(res.data[0].uuid)
			setItems(sortedQuestions)
		}).catch((e) => {
			console.log('Error', e)
		}).finally(() => {
			setFetching(false)
		})
	}, [])

	return { questions: items, fetching, verificationId }
}

export default useQuestions
