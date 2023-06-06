import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE } from "@env";
import { Stack, Protected, IconStar } from "../../core";
import theme from "../../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useAuth } from "../../../hooks";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import { BookButton } from "../Buttons/BookButton";
import { UserListItemSimple } from "./User/UserListItemSimple";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Product } from "../../../ts";
import { gt } from "lodash";

const { black, grey0, primary, error } = theme.lightColors || {};

type IProps = {
  product: Product;
  ownerInfo: boolean;
  selectable?: boolean;
  onDeleteProduct?: () => void;
  onEditProduct?: () => void;
  onPress: () => void;
};

const ProductListItem = ({
  product,
  selectable = false,
  ownerInfo = false,
  onPress,
  onDeleteProduct,
  onEditProduct,
}: IProps) => {
  const { user: userContext } = useAuth();
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState(true);
  const { name, description, price, discount, priceWithDiscount } =
    product || {};
  const { option, ownerId } = product || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToOwner = () => {
    navigation.push("ProfileGeneral", {
      username: ownerId?.username,
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

  const onNavigate = () => {
    selectable
      ? setSelected((selected) => !selected)
      : navigation.navigate("Product", { id: product.id });
  };

  return (
    <Pressable onPress={onNavigate}>
      <Stack sx={styles.card} align="start">
        {ownerInfo && (
          <UserListItemSimple
            title={ownerId?.name}
            description={professionDescription}
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
              {!selectable && (
                <Protected
                  userRole={userContext?.role}
                  roles={[SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE]}
                >
                  <BookButton onPress={onPress} />
                </Protected>
              )}
              {selectable && (
                <View
                  style={{
                    borderColor: selected ? primary : "#ccc",
                    backgroundColor: selected ? primary : "white",
                    ...styles.select,
                  }}
                >
                  {selected && <Icon name="check" size={20} color="white" />}
                </View>
              )}
            </Stack>
            <Stack sx={{ marginVertical: 5 }}>
              <Text style={styles.description}>
                {trimFunc(description, 80)}
              </Text>
            </Stack>
            <Stack align="start" sx={{ marginTop: 15 }}>
              {gt(discount, 0) && (
                <Text style={styles.price}>
                  {price} {t("lei")}
                </Text>
              )}
              <Stack direction="row">
                <Text style={styles.priceWithDiscount}>
                  {priceWithDiscount} {t("lei")}
                </Text>
                {gt(discount, 0) && (
                  <Text style={styles.discount}>(-{discount}%)</Text>
                )}
              </Stack>
            </Stack>
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
    marginTop: 5,
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    color: black,
    fontWeight: "600",
    marginBottom: 2.5,
  },
  option: {
    color: primary,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  descriptionCont: { marginRight: 5, flex: 1 },
  description: {
    color: grey0,
    marginTop: 5,
    fontSize: 14,
  },
  price: {
    color: grey0,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textTransform: "lowercase",
  },
  priceWithDiscount: {
    color: black,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  discount: {
    marginLeft: 5,
    color: error,
    fontWeight: "600",
    fontSize: 13,
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
  select: { width: 25, height: 25, borderWidth: 1.5, borderRadius: 50 },
});
