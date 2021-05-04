import React from "react";
import { Story, Meta } from "@storybook/react";
import { Knock } from "@knocklabs/client/dist";
import { FeedProvider } from "../components/FeedProvider";
import Feed from "../components/Feed";
import PopoverBadge from "../components/Badge";

export default {
  title: "Feed",
  component: Feed,
} as Meta;

type Props = {};

// Add some test creds in here
const knockClient = new Knock(
  "sk_1cAVRDeiNrs4MgQ0bMX7d3reyBj0A32Wgw4KM_jo7uc",
  {
    host: "https://api.knock-dev.app",
  }
);

knockClient.authenticate("samtest1");

const Template: Story<Props> = (args) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {knockClient && (
        <FeedProvider
          knockClient={knockClient}
          feedId={"2b3fe2a4-4d97-4483-a86c-ede25a137c32"}
        >
          <PopoverBadge>{({ onClose }) => <Feed />}</PopoverBadge>
        </FeedProvider>
      )}
    </div>
  );
};

export const FeedPage = Template.bind({});
