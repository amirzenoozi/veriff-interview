export interface RadioProps {
	value: string
	label: string
	name: string
	checked: boolean
	disabled?: boolean
	clickHandler: (e: any) => void
}

export interface RadioOptions {
	value: string
	label: string
	disabled?: boolean
}

export interface RadioGroupProps {
	options: RadioOptions[]
	value?: string
	name: string
	disabled?: boolean
	clickHandler: (value: string, ...args: any) => void
	[key: string]: any
}
