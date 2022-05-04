import * as React from "react";
import Knock, { Feed, FeedStoreState } from "@knocklabs/client";
import create, { UseStore } from "zustand";
import { FilterStatus, ColorMode } from "../../constants";
import { KnockFeedContainer } from "./KnockFeedContainer";

export interface KnockFeedProviderState {
  knock: Knock;
  feedClient: Feed;
  useFeedStore: UseStore<FeedStoreState>;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
  colorMode: ColorMode;
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
  children?: React.ReactElement;
  // Feed client scoping options
  source?: string;
  tenant?: string;
  // Extra options
  colorMode?: ColorMode;
  rootless?: boolean;
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
  colorMode = "light",
  rootless,
}) => {
  const [status, setStatus] = React.useState(FilterStatus.All);

  const knock = React.useMemo(() => {
    const knock = new Knock(apiKey, { host });
    knock.authenticate(userId, userToken);

    return knock;
  }, [apiKey, host, userId, userToken]);

  const [feedClient, useFeedStore] = React.useMemo(() => {
    const feedClient = knock.feeds.initialize(feedId, {
      source,
      tenant,
    });
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
    colorMode,
  };

  const content = rootless ? (
    children
  ) : (
    <KnockFeedContainer>{children}</KnockFeedContainer>
  );

  return (
    <FeedStateContext.Provider value={state}>
      {content}
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
