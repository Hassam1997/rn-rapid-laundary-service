import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PickUpConfirm = ({navigation}) => {
    return (
        <View style={{ flex: 1 , backgroundColor:'white'}}>

            <View style={{ height: 30}}></View>

            <View style={{ height: 400, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 275, backgroundColor: '#189BCF', width: 275, borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/check.png')} />
                </View>
            </View>

            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>PickUp Confirm</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today, 5pm - 7pm</Text>
            </View>

            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Free For Missed Appointment May Apply</Text>
            </View>

            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Wash')}}>
                    <View style={{ height: 60, backgroundColor: '#189BCF', width: wp('80%'), borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Continue</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ height:30, alignItems: 'center', justifyContent: 'flex-start',}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ScheduleOrder')}}>
                    <Text style={{ fontSize: 20, }}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PickUpConfirm