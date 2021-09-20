import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react";
import {
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "../";

import "../theme.css";
import { Avatar, NotificationCell } from "../components/NotificationCell";

export default {
  title: "Feed",
  argTypes: {
    apiKey: {
      name: "API key",
      type: { name: "string", required: true },
      defaultValue: "pk_test_3WZFRVstQbNkDEhF_1gfXn3Ka3WDHSZG9FLltmV8-Pc",
    },
    userId: {
      name: "User ID",
      type: { name: "string", required: true },
      defaultValue: "chris",
    },
    feedId: {
      name: "Feed ID",
      type: { name: "string", required: true },
      defaultValue: "2b3fe2a4-4d97-4483-a86c-ede25a137c32",
    },
    host: {
      name: "Host",
      type: { name: "string", required: false },
      defaultValue: "https://api.knock-dev.app",
    },
    tenant: {
      name: "Tenant ID",
      type: { name: "string", required: false },
      defaultValue: "",
    },
  },
} as Meta;

type Props = {
  host?: string;
  userId: string;
  feedId: string;
  apiKey: string;
  tenant: string;
};

const Template: Story<Props> = (args) => {
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const colorMode = "dark";

  return (
    <KnockFeedProvider
      apiKey={args.apiKey}
      userId={args.userId}
      feedId={args.feedId}
      host={args.host}
      tenant={args.tenant}
      colorMode={colorMode}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 10,
          backgroundColor: colorMode === "dark" ? "#2e2f34" : "transparent",
        }}
      >
        <NotificationIconButton
          ref={buttonRef}
          onClick={(e) => setIsVisible(!isVisible)}
        />
        <NotificationFeedPopover
          buttonRef={buttonRef}
          isVisible={isVisible}
          onClose={(e) => setIsVisible(false)}
          renderItem={(props) => (
            // Example of overriding the avatar rendering and cell rendering
            <NotificationCell
              key={props.item.id}
              item={props.item}
              avatar={<Avatar name={props.item.actors[0].name} />}
            />
          )}
          onNotificationClick={(e) => {
            // Handle the notification click
            console.log(e);
          }}
        />
      </div>
    </KnockFeedProvider>
  );
};

export const FeedPage = Template.bind({});
