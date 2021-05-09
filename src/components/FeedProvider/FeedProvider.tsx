import * as React from "react";
import Knock, {
  Feed,
  FeedClientOptions,
  FeedStoreState,
  KnockOptions,
} from "@knocklabs/client";
import styled from "@emotion/styled";
import create, { UseStore } from "zustand";
import { FilterStatus } from "../../constants";
import { typography } from "../../theme";

type KnockFeedProviderState = {
  knock: Knock;
  feedClient: Feed;
  useFeedStore: UseStore<FeedStoreState>;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
};

const FeedStateContext = React.createContext<KnockFeedProviderState | null>(
  null
);

type Props = {
  apiKey: string;
  userId: string;
  userToken?: string;
  feedId: string;
  host?: string;
  clientOptions?: KnockOptions;
  initialOptions?: FeedClientOptions;
};

const Container = styled.div`
  font-family: ${typography.fontFamily}!important;
  margin: 0 !important;
  padding: 0 !important;

  * {
    font-family: ${typography.fontFamily}!important;
  }
`;

const KnockFeedProvider: React.FC<Props> = ({
  apiKey,
  userId,
  feedId,
  userToken,
  clientOptions = {},
  initialOptions = {},
  children,
}) => {
  const [status, setStatus] = React.useState(FilterStatus.All);

  const knock = React.useMemo(() => {
    const knock = new Knock(apiKey, clientOptions);
    knock.authenticate(userId, userToken);

    return knock;
  }, [apiKey, clientOptions, userId, userToken]);

  const [feedClient, useFeedStore] = React.useMemo(() => {
    const feedClient = knock.feeds.initialize(feedId, initialOptions);
    const useFeedStore = create(feedClient.store);

    return [feedClient, useFeedStore];
  }, [knock, feedId, initialOptions]);

  React.useEffect(() => {
    feedClient.listenForUpdates();
    return () => knock.teardown();
  }, [feedClient]);

  React.useEffect(() => {
    feedClient.fetch({ status });
  }, [feedClient, status]);

  const state = {
    knock,
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

function useKnockFeed(): KnockFeedProviderState {
  const context = React.useContext(FeedStateContext);
  if (context === undefined) {
    throw new Error("useFeedState must be used within a FeedProvider");
  }
  return context as KnockFeedProviderState;
}

export { KnockFeedProvider, useKnockFeed };
