import React, { useEffect, useState } from 'react'
import Btn from '../../components/btn'
import Container from '../../components/container'
import RadioGroup from '../../components/radio-group'
import './style.scss'

function Home () {
	const [results, setResults] = useState<Array<{ checkId: string, result: string }>>([])
	const radioOptions = [
		{
			value: 'yes',
			label: 'Yes'
		},
		{
			value: 'no',
			label: 'No'
		}
	]
	const questions = [
		{
			id: 'aaa',
			priority: 10,
			description: 'Face on the picture matches face on the document'
		},
		{
			id: 'bbb',
			priority: 5,
			description: 'Veriff supports presented document'
		},
		{
			id: 'ccc',
			priority: 7,
			description: 'Face is clearly visible'
		},
		{
			id: 'ddd',
			priority: 3,
			description: 'Document data is clearly visible'
		}
	]
	useEffect(() => {
		questions.sort((a, b) => a.priority - b.priority)
	}, [])

	const radioClickCallBack = (value: any, otherProps: any) => {
		const tempResults = [...results]
		const existItemIndex = tempResults.findIndex((item) => item.checkId === otherProps.id)
		if (existItemIndex !== -1) {
			tempResults[existItemIndex].result = value
		} else {
			tempResults.push({ checkId: otherProps.id, result: value })
		}
		setResults(tempResults)
	}

	const focusNext = (event: any) => {
		if (event.keyCode === 40) {
			// down arrow
			const nextElement = event.target.nextElementSibling
			if (nextElement) {
				nextElement.focus()
			}
		} else if (event.keyCode === 38) {
			// up arrow
			const prevElement = event.target.previousElementSibling
			if (prevElement) {
				prevElement.focus()
			}
		} else if (event.keyCode === 97 || event.keyCode === 49) {
			// 1 key
			const elements = event.target.querySelectorAll('div.radio input[type="radio"]')
			const targetElement = Array.from(elements).findIndex((item: any) => item.value === 'yes')
			elements[targetElement].click()
		} else if (event.keyCode === 98 || event.keyCode === 50) {
			// 2 key
			const elements = event.target.querySelectorAll('div.radio input[type="radio"]')
			const targetElement = Array.from(elements).findIndex((item: any) => item.value === 'no')
			elements[targetElement].click()
		} else {
			console.log('key code', event)
		}
	}

	return (
		<>
			<section className={'page'}>
				<Container size={'sm'}>
					<form className={'form'}>
						{
							questions.map((item, index) => (
								(
									<div key={item.id} className={'form__field'} tabIndex={0} onKeyDown={focusNext}>
										<p>{item.description}</p>
										<RadioGroup
											options={radioOptions}
											name={`field-${item.id}`}
											disabled={false}
											clickHandler={radioClickCallBack}
											otherProps={item}
										/>
									</div>
								)
							))
						}
						<div className={'form__footer'} tabIndex={0} onKeyDown={focusNext}>
							<Btn
								variant='primary'
								text='Submit'
								type='submit'
								disable={false}
								block={true}
							/>
						</div>
					</form>
				</Container>
			</section>
		</>
	)
}

export default Home
