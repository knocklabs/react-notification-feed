import React, { useEffect, useState } from "react";
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
  "sk_test_-MrFEZJNP2e4Ijui3HmgyVt0ZAjsfc1YaC4lHj_3YEE",
  {
    host: "http://localhost:4001",
  }
);

knockClient.authenticate(
  "chris",
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpcyJ9.YFjIiGNjWRC-nau2XPjAz9QgniPD0plLUZySQ218o8vl2PvPK7svYgnn03GEocNNaBJrfYqn9Fbxhd5UWAmMl0RSxDm95SjcXLiRrU5gxMsYzn6LcrC1fsH0JxqlYsiBCPPMmqQbV0Gt3D3p7QQWFZpxlIINOvwyNPJYqXqm1XbFhsX-9q-fOkqZ1DZsSYa7bNkL8KARxR_BlWuiBLtH1vbm2nRzezv_bAP-vhdq-xLKHS1bkSOgsVsr3YnAlmYxZNc0bsv7rWARZqrfrLdRIRH3zu1cAweIqjWS584-pZveTrHatV_cBDqFthLGMrmRd_qIs5MzJHud2r2aLT1aXGlyBd7-ZD7hINcwJvRdcJBZ4-w8kyEaR8iAXFsKe6PzEl4hKo7mgVkpPzHz9iVVAIJloJAb3fiVRUYydQsS6_4ZF5D-jeVz3taVcVcgu-LGjK9OiGVDa8zOO7IcRQpojD3ov0D3qxPTb53gnlxNjviVJlFr8LnSDrb0_MucJqze5U2oSePCw_euc7O2etAH8hLIMhZh9Oe2t_3BtMSUOJNGQ4s--RTaV3c7ykNpxf7avuY_GQzu7IAV8-xSYlCynpZrFB56B2YdUoFZskqLUqGdzVI6LT9uvsrAprCtZeJ-YzxS8Y1gzob0DPTDybbomfJwQ_FA_5PluNlMhyL-AeM"
);

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
