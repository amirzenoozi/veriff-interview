import { useEffect, useState } from 'react'
import { getVerifications } from '../modules/api'

const useQuestions = (limit: number, page: number, orderBy: string, order: string) => {
	const [items, setItems] = useState<any[]>([])
	const [fetching, setFetching] = useState<boolean>(true)
	const [error, setError] = useState<any>(undefined)

	// Get questions from API
	useEffect(() => {
		setFetching(true)
		getVerifications(limit, page, orderBy, order).then((res: any) => {
			setItems(res.data)
		}).catch((e) => {
			setError(e)
		}).finally(() => {
			setFetching(false)
		})
	}, [])

	return { questions: items, fetching, error }
}

export default useQuestions
