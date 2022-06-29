import React, { useMemo } from "react";
import Knock, { KnockOptions } from "@knocklabs/client";

function useAuthenticatedKnockClient(
  apiKey: string,
  userId: string,
  userToken: string | undefined,
  options: KnockOptions = {}
) {
  const knockRef = React.useRef<Knock | null>();

  return useMemo(() => {
    if (knockRef.current) knockRef.current.teardown();

    const knock = new Knock(apiKey, options);
    knock.authenticate(userId, userToken);
    knockRef.current = knock;

    return knock;
  }, [apiKey, userId, userToken]);
}

export default useAuthenticatedKnockClient;
