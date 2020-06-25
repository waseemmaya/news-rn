import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Container,
  Content,
  Body,
} from "native-base";
import moment from "moment";
import { WIDTH } from "../utils/Dimensions";

const ViewNews = (props) => {
  let { newsObj } = props.route.params;
  const { thumbnail, title, author, publishDate, description } = newsObj;
  console.log("description: ", description);
  console.log("publishDate: ", publishDate);
  console.log("author: ", author);
  console.log("title: ", title);
  //   if (!newsList) {
  //     return <Loader />;
  //   }

  return (
    <ScrollView>
      <Card style={styles.main}>
        <CardItem>
          <Left>
            <Text>NDTV (Source)</Text>
          </Left>
          <Right>
            <Text>{author}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text note>{moment(publishDate).fromNow()}</Text>
          </Left>
        </CardItem>
        <Body>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </Body>
        <CardItem>
          <Text>{title}</Text>
        </CardItem>

        <CardItem>
          <Left>
            <Text note>{description}</Text>
          </Left>
        </CardItem>
      </Card>
    </ScrollView>
  );
};

export default ViewNews;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  image: {
    width: WIDTH - 20,
    height: 200,
    // marginBottom: 10,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "center",
  },
});
