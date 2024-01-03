import { FeedItem } from "@knocklabs/client";
import React, { MouseEvent, useCallback } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { useTranslations } from "../../hooks/useTranslations";
import { CloseCircle } from "../Icons";
import { useKnockFeed } from "../KnockFeedProvider";

export interface ArchiveButtonProps {
  item: FeedItem;
}

const ArchiveButton: React.FC<ArchiveButtonProps> = ({ item }) => {
  const { colorMode, feedClient } = useKnockFeed();
  const { t } = useTranslations();

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      feedClient.markAsArchived(item);
    },
    [item]
  );

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: "top-end" });

  return (
    <button
      ref={setTriggerRef}
      aria-label={t("archiveNotification")}
      onClick={onClick}
      type="button"
      className={`rnf-archive-notification-btn rnf-archive-notification-btn--${colorMode}`}
    >
      <CloseCircle />

      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: `rnf-tooltip rnf-tooltip--${colorMode}`,
          })}
        >
          {t("archiveNotification")}
        </div>
      )}
    </button>
  );
};

export { ArchiveButton };
