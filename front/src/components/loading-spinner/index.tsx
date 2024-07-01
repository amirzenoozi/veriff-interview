import React from 'react'
import type LoadingProps from './type'
import './style.scss'

const LoadingSpinner = ({ size = 'md' }: LoadingProps) => {
	return (
		<div className={['loading', ...size ? [`loading--${size}`] : []].join(' ')}/>
	)
}

export default LoadingSpinner
