import React from 'react'
import { render, screen } from '@testing-library/react'
import RadioGroup from './index'

const options = [
	{
		value: 'yes',
		label: 'Yes'
	},
	{
		value: 'no',
		label: 'No'
	}
]

describe('RadioGroup', () => {
	test('Single Radio', () => {
		render(<RadioGroup options={[options[0]]} name={'metric'} value={'yes'} clickHandler={(msg) => { console.log(msg) }} />)
		const linkElement = screen.getByLabelText(/Yes/i)
		expect(linkElement).toBeInTheDocument()
	})

	test('Multiple Radio', () => {
		render(<RadioGroup options={options} name={'metric'} value={'yes'} clickHandler={(msg) => { console.log(msg) }} />)
		const firstLabel = screen.getByLabelText(/Yes/i)
		const secondLabel = screen.getByLabelText(/No/i)
		expect(firstLabel).toBeInTheDocument()
		expect(secondLabel).toBeInTheDocument()
	})
})
