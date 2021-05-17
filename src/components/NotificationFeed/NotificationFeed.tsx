import { FeedItem } from "@knocklabs/client";
import React, { ReactNode, useEffect } from "react";
import EmptyFeed from "../EmptyFeed/EmptyFeed";
import { useKnockFeed } from "../FeedProvider/FeedProvider";
import Spinner from "../Spinner";
import NotificationCell from "../NotificationCell";
import MarkAsRead from "./MarkAsRead";
import { Header, Selector, Type, SpinnerContainer, Container } from "./styles";
import Dropdown from "./Dropdown";
import { FilterStatus } from "../../constants";

export type OnNotificationClick = (item: FeedItem) => void;
export type RenderItem = ({ item }: RenderItemProps) => ReactNode;
export type RenderItemProps = {
  item: FeedItem;
  onItemClick?: OnNotificationClick;
};

export type Props = {
  EmptyComponent?: ReactNode;
  renderItem?: RenderItem;
  onNotificationClick?: OnNotificationClick;
  isVisible: boolean;
};

const defaultRenderItem = (props: RenderItemProps) => (
  <NotificationCell key={props.item.id} {...props} />
);

const NotificationFeed: React.FC<Props> = React.forwardRef<
  HTMLDivElement,
  Props
>(
  (
    {
      EmptyComponent = <EmptyFeed />,
      renderItem = defaultRenderItem,
      onNotificationClick,
      isVisible = false,
    },
    ref
  ) => {
    const { status, setStatus, feedClient, useFeedStore } = useKnockFeed();
    const items = useFeedStore((state) => state.items);
    const unseenItems = useFeedStore((state) =>
      state.items.filter((item) => !item.seen_at)
    );
    const loading = useFeedStore((state) => state.loading);
    const noItems = items.length === 0;

    useEffect(() => {
      if (isVisible) {
        feedClient.markAsSeen(unseenItems);
      }
    }, [isVisible]);

    return (
      <>
        <Header>
          <Selector>
            <Type>Notifications</Type>
            <Dropdown
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {[FilterStatus.All, FilterStatus.Unread, FilterStatus.Unseen].map(
                (state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                )
              )}
            </Dropdown>
          </Selector>
          <MarkAsRead />
        </Header>
        <Container ref={ref}>
          {loading && (
            <SpinnerContainer>
              <Spinner thickness={3} size="16px" />
            </SpinnerContainer>
          )}

          {!loading &&
            items.map((item: FeedItem) =>
              renderItem({ item, onItemClick: onNotificationClick })
            )}

          {!loading && noItems && EmptyComponent}
        </Container>
      </>
    );
  }
);

export default NotificationFeed;
