import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import Alert from "./Alert";

const meta: Meta<typeof Button> = {
    title: "Components/Alert",
    component: Alert,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {},
};
