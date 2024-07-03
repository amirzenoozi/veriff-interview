import HttpClient from './http'
import { toast } from 'react-toastify'

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
	} catch (err: any) {
		console.log('Error', err)
		const toastMsg = Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message[0] : err?.response?.data?.message ?? 'Something Went Wrong!'
		toast(toastMsg, {
			position: 'bottom-left',
			theme: 'light',
			type: 'error'
		})
		throw err
	}
}

const getSingleVerification = async (uuid: string) => {
	try {
		const { data } = await api.get(`/verification/${uuid}`)
		return data
	} catch (err: any) {
		console.log('Error', err)
		const toastMsg = Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message[0] : err?.response?.data?.message ?? 'Something Went Wrong!'
		toast(toastMsg, {
			position: 'bottom-left',
			theme: 'light',
			type: 'error'
		})
		throw err
	}
}

const createAnswer = async (data: any) => {
	try {
		const response = await api.post('/response', data)
		return response
	} catch (err: any) {
		const toastMsg = Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message[0] : err?.response?.data?.message ?? 'Something Went Wrong!'
		toast(toastMsg, {
			position: 'bottom-left',
			theme: 'light',
			type: 'error'
		})
		throw err
	}
}

export {
	getVerifications,
	getSingleVerification,
	createAnswer
}
