import React, { useEffect } from "react";
import { Story, Meta } from "@storybook/react";
import Knock from "@knocklabs/client";
import { FeedProvider } from "../components/FeedProvider";
import { KnockProvider, useKnock } from "../components/KnockProvider";
import Feed from "../components/Feed";
import PopoverBadge from "../components/Badge";

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

const FeedInner = ({ userId, feedId }) => {
  const { client, isAuthed, authenticate } = useKnock();

  useEffect(() => {
    authenticate(userId);

    return () => client?.teardown();
  }, [client, userId]);

  if (!client || !isAuthed) {
    return null;
  }

  return (
    <FeedProvider knockClient={client} feedId={feedId}>
      <PopoverBadge>{({ onClose }) => <Feed />}</PopoverBadge>
    </FeedProvider>
  );
};

const Template: Story<Props> = (args) => {
  return (
    <KnockProvider
      apiKey="pk_SagbQD2n8Lor4Fber2OOr_1BfNGMwqquhHS3Qb2Ki8o"
      options={{ host: args.host }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FeedInner {...args} />
      </div>
    </KnockProvider>
  );
};

export const FeedPage = Template.bind({});
