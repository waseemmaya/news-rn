import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import Loader from "../components/Loader";
import {
  Container,
  Textarea,
  Content,
  Form,
  Toast,
  Item,
  Text,
  Input,
  Label,
  Button,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { postNewsService } from "../services/news";

const PostNews = (props) => {
  const [pickedImage, setPickedImage] = useState(``);
  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(``);
  const [description, setDescription] = useState(``);
  const [posting, setPosting] = useState(false);

  async function _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setPickedImage(`data:image/png;base64,${result.base64}`);
      }
    } catch (E) {
      console.log("E: ", E);
    }
  }

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  async function handleSubmit() {
    if (
      title === "" ||
      description === "" ||
      author === "" ||
      pickedImage === ""
    ) {
      let msg = "Please fill all fileds";
      Toast.show({
        text: msg,
        buttonText: "Okay",
      });
      return;
    }
    let newsObj = {
      title,
      description,
      author,
      publishDate: new Date(),
      thumbnail: pickedImage,
    };

    try {
      setPosting(true);
      let postRes = await postNewsService(newsObj);
      setPosting(false);
      props.getNews(true);
      props.navigation.navigate("Home");
    } catch (error) {
      setPosting(false);
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getPermissionAsync();
    return () => {
      setPickedImage("");
    };
  }, []);

  if (posting) {
    return <Loader />;
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input value={title} onChangeText={(e) => setTitle(e)} />
          </Item>
          <Item stackedLabel>
            <Label>Author</Label>
            <Input value={author} onChangeText={(e) => setAuthor(e)} />
          </Item>
          <Textarea
            onChangeText={(e) => setDescription(e)}
            rowSpan={3}
            value={description}
            bordered
            placeholder="Description"
          />
          <Button info style={styles.btn1} onPress={_pickImage}>
            <Text> Select Image </Text>
          </Button>
          <View style={styles.imgView}>
            {pickedImage !== "" && (
              <Image
                style={styles.imgStyle}
                source={{
                  uri: pickedImage,
                }}
              />
            )}
          </View>
          <Button style={styles.btn2} onPress={handleSubmit}>
            <Text> Submit </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default PostNews;

const styles = StyleSheet.create({
  btn1: {
    marginTop: 20,
    width: 140,
    alignSelf: "center",
  },
  btn2: {
    marginTop: 20,
    width: 90,
    alignSelf: "center",
  },
  imgView: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyle: {
    width: 200,
    height: 200,
  },
});
