import { Feed } from "@knocklabs/client";
import { useEffect, useState } from "react";

export type FeedSettings = {
  features: {
    branding_required: boolean;
  };
};

function useFeedSettings(
  feedClient: Feed
): { settings: FeedSettings | null; loading: boolean } {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: consider moving this into the feed client and into the feed store state when
  // we're using this in other areas of the feed
  useEffect(() => {
    async function getSettings() {
      const knock = feedClient.knock;
      const apiClient = knock.client();
      const feedSettingsPath = `/v1/users/${knock.userId}/feeds/${feedClient.feedId}/settings`;
      setIsLoading(true);

      const response = await apiClient.makeRequest({
        method: "GET",
        url: feedSettingsPath,
      });

      if (!response.error) {
        setSettings(response.body);
      }

      setIsLoading(false);
    }

    getSettings();
  }, []);

  return { settings, loading: isLoading };
}

export default useFeedSettings;
