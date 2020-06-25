import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Fab, Icon } from "native-base";
import Loader from "../components/Loader";
import NetworkError from "../components/NetworkError";
import NewsCard from "../components/NewsCard";

const Home = (props) => {
  const { newsList, error, getNews, isRefreshing } = props;

  if (error) {
    return <NetworkError error={error} />;
  }

  if (!newsList) {
    return <Loader />;
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={newsList}
        key="_id"
        keyExtractor={(v) => v._id}
        onRefresh={() => getNews(true)}
        refreshing={isRefreshing}
        renderItem={(obj) => {
          return (
            <NewsCard
              newsObj={obj.item}
              key={obj.item._id}
              {...props.navigation}
            />
          );
        }}
      />

      <Fab
        direction="up"
        style={{ backgroundColor: "black" }}
        position="bottomRight"
        onPress={() => {
          props.navigation.navigate("PostNews");
        }}
      >
        <Icon name="add" style={{ color: "white" }} />
      </Fab>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
