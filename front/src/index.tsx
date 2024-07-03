import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home'
import Error from './pages/error'
import Layout from './pages/layout'
import Question from './pages/questoin'
import QuestionsList from './pages/questions-list'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import '@icon-park/react/styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import './i18n'

const router = createBrowserRouter([
	{
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Home/>,
				errorElement: <Error/>
			},
			{
				path: '/questions',
				element: <QuestionsList/>,
				errorElement: <Error/>
			},
			{
				path: '/questions/:uuid',
				element: <Question/>,
				errorElement: <Error/>
			}
		]
	},
	{
		path: '/error',
		element: <Error/>,
		errorElement: <Error/>
	},
	{
		path: '*',
		element: <Error/>,
		errorElement: <Error/>
	}
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
		<Tooltip id="tooltip-area"/>
		<ToastContainer />
	</React.StrictMode>
)
