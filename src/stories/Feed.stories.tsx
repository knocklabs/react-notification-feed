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
  "pk_test_xPDiT9f2gIfbVRYSwTJ3CqTZ_GUeXzdTpOV86Z3nNDs",
  {
    host: "http://localhost:4001",
  }
);

knockClient.authenticate("chris");

const Template: Story<Props> = (args) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {knockClient && (
        <FeedProvider
          knockClient={knockClient}
          feedId={"97e0f24a-35c6-45e5-b69f-58b88e3004de"}
        >
          <PopoverBadge>{({ onClose }) => <Feed />}</PopoverBadge>
        </FeedProvider>
      )}
    </div>
  );
};

export const FeedPage = Template.bind({});
