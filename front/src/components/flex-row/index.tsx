import React from 'react'
import './style.scss'
import type FlexRowProps from './type'

const FlexRow = ({ stretch = false, space = true, children }: FlexRowProps) => {
	return (
		<div className={['row', ...stretch ? ['row--stretch'] : [], ...space ? [] : ['row--noMargin']].join(' ')}>
			{ children }
		</div>
	)
}

export default FlexRow
