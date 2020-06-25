import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { getNewsService, postNewsService } from "../services/news";
import PostNews from "./PostNews";
import ViewNews from "./ViewNews";

const Stack = createStackNavigator();

const Routes = () => {
  const [newsList, setNewsList] = useState(null);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getNews(refresh) {
    try {
      if (refresh) {
        setIsRefreshing(true);
      }
      let newsRes = await getNewsService();
      let { news } = newsRes.data;
      setNewsList(news);
      setIsRefreshing(false);
    } catch (err) {
      console.log("err: ", err);
      setError(err);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    getNews(false);
    // postNewsService({ test: "post new news" });
    return () => {
      setNewsList(null);
      setError(null);
    };
  }, []);

  let homeProps = {
    newsList,
    error,
    isRefreshing,
    getNews: getNews,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(navProps) => <Home {...navProps} {...homeProps} />}
        </Stack.Screen>
        <Stack.Screen name="PostNews">
          {(navProps) => <PostNews {...navProps} getNews={getNews} />}
        </Stack.Screen>
        <Stack.Screen name="ViewNews">
          {(navProps) => <ViewNews {...navProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
