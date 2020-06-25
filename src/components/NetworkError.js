import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NetworkError = ({ error }) => {
  const { message } = error;
  return (
    <View style={styles.main}>
      <Text>{message}</Text>
      {/* <Text>Network Error</Text> */}
      {/* <Text>{JSON.stringify(error.message, 2, null)}</Text> */}
    </View>
  );
};

export default NetworkError;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
