import React, { Component, useEffect, useState } from 'react';

import { StyleSheet, Platform, View, Button, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from "react-redux";
import { getData } from '../actions/constant';
import { validateLogin, update, authUser, login } from "../actions/authAction";
import { getservice, getservicebyid } from '../actions/investigationActions';
import SplashScreen from 'react-native-splash-screen';
import { color } from '../theme/color';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Back from '../assets/back.svg';

import Login from './Login';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CurrentLocation from './CurrentLocation';
import UserAddress from './UserAddress';
import PickUpLocation from './PickUpLocation';
import Explore from './Explore';
import CustomizeOrder from './CustomizeOrder';
import ScheduleOrder from './ScheduleOrder';
import SubmitRequest from './SubmitRequest'
import MyCases from './MyCases'
import Profile from './Profile';
import EditProfile from './EditProfile'
import PickUpConfirm from './PickUpConfirm';
import WashAndFold from './WashAndFold';
import Account from './Account';
import Pricing from './Pricing';
import Promotion from './Promotion';
import Order from './Order';
import Plans from './Plans';
import Notification from './Notification';
import Map from './Map';
import editScreen from './editScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  // useEffect (()=>{
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // },[])

  // if(isLoading){
  //   return(
  //     <View style={{flex:1 , alignItems:'center', justifyContent:'center'}}>
  //       <ActivityIndicator size={'large'}/>
  //     </View>
  //   )
  // }
  const [isLoggin, setIsLoggin] = useState(false)

  useEffect(async () => {

    const token = await AsyncStorage.getItem('Token')
    if (token) {
      setIsLoggin(true)
    } else {
      setIsLoggin(false)
    }



  }, [])

  // if (isLoggin == true) {
  //   navigation.navigate('Home')
  // } else {
  //   // navigation.navigate('beforeHome')
  // }


  return (


    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={
        screenOptionStyle
      }>

      {
        isLoggin == true ? (

          <Stack.Screen name="Exp" component={MyTabs}
            options={{
              headerShown: false
            }} />
        ) : (






          <Stack.Screen name="beforeHome" component={beforeHome} />
        )
      }

      {/* <Stack.Screen name="Exp" component={MyTabs}
        options={{
          headerShown: false
        }} />

      <Stack.Screen name="beforeHome" component={beforeHome} />
      <Stack.Screen name="StackHome" component={StackHome} /> */}



    </Stack.Navigator>


  )

}

const beforeHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
      <Stack.Screen name="Map" component={Map}
        options={{
          headerMode: 'float',
          headerTitle: "Map",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="PickUpLocation" component={PickUpLocation} />
      <Stack.Screen name="UserAddress" component={UserAddress} />
    </Stack.Navigator>
  )
}



const StackHome = ({ navigation, props, back, route }) => {
  return (
    <HomeStack.Navigator

      initialRouteName='Explore'>
      <Tab.Screen name='Home' component={MyTabs} />
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
      <Tab.Screen name="CustomizeOrder" component={CustomizeOrder}
        options={{
          headerMode: 'float',
          headerTitle: "Customize Order",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
      <Tab.Screen name="ScheduleOrder" component={ScheduleOrder}
        options={{
          headerMode: 'float',
          headerTitle: "Schedule",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerRight: () =>
            <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={{ paddingRight: 15 }}>
              <Image source={require('../assets/Icon.png')} />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }} />

      <Tab.Screen name='PickUp' component={PickUpConfirm}
        options={{
          headerMode: 'float',
          headerTitle: "Pickup",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />

      <Tab.Screen name="Plans" component={Plans}
        options={{
          headerMode: 'float',
          headerTitle: "Unlock Unlimited",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
      <Tab.Screen name="Edit" component={editScreen}
        options={{
          headerMode: 'float',
          headerTitle: "",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
      <Tab.Screen name="Wash" component={WashAndFold}
        options={{
          headerMode: 'float',
          headerTitle: "Wash&Fold",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,

          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />
      <Tab.Screen name="Notification" component={Notification}
        options={{
          headerMode: 'float',
          headerTitle: "Notification",
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () =>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Back />
            </TouchableOpacity>,



          headerLeftContainerStyle: {
            marginTop: 15,
            left: 15,

          },
          headerStyle: {
            backgroundColor: color.palette.white,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      />



    </HomeStack.Navigator>
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
          headerShown: false,
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
        tabBarStyle: { height: (Platform.OS === 'ios') ? 80 : 60, backgroundColor: color.primary },
        lazy: true
      }}>
      <Tab.Screen name="ExploreNew" component={StackHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" color={color} size={size} />
          ),
          tabBarLabel: 'orders',
          tabBarIconStyle: {
            top: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Regular",
            marginBottom: 10,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
        }} />
      <Tab.Screen name="Account" component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarLabel: 'Account',
          tabBarIconStyle: {
            top: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Regular",
            marginBottom: 10,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
        }} />
      <Tab.Screen name="Pricing" component={Pricing}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dollar" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Regular",
            marginBottom: 10,
          },
          tabBarLabel: 'Pricing',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
        }} />
      <Tab.Screen name="Promotion" component={Promotion}
        options={{
          tabBarVisible: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Regular",
            marginBottom: 10,
          },
          tabBarLabel: 'Promotion',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
        }} />
      <Tab.Screen name="Order" component={Order}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" color={color} size={size} />
          ),
          tabBarIconStyle: {
            top: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Regular",
            marginBottom: 10,
          },
          tabBarLabel: 'Help',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
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