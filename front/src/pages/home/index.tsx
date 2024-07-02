import React, { useState } from 'react'
import Btn from '../../components/btn'
import Container from '../../components/container'
import RadioGroup from '../../components/radio-group'
import LoadingSpinner from '../../components/loading-spinner'
import './style.scss'
import useQuestions from '../../hooks/useQuestions'
import { createAnswer } from '../../modules/api'

function Home () {
	const { questions, fetching, verificationId } = useQuestions(10, 1, 'created_at', 'desc')
	const [results, setResults] = useState<Array<{ checkId: string, result: string }>>([])
	const [submitting, setSubmitting] = useState<boolean>(false)
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
			if (nextElement && !nextElement.classList.contains('form__field--disabled')) {
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
		// If the form is submitting, the button must be disabled
		if (submitting) {
			return true
		}

		// The button is activated If:
		// 1. All questions are answered
		// 2. At least one question is answered with 'no'
		const isAllAnswered = results.length === questions.length
		const atLeastOneNo = results.some((item) => item.result === 'no')
		return !((!atLeastOneNo && isAllAnswered) || atLeastOneNo)
	}

	const submitTheForm = (event: any) => {
		event.preventDefault()
		setSubmitting(true)
		createAnswer({
			verificationUuid: verificationId,
			results
		}).then((res) => {
			console.log('Response', res)
		}).catch((e) => {
			return []
		}).finally(() => {
			setSubmitting(false)
		})
	}

	return (
		<>
			<section className={'page'}>
				<Container size={'xs'}>
					<form className={'form'} onSubmit={submitTheForm}>
						<div className={'form__content'}>
							{
								questions?.map((item: any, index: number) => (
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
						</div>
						{
							fetching && (
								<div className={'form__loading'}>
									<LoadingSpinner size={'md'}/>
									<p>We Are Fetching The Questions!</p>
								</div>
							)
						}
						<div className={'form__footer'} tabIndex={0} onKeyDown={changeFocus}>
							<Btn
								variant="primary"
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
