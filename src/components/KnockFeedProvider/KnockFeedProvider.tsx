import * as React from "react";
import Knock, {
  Feed,
  FeedClientOptions,
  FeedStoreState,
} from "@knocklabs/client";
import create, { StoreApi, UseStore } from "zustand";

import { ColorMode } from "../../constants";
import { useAuthenticatedKnockClient, useNotifications } from "../../hooks";
import { feedProviderKey } from "../../utils";
import { KnockFeedContainer } from "./KnockFeedContainer";
import { KnockI18nProvider } from "../KnockI18nProvider";
import { Translation } from "../../i18n";

export interface KnockFeedProviderState {
  knock: Knock;
  feedClient: Feed;
  useFeedStore: UseStore<FeedStoreState>;
  colorMode: ColorMode;
}

const FeedStateContext = React.createContext<KnockFeedProviderState | null>(
  null
);

export interface KnockFeedProviderProps {
  // Knock client props
  apiKey: string;
  host?: string;
  // Authentication props
  userId: string;
  userToken?: string;
  // Feed props
  feedId: string;

  // Extra options
  children?: React.ReactElement;
  colorMode?: ColorMode;
  rootless?: boolean;

  // Feed client options
  defaultFeedOptions?: FeedClientOptions;

  // i18n translations
  i18n?: Translation;
}

export const KnockFeedProvider: React.FC<KnockFeedProviderProps> = ({
  apiKey,
  host,
  userId,
  userToken,
  feedId,
  children,
  defaultFeedOptions = {},
  colorMode = "light",
  rootless = false,
  i18n,
}) => {
  const knock = useAuthenticatedKnockClient(apiKey, userId, userToken, {
    host,
  });

  const feedClient = useNotifications(knock, feedId, defaultFeedOptions);
  const useFeedStore = create(feedClient.store as StoreApi<FeedStoreState>);

  const content = rootless ? (
    children
  ) : (
    <KnockFeedContainer>{children}</KnockFeedContainer>
  );

  return (
    <FeedStateContext.Provider
      key={feedProviderKey(feedId, defaultFeedOptions)}
      value={{
        knock,
        feedClient,
        useFeedStore,
        colorMode,
      }}
    >
      <KnockI18nProvider i18n={i18n}>{content}</KnockI18nProvider>
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
