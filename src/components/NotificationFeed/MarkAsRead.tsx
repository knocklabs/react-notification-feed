import * as React from "react";
import { FeedItem } from "@knocklabs/client";
import { useKnockFeed } from "../KnockFeedProvider";
import { CheckmarkCircle } from "../Icons";
import { useTranslations } from "../../hooks/useTranslations";

import "./styles.css";

export type MarkAsReadProps = {
  onClick?: (e: React.MouseEvent, unreadItems: FeedItem[]) => void;
};

export const MarkAsRead: React.FC<MarkAsReadProps> = ({ onClick }) => {
  const { useFeedStore, feedClient, colorMode } = useKnockFeed();
  const { t } = useTranslations();

  const unreadItems = useFeedStore((state) =>
    state.items.filter((item) => !item.read_at)
  );

  const unreadCount = useFeedStore((state) => state.metadata.unread_count);

  const onClickHandler = React.useCallback(
    (e: React.MouseEvent) => {
      feedClient.markAllAsRead();
      if (onClick) onClick(e, unreadItems);
    },
    [feedClient, unreadItems, onClick]
  );

  return (
    <button
      className={`rnf-mark-all-as-read rnf-mark-all-as-read--${colorMode}`}
      disabled={unreadCount === 0}
      onClick={onClickHandler}
      type="button"
      aria-label={t("markAllAsRead")}
    >
      {t("markAllAsRead")}
      <CheckmarkCircle />
    </button>
  );
};
