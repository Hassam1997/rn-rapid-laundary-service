/**
 * essential imports
 */
 import React from 'react';
 import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, TextInput, ScrollView } from 'react-native';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 import { color } from '../theme/color';
 /**
  * ui imports
  */
 import Logo from '../assets/logo.svg';
 /**
  * 
  * @returns componets
  */
 import Button from '../components/Buttons';
 /**
  * function jsx
  */
 function SignUp(props) {
     return (
         <ScrollView style={styles.container} contentContainerStyle={styles.ScrollContainer}>
             <View style={styles.LogoContainer}>
                 <Logo />
             </View>
             <View style={styles.TextInputContainer}>
                 <TextInput
                     placeholderTextColor={color.palette.blue}
                     placeholder="Email"
                     keyboardType='email-address'
                     style={styles.TextInputStyle}
                 />
                 <TextInput
                     placeholderTextColor={color.palette.blue}
                     placeholder="Password"
                     secureTextEntry={true}
                     style={styles.TextInputStyle}
                 />
             </View>
             <View style={styles.ButtonContainer}>
                 <TouchableOpacity onPress={() => { props.navigation.navigate("SignIn") }}>
                     <Button text={"Login"} />
                 </TouchableOpacity>
                 <Text style={styles.TextStyle}>Create Account: <Text style={styles.SubTextStyle}>Signup</Text>.</Text>
                 <Text style={styles.TextStyle}>By clicking an account you agree to <Text style={styles.SubTextStyle}>Terms Conditions</Text> and <Text style={styles.SubTextStyle}>Privacy Policy</Text>.</Text>
             </View>
         </ScrollView>
     )
 };
 export default SignUp;
 /**
  * style sheet
  */
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: color.background
     },
     ScrollContainer: {
         flexGrow: 1,
         justifyContent: "space-between"
     },
     LogoContainer: {
         alignItems: "center",
         justifyContent: "flex-start",
         paddingTop: 20
     },
     TextInputContainer: {
         flex: 3,
         alignItems: "center",
         justifyContent: "center",
         paddingBottom:100
     },
     ButtonContainer: {
         flex: 0.75,
         alignItems: "center",
         justifyContent: "space-evenly"
     },
     TextStyle: {
         color: color.palette.black,
         fontFamily: "Poppins-Regular",
         fontSize: 13,
         textAlign: "center",
         width: 300
     },
     SubTextStyle: {
         color: color.palette.blue,
         textDecorationLine: "underline",
     },
     TextInputStyle: {
         width: wp('90%'),
         fontSize: 15,
         fontFamily: "Poppins-Regular",
         color: color.primary,
         paddingLeft: 20,
         backgroundColor: color.primaryLighter,
         height: 57,
         borderRadius: 10,
         marginVertical:10
     }
 });