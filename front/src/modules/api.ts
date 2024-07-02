import HttpClient from './http'

const API_URI: string = process.env.API_URL ?? 'http://localhost:3200'
const api = new HttpClient(API_URI)

const getVerifications = async (limit: number, page: number, orderBy: string, order: string) => {
	try {
		const { data } = await api.get('/verification', {
			params: {
				limit,
				page,
				order,
				order_by: orderBy
			}
		})
		return data
	} catch (err) {
		return []
	}
}

const createAnswer = async (data: any) => {
	try {
		const response = await api.post('/response', data)
		return response
	} catch (err) {
		return []
	}
}

export {
	getVerifications,
	createAnswer
}
