import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { KnockFeedProvider } from "../components/FeedProvider";
import NotificationButton from "../components/NotificationIconButton";
import FeedPopover from "../components/NotificationFeedPopover";

export default {
  title: "Feed",
  argTypes: {
    apiKey: {
      name: "API key",
      type: { name: "string", required: true },
      defaultValue: "pk_test_WcXTzGrX4LOIHCnMq4PIYPWIH0Quu2mnQlcN-UUdoGA",
    },
    userId: {
      name: "User ID",
      type: { name: "string", required: true },
      defaultValue: "chris",
    },
    feedId: {
      name: "Feed ID",
      type: { name: "string", required: true },
      defaultValue: "97e0f24a-35c6-45e5-b69f-58b88e3004de",
    },
    host: {
      name: "Host",
      type: { name: "string", required: false },
      defaultValue: "http://localhost:4001",
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
          onClick={(e) => setIsVisible(!isVisible)}
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
