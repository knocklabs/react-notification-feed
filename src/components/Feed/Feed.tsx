import { FeedItem } from "@knocklabs/client";
import React, { ReactElement, useEffect } from "react";
import EmptyFeed from "../EmptyFeed/EmptyFeed";
import { useFeedProviderState } from "../FeedProvider/FeedProvider";
import Spinner from "../Spinner";
import MessageCell from "../MessageCell";
import MarkAsRead from "./MarkAsRead";
import { Header, Selector, Type, SpinnerContainer } from "./styles";
import Dropdown from "./Dropdown";
import { FilterStatus } from "../../constants";

type RenderItemProps = { item: FeedItem };

type RenderItem = ({ item }: RenderItemProps) => ReactElement;

type Props = {
  EmptyComponent?: ReactElement;
  renderItem?: RenderItem;
};

const defaultRenderItem = ({ item }: RenderItemProps) => (
  <MessageCell key={item.id} item={item} />
);

const Feed: React.FC<Props> = ({
  EmptyComponent = <EmptyFeed />,
  renderItem = defaultRenderItem,
}) => {
  const {
    status,
    setStatus,
    feedClient,
    useFeedStore,
  } = useFeedProviderState();
  const { items, loading } = useFeedStore();
  const noItems = items.length === 0;

  useEffect(() => {
    // Mark everything as seen on load
    const unseenItems = items.filter((item: FeedItem) => !item.seen_at);

    if (unseenItems.length > 0) {
      feedClient.markAsSeen(items);
    }
  }, []);

  return (
    <>
      <Header>
        <Selector>
          <Type>Notifications</Type>
          <Dropdown value={status} onChange={(e) => setStatus(e.target.value)}>
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

      {loading && (
        <SpinnerContainer>
          <Spinner thickness={3} size="16px" />
        </SpinnerContainer>
      )}

      {!loading && items.map((item: FeedItem) => renderItem({ item }))}
      {!loading && noItems && EmptyComponent}
    </>
  );
};

export default Feed;
