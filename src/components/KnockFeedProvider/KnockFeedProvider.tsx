import * as React from "react";
import Knock, { Feed, FeedStoreState } from "@knocklabs/client";
import create, { UseStore } from "zustand";
import { FilterStatus } from "../../constants";

import "./styles.css";

export interface KnockFeedProviderState {
  knock: Knock;
  feedClient: Feed;
  useFeedStore: UseStore<FeedStoreState>;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
}

const FeedStateContext = React.createContext<KnockFeedProviderState | null>(
  null
);

export interface KnockFeedProviderProps {
  apiKey: string;
  userId: string;
  userToken?: string;
  feedId: string;
  host?: string;
  // Feed client scoping options
  source?: string;
  tenant?: string;
}

export const KnockFeedProvider: React.FC<KnockFeedProviderProps> = ({
  apiKey,
  userId,
  feedId,
  userToken,
  host,
  children,
  source,
  tenant,
}) => {
  const [status, setStatus] = React.useState(FilterStatus.All);

  const knock = React.useMemo(() => {
    const knock = new Knock(apiKey, { host });
    knock.authenticate(userId, userToken);

    return knock;
  }, [apiKey, host, userId, userToken]);

  const [feedClient, useFeedStore] = React.useMemo(() => {
    const feedClient = knock.feeds.initialize(feedId, { source, tenant });
    const useFeedStore = create(feedClient.store);

    return [feedClient, useFeedStore];
  }, [knock, feedId, source, tenant]);

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
      <div className="rnf-feed-provider">{children}</div>
    </FeedStateContext.Provider>
  );
};

export function useKnockFeed(): KnockFeedProviderState {
  const context = React.useContext(FeedStateContext);
  if (context === undefined) {
    throw new Error("useFeedState must be used within a FeedProvider");
  }
  return context as KnockFeedProviderState;
}
