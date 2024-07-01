import type IconsList from '../../constants/icons'

interface BtnProps {
	text?: string
	variant?: 'primary'
	icon?: boolean
	iconName?: keyof typeof IconsList | ''
	iconPosition?: 'left' | 'right'
	type?: 'button' | 'submit' | 'reset'
	block?: boolean
	size?: number
	to?: string
	disable?: boolean
}

export default BtnProps
