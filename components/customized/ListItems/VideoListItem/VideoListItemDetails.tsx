import { StyleSheet, Text, Pressable, Dimensions, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Stack, Checkmark, Button, IconStar } from "../../../core";
import { Product } from "../../../../models/product";
import { User } from "../../../../models/user";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { DisplayText } from "../../DisplayText/DisplayText";
import { FollowOutlinedButton } from "../../Buttons/FollowOutlinedButton";
import { VideoDetailsSkeleton } from "../../Skeletons/VideoDetailsSkeleton";

const { width } = Dimensions.get("window");
const { error } = theme.lightColors || {};
type IProps = {
  status: any;
  isLoading: boolean;
  product: Product;
  userDetails: User;
  bookable: boolean;
  description: string;
  onGoBack: () => void;
  onGoToCalendar: () => void;
  onShowProductSheet: () => void;
};

const VideoListItemDetails = ({
  isLoading,
  status,
  product,
  userDetails,
  bookable,
  description,
  onGoBack,
  onGoToCalendar,
  onShowProductSheet,
}: IProps) => {
  const { priceWithDiscount, option, discount } = product || {};
  const { username, checkmark, avatar, ratingsAverage, profession } =
    userDetails;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const details = (
    <Stack direction="row" sx={styles.content}>
      <Stack sx={{ flex: 1, width: "100%" }}>
        <Stack direction="row" align="start" sx={styles.userDetails}>
          <Stack direction="row">
            <Stack direction="row">
              <Stack align="start">
                <Stack direction="row">
                  <CustomAvatar avatar={avatar} size={20} />
                  <Text style={styles.username}>@{username}</Text>
                  {checkmark && <Checkmark />}
                </Stack>
                <Stack sx={styles.professionCont}>
                  <Stack direction="row">
                    <Text style={styles.profession}>{profession?.name}</Text>
                    <Stack direction="row">
                      <IconStar />
                      <Text style={styles.rating}>{ratingsAverage}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {bookable && (
            <Button
              title={t("book")}
              sxBtn={{ width: 120, opacity: 0.9, marginVertical: 0 }}
              onPress={onGoToCalendar}
            />
          )}
          {!bookable && <FollowOutlinedButton />}
        </Stack>
        <Pressable style={styles.descriptionContainer}>
          <Stack align="start">
            {description ? (
              <DisplayText maxWords={10} text={description} postType="video" />
            ) : (
              <Text style={styles.description}>...</Text>
            )}
          </Stack>
        </Pressable>
      </Stack>
    </Stack>
  );

  return (
    <Stack sx={StyleSheet.absoluteFill}>
      <Stack sx={{ width: "100%" }}>
        <Stack direction="row" sx={{ ...styles.header, marginTop: insets.top }}>
          <Pressable onPress={onGoBack} style={styles.back}>
            <Icon name="close" type="antdesign" size={26} color="white" />
          </Pressable>
          <Pressable style={styles.search}>
            <Icon name="search" type="feather" size={25} color="white" />
          </Pressable>
        </Stack>
      </Stack>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      >
        {isLoading ? <VideoDetailsSkeleton width={width} /> : details}
        <Stack
          direction="row"
          sx={{ paddingHorizontal: 15, marginVertical: 15 }}
        >
          {bookable && (
            <Pressable onPress={onShowProductSheet}>
              <Stack direction="row">
                <LinearGradient
                  colors={["rgba(51, 194, 255, 0.9)", "white"]}
                  start={{ x: 1.4, y: 0.75 }}
                  end={{ x: 1.75, y: 0.75 }}
                  style={styles.productContainer}
                >
                  <Text style={styles.product}>{product?.name}</Text>
                </LinearGradient>
                <Stack sx={{ marginLeft: 10 }}>
                  <Text style={styles.option}>{option?.name}</Text>
                </Stack>
                <Stack direction="row" sx={{ marginLeft: 10 }}>
                  <Text style={styles.price}>
                    {priceWithDiscount} {t("lei")}
                  </Text>
                  <Text style={styles.discount}>(-{discount}%)</Text>
                </Stack>
              </Stack>
            </Pressable>
          )}
          {!bookable && (
            <Stack direction="row">
              <Icon
                name="music"
                type="font-awesome-5"
                size={15}
                color="#f2f2f2"
              />
              <Text style={{ color: "#f2f2f2", fontSize: 13, marginLeft: 10 }}>
                Continut Original
              </Text>
            </Stack>
          )}
          <Pressable>
            <Image
              source={{ uri: userDetails?.avatar[0]?.url }}
              style={{
                width: 27.5,
                height: 27.5,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 5,
              }}
            />
          </Pressable>
        </Stack>
      </LinearGradient>
    </Stack>
  );
};

export default memo(VideoListItemDetails);

const styles = StyleSheet.create({
  header: { padding: 10, width: "100%" },
  back: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  search: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    width: "100%",
    padding: 15,
  },
  userDetails: {
    width: "100%",
    marginBottom: 7.5,
    height: 50,
  },
  username: {
    color: "#f2f2f2",
    fontWeight: "600",
    fontSize: 14.5,
    marginHorizontal: 5,
  },
  professionCont: {
    opacity: 0.9,
    borderRadius: 2.5,
    marginTop: 4,
  },
  profession: {
    fontWeight: "600",
    color: "white",
    fontSize: 14.5,
    marginRight: 5,
  },
  descriptionContainer: {
    width: "100%",
    paddingVertical: 1.5,
  },
  description: {
    color: "#f2f2f2",
    fontSize: 13.5,
  },
  productContainer: {
    paddingVertical: 4,
    paddingHorizontal: 7.5,
    borderRadius: 1,
  },
  product: {
    color: "white",
    marginLeft: 5,
    fontSize: 12.5,
  },
  rating: {
    marginLeft: 2.5,
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  option: { color: "white", fontWeight: "500" },
  price: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "lowercase",
  },
  discount: { fontSize: 12, marginLeft: 5, color: error },
});
