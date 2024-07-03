import type { Meta, StoryObj } from '@storybook/react'
import LoadingSpinner from '../components/loading-spinner'

const meta = {
	title: 'Components/LoadingSpinner',
	component: LoadingSpinner,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] }
	}
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		size: 'md'
	}
}
