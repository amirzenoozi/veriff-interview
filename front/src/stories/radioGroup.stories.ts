import type { Meta, StoryObj } from '@storybook/react'
import RadioGroup from '../components/radio-group'

const options = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' }
]

const meta = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		options: { control: 'object', defaultValue: options },
		disabled: { control: 'boolean', defaultValue: false }
	}
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		options,
		disabled: false,
		clickHandler: (value: string) => console.log(value)
	}
}
