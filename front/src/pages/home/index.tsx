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

	const changeFocus = (event: any) => {
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
		}
	}

	const checkDisabled = (index: number) => {
		if (index === 0) {
			return false
		} else {
			const answerIndex = results.findIndex((item) => item.checkId === questions[index - 1].id)
			return answerIndex === -1 || results[answerIndex].result === 'no'
		}
	}

	const isSubmitDisabled = () => {
		// The button is activated If:
		// 1. All questions are answered
		// 2. At least one question is answered with 'no'
		const isAllAnswered = results.length === questions.length
		const atLeastOneNo = results.some((item) => item.result === 'no')
		return !((!atLeastOneNo && isAllAnswered) || atLeastOneNo)
	}

	const submitTheForm = () => {
		console.log(results)
	}

	return (
		<>
			<section className={'page'}>
				<Container size={'xs'}>
					<form className={'form'} onSubmit={submitTheForm}>
						{
							questions.map((item, index) => (
								(
									<div
										key={item.id}
										className={['form__field', ...checkDisabled(index) ? ['form__field--disabled'] : []].join(' ')}
										tabIndex={0}
										onKeyDown={changeFocus}
									>
										<p>{item.description}</p>
										<RadioGroup
											options={radioOptions}
											name={`field-${item.id}`}
											disabled={checkDisabled(index)}
											clickHandler={radioClickCallBack}
											otherProps={item}
										/>
									</div>
								)
							))
						}
						<div className={'form__footer'} tabIndex={0} onKeyDown={changeFocus}>
							<Btn
								variant='primary'
								text='Submit'
								type='submit'
								disable={isSubmitDisabled()}
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
