import Knock, { Feed, FeedClientOptions } from "@knocklabs/client";
import { useMemo, useRef } from "react";

function useNotifications(
  knock: Knock,
  feedId: string,
  options: FeedClientOptions = {}
) {
  const feedClientRef = useRef<Feed | null>();

  return useMemo(() => {
    if (feedClientRef.current) feedClientRef.current.teardown();

    const feedClient = knock.feeds.initialize(feedId, options);

    feedClient.listenForUpdates();
    feedClientRef.current = feedClient;

    return feedClient;
  }, [knock, feedId, options.source, options.tenant, options.has_tenant, options.archived]);
}

export default useNotifications;
