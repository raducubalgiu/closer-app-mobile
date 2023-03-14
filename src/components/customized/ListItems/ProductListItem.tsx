import { Pressable, StyleSheet, Text } from "react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE } from "@env";
import { Stack, Protected, IconStar } from "../../core";
import theme from "../../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useAuth, useDuration } from "../../../hooks";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import { BookButton } from "../Buttons/BookButton";
import { UserListItemSimple } from "./UserListItemSimple";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Product } from "../../../models/product";

const { black, grey0, primary } = theme.lightColors || {};

type IProps = {
  product: Product;
  ownerInfo: boolean;
  onDeleteProduct: () => void;
  onEditProduct: () => void;
};

const ProductListItem = ({
  product,
  ownerInfo = false,
  onDeleteProduct,
  onEditProduct,
}: IProps) => {
  const { user: userContext } = useAuth();
  const { t } = useTranslation("common");
  const { name, duration, description, price } = product || {};
  const { option, serviceId, ownerId } = product || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToCalendar = () => {
    navigation.navigate("CalendarBig", {
      product: product,
      serviceId,
    });
  };

  const goToOwner = () => {
    navigation.push("ProfileGeneral", {
      userId: ownerId.id,
      username: ownerId?.username,
      avatar: ownerId?.avatar,
      name: ownerId?.name,
      checkmark: ownerId?.checkmark,
      service: null,
      option: null,
    });
  };

  const professionDescription = (
    <Stack direction="row" sx={{ marginTop: 2.5 }}>
      <Text style={{ color: grey0, marginRight: 5, fontWeight: "500" }}>
        {ownerId?.profession.name}
      </Text>
      <IconStar />
      <Text
        style={{
          color: black,
          fontWeight: "700",
          marginLeft: 2.5,
          fontSize: 13,
        }}
      >
        {ownerId?.ratingsAverage}
      </Text>
    </Stack>
  );

  return (
    <Pressable
      onPress={() => navigation.navigate("Product", { id: product.id })}
    >
      <Stack sx={styles.card} align="start">
        {ownerInfo && (
          <UserListItemSimple
            name={ownerId?.name}
            profession={professionDescription}
            avatar={ownerId?.avatar}
            checkmark={ownerId?.checkmark}
            onGoToUser={goToOwner}
            sx={{ marginBottom: 20 }}
          />
        )}
        <Stack direction="row" align="start">
          <Stack align="start" sx={styles.descriptionCont}>
            <Stack direction="row" align="start" sx={{ width: "100%" }}>
              <Stack align="start" sx={{ flex: 1 }}>
                <Text style={styles.name}>{name} </Text>
                <Text style={styles.option}>{option?.name}</Text>
              </Stack>
              <Protected
                userRole={userContext?.role}
                roles={[SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE]}
              >
                <BookButton onPress={goToCalendar} />
              </Protected>
            </Stack>
            <Stack sx={{ marginVertical: 5 }}>
              <Text style={styles.description}>
                {trimFunc(description, 80)}
              </Text>
            </Stack>
            <Text style={styles.price}>
              {price} {t("ron")}
            </Text>
          </Stack>
        </Stack>
        <Protected
          userRole={userContext?.role}
          roles={[SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE]}
        >
          <Stack align="end" sx={styles.bookmark}>
            <BookmarkButton
              type="products"
              typeId={product?.id}
              onBookmarksCount={() => {}}
            />
          </Stack>
        </Protected>
      </Stack>
    </Pressable>
  );
};

export default memo(ProductListItem);

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 10,
  },
  name: {
    fontSize: 17,
    color: black,
    fontWeight: "600",
    marginBottom: 2.5,
  },
  option: {
    color: primary,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 10,
  },
  descriptionCont: { marginRight: 5, flex: 1 },
  description: {
    color: grey0,
    marginTop: 5,
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    color: black,
    fontWeight: "700",
    marginTop: 5,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: primary,
  },
  buttonText: {
    color: black,
  },
  bookmark: {
    width: "100%",
    marginTop: 10,
  },
});
