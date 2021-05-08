import * as React from "react";
import Knock, { FeedStoreState } from "@knocklabs/client";
import create, { UseStore } from "zustand";
import { FilterStatus } from "../../constants";
import styled from "@emotion/styled";
import { typography } from "../../theme";
// TODO: need to fix this import in next version of client
// import { Feed } from "@knocklabs/client";

type FeedProviderState = {
  knockClient: Knock;
  feedClient: any;
  useFeedStore: UseStore<FeedStoreState>;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
};

const FeedStateContext = React.createContext<FeedProviderState | null>(null);

type Props = {
  knockClient: Knock;
  feedId: string;
};

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

function useFeedProviderState(): FeedProviderState {
  const context = React.useContext(FeedStateContext);
  if (context === undefined) {
    throw new Error("useFeedState must be used within a FeedProvider");
  }
  return context as FeedProviderState;
}

export { FeedProvider, useFeedProviderState };
