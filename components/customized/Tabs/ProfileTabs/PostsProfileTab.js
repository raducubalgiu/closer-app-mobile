import { StyleSheet, View, Dimensions, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGet } from "../../../../hooks";
import { Col, Row, Grid } from "react-native-easy-grid";
import { GridRow } from "../../Grid/GridRow";
import { GridColumn } from "../../Grid/GridColumn";
import { contains } from "lodash";

const { height, width } = Dimensions.get("window");

export const PostsProfileTab = ({ userId }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGet({ uri: `/users/${userId}/posts` });

  const goToPosts = (item) =>
    navigation.navigate("Post", {
      postId: item._id,
      userId: item.user._id,
    });

  const noFoundMessage = (
    <NoFoundMessage
      sx={{ marginTop: 50 }}
      title={t("posts")}
      description={t("noFoundPosts")}
    />
  );

  const CONTAINER_ROW_HEIGHT = 250;
  const COLUMN_HEIGHT = 200;

  const DUMMY_POSTS = [
    {
      _id: "1",
      posts: {
        firstCol: [
          { _id: "1", orientation: "square" },
          { _id: "2", orientation: "square" },
          { _id: "3", orientation: "square" },
          { _id: "4", orientation: "landscape" },
          { _id: "5", orientation: "square" },
          { _id: "6", orientation: "square" },
        ],
        secondCol: [
          { _id: "1", orientation: "square" },
          { _id: "2", orientation: "square" },
          { _id: "3", orientation: "square" },
          { _id: "4", orientation: "square" },
          { _id: "5", orientation: "square" },
          { _id: "6", orientation: "square" },
        ],
      },
    },
  ];

  return (
    // <>
    //   <View style={styles.container}>
    //     {!isLoading &&
    //       !isFetching &&
    //       posts?.map((item, i) => (
    //         <CardPostImage
    //           onPress={() => goToPosts(item)}
    //           key={i}
    //           index={i}
    //           image={item?.images[0]?.url}
    //           bookable={item?.bookable}
    //           fixed={item?.fixed}
    //           postType={item?.postType}
    //         />
    //       ))}
    //   </View>
    // </>
    <>
      <Grid>
        <Row style={{ height: 250 }}>
          <Col style={{ width: width / 3 }}>
            <Row style={{ height: 250 }}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/closer-app/image/upload/v1667465351/mariano-di-vaio_pzheb1.webp",
                }}
              />
            </Row>
          </Col>
          <Col style={{ width: width / 1.5 }}>
            <Row style={{ height: 125 }}>
              <Col style={{ width: width / 3, height: 125 }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1667548703/rowanrow-1_qpgnus.jpg",
                  }}
                />
              </Col>
              <Col
                style={{
                  width: width / 3,
                  height: 125,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1658163106/360_F_343454374_nYZNRpATXT9v1QbECLe4ZRPZA82wP2f2_z98obz.jpg",
                  }}
                />
              </Col>
            </Row>
            <Row style={{ height: 125, width: width / 1.5 }}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/closer-app/image/upload/v1659043834/PTQ0MCZoYXNoPTUwMjc3YTU4ZjJiYWRmMDA0YmZiNWVmNGJlM2U5Njcy.thumb_b7ippf.jpg",
                }}
              />
            </Row>
          </Col>
        </Row>
        <Row style={{ height: 250 }}>
          <Col style={{ width: width / 1.5 }}>
            <Row style={{ height: 125 }}>
              <Col
                style={{
                  width: width / 3,
                  height: 125,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1648680388/avatar-raducu_uykjxt.jpg",
                  }}
                />
              </Col>
              <Col style={{ width: width / 3, height: 125 }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1648030832/ngzcbg7pi00zo5hmqx2p.jpg",
                  }}
                />
              </Col>
            </Row>
            <Row style={{ height: 125, width: width / 1.5 }}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/closer-app/image/upload/v1667549586/florin-bratu-1_rggozs.jpg",
                }}
              />
            </Row>
          </Col>
          <Col style={{ width: width / 3 }}>
            <Row style={{ height: 250 }}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/closer-app/image/upload/v1653305979/271495987_248616097346960_7263252094376676454_n_padskn.jpg",
                }}
              />
            </Row>
          </Col>
        </Row>
        <Row style={{ height: 250 }}>
          <Col style={{ width: width / 1.5 }}>
            <Row style={{ height: 125 }}>
              <Col
                style={{
                  width: width / 3,
                  height: 125,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1667497964/ovidiu-cimpan-avatar_npn0jx.jpg",
                  }}
                />
              </Col>
              <Col style={{ width: width / 3, height: 125 }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1667480584/fresh-salon-1_ukvyux.jpg",
                  }}
                />
              </Col>
            </Row>
            <Row style={{ height: 125 }}>
              <Col
                style={{
                  width: width / 3,
                  height: 125,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1667552874/guardiola-1_zbxma4.jpg",
                  }}
                />
              </Col>
              <Col style={{ width: width / 3, height: 125 }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://res.cloudinary.com/closer-app/image/upload/v1667549749/marina-filimon-avatar_n6aiua.jpg",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col style={{ width: width / 3 }}>
            <Row style={{ height: 250 }}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/closer-app/image/upload/v1667475739/quaresma-avatar_hyxlzw.jpg",
                }}
              />
            </Row>
          </Col>
        </Row>
      </Grid>
      {/* <GridRow>
        <GridColumn landscape />
        <GridColumn />
      </GridRow> */}
      {/* <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <GridRow>
            <GridColumn landscape={true}></GridColumn>
            <GridColumn landscape={false}></GridColumn>
          </GridRow>
        )}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    flex: 1,
    margin: 1,
  },
});
