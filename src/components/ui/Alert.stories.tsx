import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
    title: "UI/Alert",
    component: Alert,
    parameters: { layout: "centered" },
    args: {
        children: 'Hello World'
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
};
