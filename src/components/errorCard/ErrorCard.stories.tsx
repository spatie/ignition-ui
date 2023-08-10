import type { Meta, StoryObj } from "@storybook/react";
import ErrorCard from "./ErrorCard";
import React from "react";
import ErrorOccurrenceContext from "../../contexts/ErrorOccurrenceContext";
import errorOccurrence from "../../stories/stubs/errorOccurrence";

const meta: Meta<typeof ErrorCard> = {
    title: "Components/ErrorCard",
    component: ErrorCard,
    render: () => <ErrorOccurrenceContext.Provider value={errorOccurrence}><ErrorCard /></ErrorOccurrenceContext.Provider>,
};

export default meta;

type Story = StoryObj<typeof ErrorCard>;

export const Primary: Story = {
};
