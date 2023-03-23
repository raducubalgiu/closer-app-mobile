import {
  Animated,
  useWindowDimensions,
  View,
  Text,
  FlatList,
} from "react-native";
import { ForwardedRef, forwardRef, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import GridImageListItem from "../ListItems/Grid/GridImage/GridImageListItem";
import { NoFoundMessage } from "../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";

type IProps = {
  userId: string;
  isPrivate: boolean;
  isBlocked: boolean;
  sharedProps: any;
  panHandlers: any;
  onScroll: any;
};

const ProfilePostsTab = forwardRef(
  (props: IProps, ref: ForwardedRef<FlatList>) => {
    const { userId, isPrivate, isBlocked, sharedProps, panHandlers, onScroll } =
      props;
    const isFocused = useIsFocused();
    const { width, height } = useWindowDimensions();
    const { t } = useTranslation("common");

    const posts = [
      {
        product: {
          discount: 0,
          priceDiscount: 0,
        },
        images: [
          {
            url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-5_u0tbwr.jpg",
          },
        ],
        hashtags: [
          {
            id: "63530ffde4a33e300b11b20f",
            name: "serviceauto",
            _id: "63a6ec512810f6f79a89dc1c",
          },
        ],
        mentions: [],
        userId: {
          profession: {
            id: "62f7697c4330cc0bc58d1b55",
            name: "Service auto",
          },
          name: "Adexpert ITP",
          username: "adexpert_itp",
          avatar: [
            {
              url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
            },
          ],
          role: "admin",
          checkmark: false,
          ratingsAverage: 3.875,
          id: "62f7542568377907ef2103a3",
        },
        bookable: false,
        fixed: false,
        postType: "photo",
        orientation: "square",
        likesCount: 1,
        commentsCount: 0,
        bookmarksCount: 0,
        bookablesCount: 0,
        active: true,
        createdAt: "2022-12-24T12:10:57.599Z",
        updatedAt: "2023-03-08T11:15:15.453Z",
        viewsCount: 1,
        id: "63a6ec512810f6f79a89dc1b",
      },
      {
        product: {
          discount: 0,
          priceDiscount: 0,
        },
        images: [
          {
            url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-2_k05olk.jpg",
          },
        ],
        hashtags: [
          {
            id: "63530ffde4a33e300b11b20f",
            name: "serviceauto",
            _id: "63a6ec452810f6f79a89dc16",
          },
        ],
        mentions: [],
        userId: {
          profession: {
            id: "62f7697c4330cc0bc58d1b55",
            name: "Service auto",
          },
          name: "Adexpert ITP",
          username: "adexpert_itp",
          avatar: [
            {
              url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
            },
          ],
          role: "admin",
          checkmark: false,
          ratingsAverage: 3.875,
          id: "62f7542568377907ef2103a3",
        },
        bookable: false,
        fixed: false,
        postType: "photo",
        orientation: "square",
        likesCount: 0,
        commentsCount: 0,
        bookmarksCount: 0,
        bookablesCount: 0,
        active: true,
        createdAt: "2022-12-24T12:10:45.627Z",
        updatedAt: "2023-03-08T11:49:10.639Z",
        viewsCount: 1,
        id: "63a6ec452810f6f79a89dc15",
      },
      {
        product: {
          discount: 0,
          priceDiscount: 0,
        },
        images: [
          {
            url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-3_si1v25.jpg",
          },
        ],
        hashtags: [
          {
            id: "63530ffde4a33e300b11b20f",
            name: "serviceauto",
            _id: "63a6ec3d2810f6f79a89dc10",
          },
        ],
        mentions: [],
        userId: {
          profession: {
            id: "62f7697c4330cc0bc58d1b55",
            name: "Service auto",
          },
          name: "Adexpert ITP",
          username: "adexpert_itp",
          avatar: [
            {
              url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
            },
          ],
          role: "admin",
          checkmark: false,
          ratingsAverage: 3.875,
          id: "62f7542568377907ef2103a3",
        },
        bookable: false,
        fixed: false,
        postType: "photo",
        orientation: "square",
        likesCount: 0,
        commentsCount: 0,
        bookmarksCount: 0,
        bookablesCount: 0,
        active: true,
        createdAt: "2022-12-24T12:10:37.475Z",
        updatedAt: "2023-02-20T21:27:29.754Z",
        viewsCount: 1,
        id: "63a6ec3d2810f6f79a89dc0f",
      },
      {
        product: {
          discount: 0,
          priceDiscount: 0,
        },
        images: [
          {
            url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-4_rzpdqj.jpg",
          },
        ],
        hashtags: [
          {
            id: "63530ffde4a33e300b11b20f",
            name: "serviceauto",
            _id: "63a6ec352810f6f79a89dc0a",
          },
        ],
        mentions: [],
        userId: {
          profession: {
            id: "62f7697c4330cc0bc58d1b55",
            name: "Service auto",
          },
          name: "Adexpert ITP",
          username: "adexpert_itp",
          avatar: [
            {
              url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
            },
          ],
          role: "admin",
          checkmark: false,
          ratingsAverage: 3.875,
          id: "62f7542568377907ef2103a3",
        },
        bookable: false,
        fixed: false,
        postType: "photo",
        orientation: "square",
        likesCount: 0,
        commentsCount: 0,
        bookmarksCount: 0,
        bookablesCount: 0,
        active: true,
        createdAt: "2022-12-24T12:10:29.816Z",
        updatedAt: "2023-02-20T20:34:35.030Z",
        viewsCount: 0,
        id: "63a6ec352810f6f79a89dc09",
      },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-6_ifsucn.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec2e2810f6f79a89dc04",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:10:22.149Z",
      //   updatedAt: "2023-02-20T22:18:22.247Z",
      //   viewsCount: 1,
      //   id: "63a6ec2e2810f6f79a89dc03",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-11_yonoha.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec272810f6f79a89dbfe",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:10:15.204Z",
      //   updatedAt: "2023-02-20T20:34:35.030Z",
      //   viewsCount: 0,
      //   id: "63a6ec272810f6f79a89dbfd",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883694/adexpert-itp-14_jhjexu.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec1f2810f6f79a89dbf8",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:10:07.701Z",
      //   updatedAt: "2023-02-20T20:34:35.030Z",
      //   viewsCount: 0,
      //   id: "63a6ec1f2810f6f79a89dbf7",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883694/adexpert-itp-14_jhjexu.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec182810f6f79a89dbf2",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:10:00.969Z",
      //   updatedAt: "2023-02-20T21:38:07.141Z",
      //   viewsCount: 1,
      //   id: "63a6ec182810f6f79a89dbf1",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-9_zvf3uj.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec112810f6f79a89dbec",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:09:53.285Z",
      //   updatedAt: "2023-02-20T20:34:35.030Z",
      //   viewsCount: 0,
      //   id: "63a6ec112810f6f79a89dbeb",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-8_opnw2f.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec092810f6f79a89dbe6",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:09:45.781Z",
      //   updatedAt: "2023-02-20T20:34:35.030Z",
      //   viewsCount: 0,
      //   id: "63a6ec092810f6f79a89dbe5",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-7_fpmhko.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ec022810f6f79a89dbe0",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:09:38.876Z",
      //   updatedAt: "2023-02-20T20:34:35.030Z",
      //   viewsCount: 0,
      //   id: "63a6ec022810f6f79a89dbdf",
      // },
      // {
      //   product: {
      //     discount: 0,
      //     priceDiscount: 0,
      //   },
      //   images: [
      //     {
      //       url: "https://res.cloudinary.com/closer-app/image/upload/v1671883693/adexpert-itp-12_vxn44c.jpg",
      //     },
      //   ],
      //   hashtags: [
      //     {
      //       id: "63530ffde4a33e300b11b20f",
      //       name: "serviceauto",
      //       _id: "63a6ebf82810f6f79a89dbda",
      //     },
      //   ],
      //   mentions: [],
      //   userId: {
      //     profession: {
      //       id: "62f7697c4330cc0bc58d1b55",
      //       name: "Service auto",
      //     },
      //     name: "Adexpert ITP",
      //     username: "adexpert_itp",
      //     avatar: [
      //       {
      //         url: "https://res.cloudinary.com/closer-app/image/upload/v1669377115/adexpert-itp-logo_pnyr53.jpg",
      //       },
      //     ],
      //     role: "admin",
      //     checkmark: false,
      //     ratingsAverage: 3.875,
      //     id: "62f7542568377907ef2103a3",
      //   },
      //   bookable: false,
      //   fixed: false,
      //   postType: "photo",
      //   orientation: "square",
      //   likesCount: 0,
      //   commentsCount: 0,
      //   bookmarksCount: 0,
      //   bookablesCount: 0,
      //   active: true,
      //   createdAt: "2022-12-24T12:09:28.056Z",
      //   updatedAt: "2023-02-21T11:38:02.615Z",
      //   viewsCount: 1,
      //   id: "63a6ebf82810f6f79a89dbd9",
      // },
    ];

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
        <GridImageListItem
          index={index}
          post={item}
          posts={posts}
          expirationTime={item.expirationTime}
          discount={item?.product?.discount}
        />
      );
    }, []);

    let header;
    switch (true) {
      case isBlocked:
        header = (
          <NoFoundMessage
            iconProps={{ name: "eye-off" }}
            title={`${t("youHaveBlocked")} @raducubalgiu`}
            description={t("cannotSeeEachOtherContent")}
          />
        );
        break;
      case isPrivate:
        header = (
          <NoFoundMessage
            iconProps={{ name: "eye-off" }}
            title={t("thisAccountIsPrivate")}
            description={t("followThisAccountForSeeContent")}
          />
        );
        break;
      default:
        header = null;
    }

    return (
      <Animated.FlatList
        ref={ref}
        {...sharedProps}
        {...panHandlers}
        ListHeaderComponent={header}
        onScroll={isFocused ? onScroll : null}
        data={isPrivate || isBlocked ? [] : posts}
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
