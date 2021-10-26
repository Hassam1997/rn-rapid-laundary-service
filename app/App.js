/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import {
  createAppContainer,
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  createSwitchNavigator,

} from '@react-navigation/native';
// react-navigation

import { Provider } from "react-redux";
import store from "./store/store";


import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//import SplashScreen from './screens/SplashScreen';

// importing screens
import ScreensInit from './screens/ScreensInit';
import AwesomeAlert from 'react-native-awesome-alerts';

const App = () => {
  const [isAlert, setIsAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("Title");
  const [alertDece, setAlertDece] = React.useState("Decsiptions");


  const hideAlert = () => {
    setIsAlert(false)
  }

  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <ScreensInit />

          {
            isAlert === true
              ?
              <AwesomeAlert
                show={isAlert}
                showProgress={false}
                contentContainerStyle={{
                  width: "80%"
                }}
                title={alertTitle}
                titleStyle={{
                  fontSize: 30
                }}
                message={alertDece}
                messageStyle={{
                  fontSize: 20
                }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Close"
                confirmButtonStyle={{
                  width: "100%",
                  alignItems: "center"
                }}
                confirmButtonTextStyle={{
                  fontSize: 20
                }}
                confirmButtonColor={"green"}
                onCancelPressed={() => {
                  hideAlert();
                }}
                onConfirmPressed={() => {
                  hideAlert();
                }}
              />
              : null
          }
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>

  );
}

export default App;