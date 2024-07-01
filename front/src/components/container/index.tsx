import React from 'react'
import type FlexRowProps from './type'
import './style.scss'

const Container = ({ children, size }: FlexRowProps) => {
	return (
		<div className={['container', ...(size !== undefined) ? [`container--${size}`] : []].join(' ')}>
			{ children }
		</div>
	)
}

export default Container
