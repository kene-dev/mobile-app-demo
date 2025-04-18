import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
const logo = require('../../assets/logo.png');
import {Colors} from '../../utils/colors';

const Landing = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', rowGap: 5}}>
          <Text style={[styles.txt, {fontSize: 25}]}>WELCOME TO DEMIFY</Text>
          <Image source={logo} style={{width: hp(30), height: hp(30)}} />
        </View>

        <View style={{flexDirection: 'column', rowGap: 15}}>
          <TouchableOpacity
            onPress={() => navigation.push('sign_up')}
            style={styles.btn}>
            <Text style={styles.txt}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.push('login')}
            style={styles.btn1}>
            <Text style={[styles.txt, {color: Colors.secondary}]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  tp: {
    position: 'relative',
    height: hp(20),
    marginLeft: hp(15),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderBottomLeftRadius: hp(30),
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: Colors.secondary,
    height: hp(7),
    padding: 10,
    width: wp(80),
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  btn1: {
    backgroundColor: 'white',
    height: hp(7),
    padding: 10,
    width: wp(80),
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
