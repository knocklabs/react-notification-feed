import * as React from "react";
import { Knock } from "@knocklabs/client";
import create from "zustand";
import { FilterStatus } from "../../constants";
import styled from "@emotion/styled";
import { typography } from "../../theme";

const FeedStateContext = React.createContext(null);

type Props = {
  knockClient: Knock;
  feedId: string;
};

type ProviderState = {};

const Container = styled.div`
  font-family: ${typography.fontFamily}!important;
  margin: 0 !important;
  padding: 0 !important;

  * {
    font-family: ${typography.fontFamily}!important;
  }
`;

const FeedProvider: React.FC<Props> = ({ knockClient, feedId, children }) => {
  const [status, setStatus] = React.useState(FilterStatus.All);

  const [feedClient, useFeedStore] = React.useMemo(() => {
    // Create the notification feed instance
    const feedClient = knockClient.feeds.initialize(feedId);
    const useFeedStore = create(feedClient.store);
    return [feedClient, useFeedStore];
  }, [knockClient, feedId]);

  React.useEffect(() => {
    feedClient.listenForUpdates();
  }, [feedClient]);

  React.useEffect(() => {
    feedClient.fetch({ status });
  }, [feedClient, status]);

  const state = {
    knockClient,
    feedClient,
    useFeedStore,
    status,
    setStatus,
  };

  return (
    <FeedStateContext.Provider value={state}>
      <Container>{children}</Container>
    </FeedStateContext.Provider>
  );
};

function useFeedProviderState() {
  const context = React.useContext(FeedStateContext);
  if (context === undefined) {
    throw new Error("useFeedState must be used within a FeedProvider");
  }
  return context;
}

export { FeedProvider, useFeedProviderState };
