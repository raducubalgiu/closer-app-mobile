import {
  Animated,
  useWindowDimensions,
  View,
  Text,
  FlatList,
} from "react-native";
import { ForwardedRef, forwardRef, useCallback } from "react";
import { useGetPaginate } from "../../../hooks";
import { useIsFocused } from "@react-navigation/native";
import { usePaginateActions } from "../../../hooks";
import GridImageListItem from "../ListItems/Grid/GridImage/GridImageListItem";

type IProps = {
  userId: string;
  sharedProps: any;
  panHandlers: any;
  onScroll: any;
};

const ProfilePostsTab = forwardRef(
  (props: IProps, ref: ForwardedRef<FlatList>) => {
    const { userId, sharedProps, panHandlers, onScroll } = props;
    const isFocused = useIsFocused();
    const { width, height } = useWindowDimensions();

    const posts = Array(40).fill(0);

    // const options = useGetPaginate({
    //   model: "posts",
    //   uri: `/users/${props.userId}/posts`,
    //   limit: "24",
    //   queries: "postType=photo",
    // });

    // const { isLoading, isFetching, isFetchingNextPage } = options;
    // const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

    const renderPost = useCallback(({ item, index }: any) => {
      return (
        // <GridImageListItem
        //   index={index}
        //   post={item}
        //   posts={posts}
        //   expirationTime={item.expirationTime}
        //   discount={item?.product?.discount}
        // />
        <View
          style={{
            width: width / 3,
            height: width / 3,
            marginLeft: index % 3 ? 1.25 : 0,
            marginBottom: 1.25,
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{index}</Text>
          </View>
        </View>
      );
    }, []);

    return (
      <Animated.FlatList
        ref={ref}
        {...sharedProps}
        {...panHandlers}
        onScroll={isFocused ? onScroll : null}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
      />
    );
  }
);

export default ProfilePostsTab;
