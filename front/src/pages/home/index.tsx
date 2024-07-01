import React, { useEffect, useState } from 'react'
import Btn from '../../components/btn'
import Container from '../../components/container'
import FlexCol from '../../components/flex-col'
import FlexRow from '../../components/flex-row'
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

	return (
		<>
			<section className={'page'}>
				<Container size={'sm'}>
					<div className={'form'}>
						<FlexRow space={false}>
							{
								questions.map((item, index) => (
									(
										<FlexCol key={item.id} xs={24}>
											<div className={'form__field'}>
												<p>{item.description}</p>
												<RadioGroup
													options={radioOptions}
													name={`field-${item.id}`}
													disabled={false}
													clickHandler={radioClickCallBack}
													otherProps={item}
												/>
											</div>
										</FlexCol>
									)
								))
							}
						</FlexRow>
						<div className={'form__footer'}>
							<Btn
								variant='primary'
								text='Submit'
								type='submit'
								disable={false}
								block={true}
							/>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

export default Home
