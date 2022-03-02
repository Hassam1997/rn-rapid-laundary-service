import { View, Text, Image } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Map = ({ route, navigation }) => {



    const { currentlocation, latitude, longitude } = route.params;
    console.log(currentlocation);
    return (
        <View style={{ flex: 1 }}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={'Located here'}
                />
            </MapView>
        </View>
    )
}

export default Map