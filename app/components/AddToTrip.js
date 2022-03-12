import React, {useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Calendar from '../assets/calendar.svg';
import RestDialogBox from '../components/RestDialogBox';
import {useNavigation} from '@react-navigation/native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var radio_props = [
  {label: '', value: 0},
  // {label: '', value: 1 }
];

function AddToTrip(props) {
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState([]);
  const [service_detail_id, setServiceDetailId] = useState(props.onRegion);
  const [getcomment, setGetComment] = useState(props.CallBack);
  const [comments, setComments] = useState('');
  const [isToggle, setToggle] = useState(true);
  const [isValue, setValue] = useState(false);
  const [radio, setRadio] = useState(1);

  const comment = () => {
    props.closemodal();
    props.navigation();
  };

  return (
    <Modal
      propagateSwipe={true}
      isVisible={true}
      animationOut="fadeInLeft"
      swipeDirection={'down'}
      onSwipeComplete={() => props.closemodal(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            paddingVertical: 10,
            width: Dimensions.get('window').width / 1.1,
            height: Dimensions.get('window').height / 1.1,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 40,
            paddingTop: 40,
          }}>
          <View
            style={{
              width: wp('80%'),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Poppins-SemiBold',
                color: '#434343',
              }}>
              Add To Trip
            </Text>
          </View>
          <View
            style={{
            //   backgroundColor: 'blue',
              width: wp('80%'),
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#C4C4C6',
              height: 45,
              justifyContent: 'space-around',
            }}>
            <Calendar />

            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                color: '#434343',
                //  left: 10,
                // backgroundColor: 'red',
                width: wp('50%'),
              }}>
              Hello
            </Text>

            <RadioForm
            buttonSize={13}
             buttonColor={'black'}
         
              radio_props={radio_props}
              formHorizontal={true}
              animation={true}
              initial={1}
              onPress={value => {
                setValue(value);
              }}
            />
          </View>
          <View
            style={{
              width: wp('80%'),
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SaveTrips', {
                  details: props.tripDetails,
                }),
                  props.closemodal(false);
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  color: '#A92D32',
                }}>
                Create A New Trip
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('86%'),
              borderRadius: 40,
              height: 60,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.closemodal(false);
              }}
              style={{
                width: wp('36%'),
                backgroundColor: 'white',
                borderColor: '#A92D32',
                borderWidth: 3,
                borderRadius: 40,
                height: 53,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#A92D32',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('YourTrips'), props.closemodal(false);
              }}
              style={{
                width: wp('36%'),
                backgroundColor: '#983321',
                borderRadius: 40,
                height: 53,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default AddToTrip;
