import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Colors} from '../../utils/colors';
import BA from '../../assets/back_arrow.svg';
import {useSelector, useDispatch} from 'react-redux';
import {resetUser, updateUser} from '../../Redux/UserSlice';

const Update = ({navigation}) => {
  const {singleUser, isLoading, isSuccess, isError, message} = useSelector(
    state => state.singleuser,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      Alert.alert('Update Failed', message, [
        {
          text: 'Okay',
        },
      ]);
      setTimeout(() => {
        dispatch(resetUser());
      }, 2500);
    }

    if (isSuccess) {
      Alert.alert('Update Success', message, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [isError, isSuccess, message]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="height">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 120,
              marginTop: 30,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BA width={20} height={20} />
            </TouchableOpacity>

            <Text
              style={{
                color: Colors.secondary,
                fontSize: 20,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Edit Profile
            </Text>
          </View>

          <View style={styles.form_container}>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  color: Colors.secondary,
                }}>
                Firstname
              </Text>
              <TextInput
                placeholder={singleUser.first_name}
                placeholderTextColor={'#555555'}
                style={styles.input_field}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  color: Colors.secondary,
                }}>
                Lastname
              </Text>
              <TextInput
                placeholder={singleUser.last_name}
                placeholderTextColor={'#555555'}
                style={styles.input_field}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 5,
                  color: Colors.secondary,
                }}>
                email
              </Text>
              <TextInput
                placeholder={singleUser.email}
                placeholderTextColor={'#555555'}
                onChangeText={text => handleChange(text, 'confirmPassword')}
                style={styles.input_field}
              />
            </View>

            <TouchableOpacity
              onPress={() => dispatch(updateUser())}
              style={styles.btn}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
                {isLoading ? 'updating...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form_container: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  input_field: {
    width: '100%',
    color: '#000',
    height: 54,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  btn: {
    height: 44,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
