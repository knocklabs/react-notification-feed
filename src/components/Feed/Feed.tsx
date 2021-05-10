import { FeedItem } from "@knocklabs/client";
import React, { ReactNode, useEffect } from "react";
import EmptyFeed from "../EmptyFeed/EmptyFeed";
import { useKnockFeed } from "../FeedProvider/FeedProvider";
import Spinner from "../Spinner";
import MessageCell from "../MessageCell";
import MarkAsRead from "./MarkAsRead";
import { Header, Selector, Type, SpinnerContainer, Container } from "./styles";
import Dropdown from "./Dropdown";
import { FilterStatus } from "../../constants";

type RenderItemProps = { item: FeedItem };

type RenderItem = ({ item }: RenderItemProps) => ReactNode;

type Props = {
  EmptyComponent?: ReactNode;
  renderItem?: RenderItem;
  isVisible: boolean;
};

const defaultRenderItem = ({ item }: RenderItemProps) => (
  <MessageCell key={item.id} item={item} />
);

const Feed: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      EmptyComponent = <EmptyFeed />,
      renderItem = defaultRenderItem,
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

          {items.map((item: FeedItem) => renderItem({ item }))}
          {!loading && noItems && EmptyComponent}
        </Container>
      </>
    );
  }
);

export default Feed;
