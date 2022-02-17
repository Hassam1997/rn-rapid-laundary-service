import { View, Text } from 'react-native'
import React from 'react'

const Promotion = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ height: 60, backgroundColor: '#DEE3EA', justifyContent: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Frequently Asked Questions</Text>
            </View>

            <View style={{ height: 70, backgroundColor: 'white', flexDirection:'row', justifyContent:'space-between', padding:20, alignItems:'center'}}>
                <View>
                    <Text style={{fontWeight:'bold', color:'#189BCF'}}>Email</Text>
                </View>

                <View >
                    <Text style={{fontWeight:'bold', color:'#189BCF'}}>Call</Text>
                </View>

                <View >
                    <Text style={{fontWeight:'bold', color:'#189BCF'}}>Chat</Text>
                </View>
            </View>
        </View>
    )
}

export default Promotion