/*
Created by Gurtej Singh
Date:24 June 2019
This is start point of project and intialized all basic things here
*/
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/config/routes";
import { addListeners } from "./src/utilities/listeners";
import { Provider } from "react-redux";
import setup from "./src/store/setup";
import SplashScreen from 'react-native-splash-screen'

Navigation.events().registerAppLaunchedListener(() => {
  SplashScreen.hide();
  const store = setup();
  registerScreens(store, Provider);
  addListeners();
 
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true
    },
    bottomTabs: {
      visible: false,
      drawBehind: true
    }
  });
  Navigation.setRoot({
    root: {
      component: {
        name: "Loader"
      }
    }
  });
});
