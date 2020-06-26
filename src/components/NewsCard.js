import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Text, Left, Right } from "native-base";
import moment from "moment";

import { WIDTH } from "../utils/Dimensions";

const NewsCard = (props) => {
  const { newsObj, navigate } = props;
  const { thumbnail, title, author, publishDate, _id } = newsObj;
  return (
    <TouchableOpacity
      key={_id}
      onPress={() => navigate("ViewNews", { newsObj })}
    >
      <Card>
        <CardItem>
          <Left>
            <Text>NDTV (Source)</Text>
          </Left>
          <Right>
            <Text>{author}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </CardItem>
        <CardItem>
          <Text>{title}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Text note>{moment(publishDate).fromNow()}</Text>
          </Left>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "95%",
  },
  image: {
    // width: WIDTH,
    width: "100%",

    height: 200,
    marginBottom: 10,
    alignSelf: "center",
  },
});
