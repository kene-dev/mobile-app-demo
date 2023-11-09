import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  Switch,
} from 'react-native';
import BA from '../../assets/back_arrow.svg';
import Edit from '../../assets/edit.svg';
import Logout from '../../assets/logout.svg';

import {useDispatch, useSelector} from 'react-redux';
import {logOut, reset} from '../../Redux/AuthSlice';
import {Colors} from '../../utils/colors';
import {resetSingleUser} from '../../Redux/UserSlice';

const Settings = ({navigation}) => {
  const {singleUser} = useSelector(state => state.singleuser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(resetSingleUser());
    dispatch(reset());
    dispatch(logOut());
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 114,
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
            Profile Page
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            rowGap: 8,
          }}>
          <Image
            source={{uri: singleUser.avatar}}
            style={{
              width: 125,
              height: 125,
              borderRadius: 200,
              borderWidth: 1,
              borderColor: Colors.secondary,
            }}
          />

          <Text style={styles.top_text}>
            {singleUser
              ? singleUser.first_name + ' ' + singleUser.last_name
              : 'User'}
          </Text>

          <Text style={styles.top_text}>{singleUser && singleUser.email}</Text>

          <View
            style={{
              backgroundColor: Colors.secondary,
              height: 2,
              width: '100%',
              marginVertical: 5,
            }}></View>
        </View>

        <View style={{marginTop: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('update')}
            style={styles.pill_light}>
            <Edit width={25} height={25} />
            <Text style={styles.pill_text_light}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 15}}>
          <TouchableOpacity onPress={handleLogout} style={styles.pill_light}>
            <Logout />
            <Text style={styles.pill_text_light}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
  },
  dark_container: {
    flex: 1,
    backgroundColor: '#000',
  },
  top_text: {
    color: '#1e1e1e',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  top_text_dark: {
    color: '#f9f9f9',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  pill_light: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f9f9f9',
    columnGap: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    marginVertical: 10,
  },
  pill_text_light: {
    fontSize: 17,
    color: 'black',
  },
});
