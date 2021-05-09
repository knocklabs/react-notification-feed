import React from "react";
import { Story, Meta } from "@storybook/react";
import Knock from "@knocklabs/client";
import { KnockFeedProvider } from "../components/FeedProvider";
import Feed from "../components/Feed";
import PopoverBadge from "../components/Badge";
import { FilterStatus } from "../constants";

export default {
  title: "Feed",
  argTypes: {
    apiKey: {
      name: "API key",
      type: { name: "string", required: true },
    },
    userId: {
      name: "User ID",
      type: { name: "string", required: true },
    },
    feedId: {
      name: "Feed ID",
      type: { name: "string", required: true },
    },
    host: {
      name: "Host",
      type: { name: "string", required: false },
      defaultValue: "https://api.knock.app",
    },
  },
} as Meta;

type Props = {
  host?: string;
  userId: string;
  feedId: string;
  apiKey: string;
};

const Template: Story<Props> = (args) => {
  return (
    <KnockFeedProvider
      apiKey={args.apiKey}
      userId={args.userId}
      feedId={args.feedId}
      clientOptions={{ host: args.host }}
      initialOptions={{ status: FilterStatus.All }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <PopoverBadge>{({ onClose }) => <Feed />}</PopoverBadge>
      </div>
    </KnockFeedProvider>
  );
};

export const FeedPage = Template.bind({});
