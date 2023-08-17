import type { Meta, StoryObj } from "@storybook/react";
import Context from "./Context";
import React from "react";
import ErrorOccurrenceContext from "../../contexts/ErrorOccurrenceContext";
import errorOccurrence from "../../stories/stubs/errorOccurrence";

const meta: Meta<typeof Context> = {
    title: "Components/Context",
    component: Context,
    render: () => <ErrorOccurrenceContext.Provider value={errorOccurrence}><Context /></ErrorOccurrenceContext.Provider>,
};

export default meta;

type Story = StoryObj<typeof Context>;

export const Primary: Story = {
};
