import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { KnockFeedProvider } from "../components/FeedProvider";
import NotificationButton from "../components/NotificationIconButton";
import FeedPopover from "../components/FeedPopover";
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
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <KnockFeedProvider
      apiKey={args.apiKey}
      userId={args.userId}
      feedId={args.feedId}
      host={args.host}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NotificationButton
          ref={buttonRef}
          onClick={() => setIsVisible(true)}
        />
        <FeedPopover
          buttonRef={buttonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </div>
    </KnockFeedProvider>
  );
};

export const FeedPage = Template.bind({});
