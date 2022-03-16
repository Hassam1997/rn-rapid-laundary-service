import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PickUpConfirm = (props) => {

    const [Time, setTime] = useState('');

    useEffect(()=>{

        setTime(props.route.params.time)
    },[])
 
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ height: 275, backgroundColor: '#189BCF', width: 275, borderRadius: 300, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/check.png')} />
                </View>
            </View>

            <View style={{ flex: 0.16, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>PickUp Confirm</Text>
                <Text style={{ fontSize: 18,  color:'black' }}>{Time}</Text>
            </View>

            <View style={{ flex: 0.07, alignItems: 'center', justifyContent: 'center', }}>
                <Text>Free For Missed Appointment May Apply</Text>
            </View>

            <View style={{ flex: 0.2, height: 60, alignItems: 'center', justifyContent: 'center', }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Explore') }}>
                    <View style={{ width: wp('90%'), height: 60, backgroundColor: '#189BCF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Continue</Text>
                    </View>
                </TouchableOpacity>
            </View>

        
        </View>
    )
}

export default PickUpConfirm