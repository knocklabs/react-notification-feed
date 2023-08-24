import React, { SetStateAction } from "react";
import { FeedItem } from "@knocklabs/client";

import { FilterStatus } from "../../constants";
import { useTranslations } from "../../hooks/useTranslations";
import { Dropdown } from "./Dropdown";
import { MarkAsRead } from "./MarkAsRead";

export type NotificationFeedHeaderProps = {
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<SetStateAction<FilterStatus>>;
  onMarkAllAsReadClick: (e: React.MouseEvent, unreadItems: FeedItem[]) => void;
};

const OrderedFilterStatuses = [
  FilterStatus.All,
  FilterStatus.Unread,
  FilterStatus.Read,
];

export const NotificationFeedHeader: React.FC<NotificationFeedHeaderProps> = ({
  onMarkAllAsReadClick,
  filterStatus,
  setFilterStatus,
}) => {
  const { t } = useTranslations();

  return (
    <header className="rnf-notification-feed__header">
      <div className="rnf-notification-feed__selector">
        <span className="rnf-notification-feed__type">
          {t("notifications")}
        </span>
        <Dropdown
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {OrderedFilterStatuses.map((filterStatus) => (
            <option key={filterStatus} value={filterStatus}>
              {t(filterStatus)}
            </option>
          ))}
        </Dropdown>
      </div>
      <MarkAsRead onClick={onMarkAllAsReadClick} />
    </header>
  );
};
