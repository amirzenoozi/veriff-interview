import React from 'react'
import { render, screen } from '@testing-library/react'
import Btn from './index'

describe('Buttons', () => {
	test('HasIcon', () => {
		render(<Btn type={'button'} text={'Button'} icon={false} variant={'primary'} iconName={'Save'} />)
		const linkElement = screen.getByText(/Button/i)
		expect(linkElement).toBeInTheDocument()
	})
	test('WithoutIcon', () => {
		render(<Btn type={'button'} text={'Button'} icon={false} variant={'primary'} />)
		const linkElement = screen.getByText(/Button/i)
		expect(linkElement).toBeInTheDocument()
	})
})
