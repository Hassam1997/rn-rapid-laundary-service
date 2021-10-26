/**
 * essential imports
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../theme/color';
/**
 * function jsx
 */
function Button(props) {
    return (
        <View style={styles.MainView}>
            <Text style={styles.TextStyle}>{props.text}</Text>
        </View>
    )
};
export default Button;
/**
 * style sheet
 */
const styles = StyleSheet.create({
    MainView: {
        height: 57,
        width: wp("90%"),
        backgroundColor: color.palette.blue,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
    },
    TextStyle: {
        color: color.palette.white,
        fontFamily:"Poppins-Regular",
        fontSize:15
    }
});