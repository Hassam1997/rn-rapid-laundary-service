import React, { Component, useState } from 'react';

import { StyleSheet, Platform, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from "react-redux";
import { getData } from '../actions/constant';
import { validateLogin, update, authUser } from "../actions/authAction";
import { getservice, getservicebyid } from '../actions/investigationActions';
import SplashScreen from 'react-native-splash-screen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './Login';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Explore from './Explore';
import Services from './Services';
import SubmitRequest from './SubmitRequest'
import MyCases from './MyCases'
import Profile from './Profile';
import EditProfile from './EditProfile'

const { width } = Dimensions.get('window');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};
const navigationOptions = {
  headerTransparent: true,
  headerTintColor: "#fff",
  headerTitle: "",
};
const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 90 : 50,
});

const AuthRoute = ({ navigation }) => {
  return (
    <Stack.Navigator
    initialRouteName='Login'
      screenOptions={
        screenOptionStyle
      }>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

const AuthRouteSignUp = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName='SignUpNew'
      screenOptions={
        screenOptionStyle
      }>
      <Stack.Screen name="SignUpNew" component={SignUp} />
    </Stack.Navigator>
  );
}

const StackHome = ({ navigation, props, back, route }) => {
  return (
    <HomeStack.Navigator
      initialRouteName='Explore'>
      <Tab.Screen name="Explore" component={Explore}
        options={{
          headerShown: false
        }} />
      <Tab.Screen name="SubmitRequest" component={SubmitRequest}
        options={{
          headerTitle: "",
          headerShown: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Back",
          headerTintColor: "black",
          headerBackTitleStyle: {
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
          },
          headerLeftContainerStyle: {
            marginTop: 10,
            left: (Platform.OS === 'ios') ? 18 : 8,
            alignItems: "center"
          },
          headerStyle: {
            backgroundColor: '#ECF5FD',
            height: styles.height,
            elevation: 0,
            shadowColor: 'transparent',
          },
        }}
      />

    </HomeStack.Navigator>
  );
}

const StackExplore = ({ navigation, props, route }) => {
  return (
    <ExploreStack.Navigator
      initialRouteName='MyCases'>
      <Tab.Screen name="MyCases" component={MyCases}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen name="Services" component={Services}
        options={{
          headerMode: 'float',
          headerTitle: "",
          headerShown: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Back",
          headerTintColor: "black",
          headerBackTitleStyle: {
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
          },
          headerLeftContainerStyle: {
            marginTop: 10,
            left: (Platform.OS === 'ios') ? 18 : 8,
            alignItems: "center"
          },
          headerStyle: {
            backgroundColor: '#ECF5FD',
            height: styles.height,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
    </ExploreStack.Navigator>
  );
}

const StackProfile = ({ navigation, props, route }) => {
  return (
    <ProfileStack.Navigator
      initialRouteName='Profile'>
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen name="EditProfile" component={EditProfile}
        options={{
          headerMode: 'float',
          headerTitle: "",
          headerShown: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Back",
          headerTintColor: "black",
          headerBackTitleStyle: {
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "black",
          },
          headerLeftContainerStyle: {
            marginTop: 10,
            left: (Platform.OS === 'ios') ? 18 : 8,
            alignItems: "center"
          },
          headerStyle: {
            backgroundColor: '#ECF5FD',
            height: styles.height,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}


function MyTabs({ props, navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="ExploreNew"
      screenOptions={{
        tabBarStyle: { position: 'absolute', overflow: "hidden", borderTopRightRadius: 20, borderTopLeftRadius: 20, height: (Platform.OS === 'ios') ? 80 : 60 },
        tabBarShowLabel: false
      }}>
      <Tab.Screen name="ExploreNew" component={StackHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarActiveTintColor: '#030171',
          tabBarInactiveTintColor: 'black',
        }} />
      <Tab.Screen name="MyCasesNew" component={StackExplore}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarActiveTintColor: '#030171',
          tabBarInactiveTintColor: 'black',
        }} />
      <Tab.Screen name="ProfileNew" component={StackProfile}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#030171',
          tabBarInactiveTintColor: 'black',
        }} />
    </Tab.Navigator>
  );
}


class ScreensInit extends Component {
  constructor(props) {
    super(props);
  }
  getUserAuthennticate = async () => {
    const userAuthenticates = await getData("userAuthenticates");
    if (userAuthenticates === "true") {
      const userType = await getData("userType");
      const authToken = await getData("authToken");
      const id = await getData("id");
      const user = await getData("user");
      const pic = await getData("pic")
      const authUserInit = {
        userType,
        authToken,
        userAuthenticates: true,
        id,
        user: JSON.parse(user),
        pic
      }
      this.props.authUser(authUserInit);
    }
  }

  componentDidMount() {
    this.getUserAuthennticate();
    this.props.validateLogin();
    setTimeout(() => {
      SplashScreen.hide()
    }, 3500);
  }


  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={
          screenOptionStyle
        }>
        {
          this.props.auth.userAuthenticates === true ?
            <Drawer.Screen name="Home" component={MyTabs}
              options={{ swipeEnabled: false, headerShown: false }} />
            :
            <Drawer.Screen name="Explore" component={AuthRoute}
              options={{ swipeEnabled: false }} />
        }
      </Drawer.Navigator>
    );

  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  validateLogin: () => dispatch(validateLogin()),
  update: (payload) => dispatch(update(payload)),
  authUser: payload => dispatch(authUser(payload)),
  getservice: (payload) => dispatch(getservice(payload)),
  getservicebyid: (payload) => dispatch(getservicebyid(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreensInit);