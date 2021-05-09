import * as React from "react";
import Knock, { KnockOptions } from "@knocklabs/client";

type KnockProviderState = {
  isAuthed: boolean;
  authenticate: (userId: string, userToken?: string) => void;
  client: Knock | null;
};

const KnockStateContext = React.createContext<KnockProviderState | null>(null);

type Props = {
  apiKey: string;
  options?: KnockOptions;
};

const KnockProvider: React.FC<Props> = ({ apiKey, options = {}, children }) => {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [knockClient, setKnockClient] = React.useState<Knock | null>(null);

  React.useEffect(() => {
    const knockClient = new Knock(apiKey, options);
    setKnockClient(knockClient);
    setIsAuthed(false);

    return () => {
      knockClient.teardown();
    };
  }, [apiKey, options, setKnockClient, setIsAuthed]);

  const authenticate = React.useCallback(
    (userId: string, userToken?: string) => {
      if (knockClient) {
        knockClient.authenticate(userId, userToken);
        setIsAuthed(true);
      }
    },
    [knockClient, setIsAuthed]
  );

  const state = {
    isAuthed,
    authenticate,
    client: knockClient,
  };

  return (
    <KnockStateContext.Provider value={state}>
      {children}
    </KnockStateContext.Provider>
  );
};

function useKnock(): KnockProviderState {
  const context = React.useContext(KnockStateContext);
  if (context === undefined) {
    throw new Error("useFeedState must be used within a FeedProvider");
  }
  return context as KnockProviderState;
}

export { KnockProvider, useKnock };
