import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated } from 'react-native-maps'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { color } from '../theme/color';
/**
 * 
 * @returns componets
 */
import Button from '../components/Buttons';
/**
 * function jsx
 */
const Map = (props) => {
    const [isLat, setLat] = useState(37.78825)
    const [isLng, setLng] = useState(-122.4324)
    const [isAddress, setAddress] = useState('')
    const mapRef = useRef()

    const addAddress = () => {
        props.navigation.navigate("PickUpLocation", { address: isAddress })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                position: 'absolute',
                elevation: 10,
                zIndex: 1000000,
                top: 10,
                width: wp("88%"),
                alignSelf: "center",
                borderRadius: 40,
                overflow: "hidden",
            }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    returnKeyType={'default'}
                    fetchDetails={true}
                    textInputProps={{
                        // value: isMap,
                        // onChangeText: text => setMap(text)
                    }}
                    styles={{
                        textInputContainer: {
                            alignSelf: "center",
                            alignItems: "center",
                            width: wp("88%"),
                            justifyContent: "center",
                            elevation: 13,
                            backgroundColor: "white",
                        },
                        textInput: {
                            height: 50,
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                    onPress={(data, details = null) => {
                        setLat(details.geometry.location.lat)
                        setLng(details.geometry.location.lng)
                        setAddress(details.formatted_address)
                        console.log(details.formatted_address)
                    }}
                    query={{
                        key: 'AIzaSyBm0JlFka5NDY0C22-XI-F5UhMwlgWc9RI',
                        language: 'en',
                        type: 'address',
                        components: 'country:us'
                    }}
                />
            </View>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={{
                    latitude: isLat ?? 37.78825,
                    longitude: isLng ?? -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker.Animated
                    coordinate={{ latitude: isLat, longitude: isLng }}
                    title={'Located here'}
                    draggable
                />
            </MapView>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => addAddress()}>
                    <Button text={"Add An Address"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Map;
/**
 * style sheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    LogoContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20
    },
    HeadingText: {
        fontFamily: "Poppins-Medium",
        fontSize: 24,
        color: color.dim,
        width: wp("90%"),
        alignSelf: "center",
    },
    TextInputContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    AdrressViewStyle: {
        width: wp("90%"),
        height: 57,
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        backgroundColor: color.palette.lightgray,
        borderRadius: 10
    },
    AdrressTextStyle: {
        fontSize: 12,
        color: color.dim,
        fontFamily: "Poppins-Regular",
        width: wp("80%"),
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
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ButtonContainer: {
        position: 'absolute',
        alignSelf: "center",
        bottom: 35
    },
    TextStyle: {
        color: color.dim,
        fontFamily: "Poppins-Light",
        fontSize: 16,
        width: 280,
        left: 20,
        marginVertical: 10
    },
    SubTextStyle: {
        color: color.dim,
        textAlign: "center",
        fontFamily: "Poppins-Light",
        fontSize: 14,
        marginVertical: 10
    },
});