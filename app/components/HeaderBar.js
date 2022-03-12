// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Text, Image, ScrollView } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Notifications from '../assets/notifications-outline.svg';
// import Message from '../assets/message-circle.svg';
// import { useNavigation } from '@react-navigation/native';


// const HeaderBar = (props) => {
//     const [isShow, isSetShow] = useState(true)
//     const navigation = useNavigation();
//     console.log("Y", props.title)
//     return (
//         <>
//             <View style={{
//                 width: wp("86%"),
//                 alignSelf: "center",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: "row",
//                 backgroundColor: "white"
//             }}>
//                 <View>
//                     <Text style={{
//                         fontSize: 25,
//                         fontFamily: "Poppins-SemiBold",
//                         color: "black",
//                     }}>{
//                             props.title === "Explore" ?
//                                 <Text>Home</Text>
//                                 :
//                                 props.title
//                         }</Text>
//                 </View>
//                 <View style={{
//                     width: 140,
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     flexDirection: "row"
//                 }}>
//                     <TouchableWithoutFeedback>
//                         <Message />
//                     </TouchableWithoutFeedback>
//                     <TouchableWithoutFeedback>
//                         <Notifications />
//                     </TouchableWithoutFeedback>
//                     <TouchableWithoutFeedback onPress={() =>{navigation.navigate("BarberProfile")}}>
//                         <Image
//                             source={require("../assets/artistBg.png")}
//                             style={{
//                                 height: 50,
//                                 width: 50,
//                                 borderRadius: 30,
//                             }} />
//                     </TouchableWithoutFeedback>
//                 </View>
//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     InputButton: {
//         width: wp("70%"),
//         backgroundColor: "white",
//         borderRadius: 40,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "space-between",
//         borderWidth: 2,
//         borderColor: "gray",
//         margin: 10,
//         right: 15,
//         flexDirection: "row"
//     },
// })

// export default HeaderBar;
