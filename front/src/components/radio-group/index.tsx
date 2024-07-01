import React, { useState } from 'react'
import './style.scss'
import { type RadioGroupProps, type RadioProps } from './type'

const Radio = ({ value, label, name, checked, disabled, clickHandler }: RadioProps) => {
	const handleClick = (e: any) => {
		clickHandler(e.target.value)
	}

	return (
		<div className={['radio', ...disabled ? ['radio--disabled'] : []].join(' ')}>
			<input
				id={`radio-${name}-${value}`}
				type='radio'
				value={value}
				name={name}
				disabled={disabled}
				onChange={handleClick}
				checked={checked}
			/>
			<label htmlFor={`radio-${name}-${value}`}>{ label }</label>
		</div>
	)
}

const RadioGroup = ({ options, value, name, disabled, clickHandler, ...otherProps }: RadioGroupProps) => {
	const [selected, setSelected] = useState(value)

	const RadioClickHandler = (value: string, ...args: any[]) => {
		setSelected(value)
		clickHandler(value, ...args)
	}

	return (
		<div className={'radio__group'}>
			{ options.map((item, index) => {
				return (
					<Radio
						key={`radio-${item.value}-${index}`}
						value={item.value}
						label={item.label}
						name={name}
						checked={selected === item.value}
						disabled={disabled}
						clickHandler={(value) => RadioClickHandler(value, ...Object.values(otherProps))}
					/>
				)
			})}
		</div>
	)
}

export default RadioGroup
