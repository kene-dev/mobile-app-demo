import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors} from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fbook from '../../assets/fbook.svg';
import Google from '../../assets/google.svg';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../Redux/AuthSlice';

const Login = ({navigation}) => {
  const [p1, setP1] = useState(true);
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState({
    emptyField: '',
    emField: '',
    p1Field: '',
  });

  const {email, password} = formData;
  const dispatch = useDispatch();

  const {isLoading, isSuccess, message, isError} = useSelector(
    state => state.auth,
  );

  // INPUT FIELD ON CHANGE FUNCTION TO UPDATE FORM VALUES
  const handleChange = (text, fields) => {
    setformData({...formData, [fields]: text});
    // console.log("FORM DATA" + JSON.stringify(formData));
  };

  const handleSubmit = () => {
    // ERROR HANDLING FUNCTIONS
    if (!email && !password) {
      setErr({...err, emptyField: 'please fill all required fields'});
      setTimeout(() => {
        setErr({...err, emptyField: ''});
      }, 2500);
      return;
    } else if (!email && password) {
      setErr({...err, userField: 'please input your username'});
      setTimeout(() => {
        setErr({...err, userField: ''});
      }, 2500);
      return;
    } else if (email && !password) {
      setErr({...err, p1Field: 'please input your password'});
      setTimeout(() => {
        setErr({...err, p1Field: ''});
      }, 2500);
      return;
    } else {
      const formValue = {email, password};
      dispatch(loginUser(formValue));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={styles.topCurve}>
            <Text
              style={{
                position: 'absolute',
                top: 50,
                right: 35,
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Sign In
            </Text>
          </View>

          {/* EMPTY FIELDS ERROR MESSAGE */}
          {err.emptyField && (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                textAlign: 'center',
              }}>
              {err.emptyField}
            </Text>
          )}

          {/* EMPTY USERNAME FIELDS ERROR MESSAGE */}
          {err.emField && (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                textAlign: 'center',
              }}>
              {err.emField}
            </Text>
          )}

          {/* EMPTY P1 FIELDS ERROR MESSAGE */}
          {err.p1Field && (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                textAlign: 'center',
              }}>
              {err.p1Field}
            </Text>
          )}

          {/* API ERROR MESSAGE */}
          {message && (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                textAlign: 'center',
                fontFamily: 'Inter-Regular',
              }}>
              {message}
            </Text>
          )}

          {/* FORM SECTION STARTS HERE */}
          <View style={styles.formStyle}>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Email
              </Text>
              <TextInput
                keyboardType="email-address"
                placeholderTextColor={'#555555'}
                placeholder="example@email.com"
                value={email}
                onChangeText={text => handleChange(text, 'email')}
                style={[
                  styles.input_field,
                  {
                    borderColor:
                      err.emptyField || err.emField ? 'red' : Colors.secondary,
                  },
                ]}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Password
              </Text>
              <TextInput
                keyboardType="default"
                secureTextEntry={p1}
                value={password}
                onChangeText={text => handleChange(text, 'password')}
                style={[
                  styles.input_field,
                  {
                    borderColor:
                      err.emptyField || err.p1Field ? 'red' : Colors.secondary,
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, {marginTop: 20}]}>
              <Text style={styles.txt}>
                {isLoading ? 'Loading...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                columnGap: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 15,
              }}>
              <View
                style={{
                  width: 100,
                  height: 2,
                  backgroundColor: Colors.secondary,
                }}></View>
              <Text style={{color: Colors.secondary}}>Sign in With</Text>
              <View
                style={{
                  width: 100,
                  height: 2,
                  backgroundColor: Colors.secondary,
                }}></View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                columnGap: 19,
                alignItems: 'center',
                justifyContent: 'center',
                marginTo: 20,
              }}>
              <Fbook width={30} height={30} />
              <Google width={25} height={25} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                columnGap: 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 6,
              }}>
              <Text>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('sign_up')}>
                <Text style={{color: Colors.secondary}}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* FORM SECTION ENDS HERE */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },

  topCurve: {
    position: 'relative',
    backgroundColor: Colors.primary,
    height: hp(20),
    marginLeft: hp(20),
    overflow: 'hidden',
    borderBottomLeftRadius: hp(30),
    marginBottom: 30,
  },
  formStyle: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  input_field: {
    width: '100%',
    height: 54,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
    color: '#000000',
  },
  btn: {
    backgroundColor: Colors.primary,
    height: hp(7),
    padding: 10,
    width: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
