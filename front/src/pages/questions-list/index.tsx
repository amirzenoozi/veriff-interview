import React, { useState } from 'react'
import { type Check } from '../../interfaces/check'
import Container from '../../components/container'
import LoadingSpinner from '../../components/loading-spinner'
import useQuestions from '../../hooks/useQuestions'
import { ListCheckbox, Error } from '@icon-park/react'
import { NavLink } from 'react-router-dom'
import './style.scss'
import { useTranslation } from 'react-i18next'

function QuestionsList () {
	const { t } = useTranslation(['main'])
	const [limit, setLimit] = useState(10)
	const [pageNumber, setPageNumber] = useState(1)
	const [orderBy, setOrderBy] = useState('created_at')
	const [order, setOrder] = useState('desc')
	const { questions, fetching, error } = useQuestions(limit, pageNumber, orderBy, order)
	const [results, setResults] = useState<Check[]>([])

	const checkDisabled = (index: number) => {
		if (index === 0) {
			return false
		} else {
			const answerIndex = results.findIndex((item) => item.checkId === questions[index - 1].id)
			return answerIndex === -1 || results[answerIndex].result === 'no'
		}
	}

	return (
		<>
			<section className={'page'}>
				<Container size={'xs'}>
					<div className={'form'}>
						<div className={'form__content'}>
							<ul className={'form__list'}>
								{
									questions?.map((item: any, index: number) => (
										(
											<li key={item.uuid}>
												<NavLink to={`/questions/${item.uuid}`}>
													<p>{item.uuid}</p>
													<span>{ item.questions?.length }</span>
												</NavLink>
											</li>
										)
									))
								}
							</ul>
						</div>
						{
							fetching && (
								<div className={'form__overlay'}>
									<LoadingSpinner size={'md'}/>
									<p>{ t('fetchingSets') }</p>
								</div>
							)
						}
						{
							!fetching && !error && questions.length === 0 && (
								<div className={'form__overlay'}>
									<ListCheckbox theme="outline" size="32" />
									<p>{ t('emptySets') }</p>
								</div>
							)
						}
						{
							!fetching && error && (
								<div className={'form__overlay'}>
									<Error theme="outline" size="32" />
									<p>{ t('serverError') }</p>
								</div>
							)
						}
					</div>
				</Container>
			</section>
		</>
	)
}

export default QuestionsList
