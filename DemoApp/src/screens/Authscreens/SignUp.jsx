import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fbook from '../../assets/fbook.svg';
import Google from '../../assets/google.svg';
import Eye from '../../assets/eye.svg';
import {KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createUser, reset} from '../../Redux/AuthSlice';

const SignUp = ({navigation}) => {
  const [p1, setP1] = useState(true);
  const [p2, setP2] = useState(true);
  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [err, setErr] = useState({
    noMatch: '',
    emptyField: '',
    emField: '',
    userField: '',
    p1Field: '',
    p2Field: '',
  });

  const scrollViewRef = useRef();

  //DESTRUCTURED FORM DATA
  const {username, password, email, confirmPassword} = formData;
  const dispatch = useDispatch();

  //DESTRUCTURED AUTH STATES FROM REDUX
  const {isLoading, isError, isSuccess, message} = useSelector(
    state => state.auth,
  );

  // FORM SUBMISSION HANDLER
  const handleSubmit = async () => {
    // console.log(acct);
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // ERROR HANDLING FUNCTIONS
    if (password !== confirmPassword) {
      setErr({...err, noMatch: 'passwords do no match'});
      scrollViewRef.current.scrollTo({
        y: 10, // Adjust this value to scroll to the correct position
        animated: true,
      });
      setTimeout(() => {
        setErr({...err, noMatch: ''});
      }, 3000);
      return;
    } else if (!username && !password && !confirmPassword && !email) {
      setErr({...err, emptyField: 'please fill all required fields'});
      scrollViewRef.current.scrollTo({
        y: 0, // Adjust this value to scroll to the correct position
        animated: true,
      });
      setTimeout(() => {
        setErr({...err, emptyField: ''});
      }, 2500);
      return;
    } else if (!username && password && confirmPassword && email) {
      setErr({...err, userField: 'please input your username'});
      scrollViewRef.current.scrollTo({
        y: 1, // Adjust this value to scroll to the correct position
        animated: true,
      });
      setTimeout(() => {
        setErr({...err, userField: ''});
      }, 2500);
      return;
    } else if (username && !password && email) {
      scrollViewRef.current.scrollTo({
        y: 10, // Adjust this value to scroll to the correct position
        animated: true,
      });
      setErr({...err, p1Field: 'please input your password'});
      setTimeout(() => {
        setErr({...err, p1Field: ''});
      }, 2500);
      return;
    } else if (username && password && !email) {
      scrollViewRef.current.scrollTo({
        y: 5, // Adjust this value to scroll to the correct position
        animated: true,
      });
      setErr({...err, p2Field: 'please input a valid email address'});
      setTimeout(() => {
        setErr({...err, emField: ''});
      }, 2500);
      return;
    } else {
      if (passwordRegex.test(password)) {
        const formValue = {
          username,
          email,
          password,
        };
        // console.log(formValue);
        dispatch(createUser(formValue));
      } else {
        scrollViewRef.current.scrollTo({
          y: 10, // Adjust this value to scroll to the correct position
          animated: true,
        });
        setErr({
          ...err,
          p1Field:
            'Password should contain at least one capital letter and one special character and one number.',
        });
        setTimeout(() => {
          setErr({...err, p1Field: ''});
        }, 2500);
        return;
      }
    }
  };

  // INPUT FIELD ON CHANGE FUNCTION TO UPDATE FORM VALUES
  const handleChange = (text, fields) => {
    setformData({...formData, [fields]: text});
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('login');
      dispatch(reset());
      return;
    }
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 2500);
    }

    if (message) {
      scrollViewRef.current.scrollTo({
        y: 0, // Adjust this value to scroll to the correct position
        animated: true,
      });
    }
  }, [isError, isSuccess, message]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <KeyboardAvoidingView behavior="height">
        <ScrollView ref={scrollViewRef}>
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
              Sign Up
            </Text>
          </View>

          {/* EMPTY FIELDS ERROR MESSAGE */}
          {err.emptyField && (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                textTransform: 'capitalize',
                textAlign: 'center',
                fontFamily: 'Inter-Regular',
              }}>
              {err.emptyField}
            </Text>
          )}

          {/* API ERROR MESSAGE */}
          {message && (
            <Text
              style={{
                fontSize: 13,
                color: 'red',
                textAlign: 'center',
                fontFamily: 'Inter-Regular',
              }}>
              {message}
            </Text>
          )}

          {/* FORM SECTION STARTS HERE */}
          <View style={styles.formStyle}>
            {/* EMPTY USERNAME FIELDS ERROR MESSAGE */}
            {err.userField && (
              <Text
                style={{
                  fontSize: 13,
                  color: 'red',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  fontFamily: 'Inter-Regular',
                }}>
                {err.userField}
              </Text>
            )}
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Username
              </Text>
              <TextInput
                keyboardType="default"
                placeholderTextColor={'#555555'}
                placeholder="Eg. user5595"
                onChangeText={text => handleChange(text, 'username')}
                style={[
                  styles.input_field,
                  {
                    borderColor:
                      err.emptyField || err.userField
                        ? 'red'
                        : Colors.secondary,
                  },
                ]}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Email
              </Text>
              <TextInput
                keyboardType="email-address"
                placeholderTextColor={'#555555'}
                placeholder="example@email.com"
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

            {/* PASSWORD MISMATCH ERROR MESSAGE */}
            {err.noMatch && (
              <Text
                style={{
                  fontSize: 13,
                  color: 'red',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  fontFamily: 'Inter-Regular',
                }}>
                {err.noMatch}
              </Text>
            )}

            {/* EMPTY P1 FIELDS ERROR MESSAGE */}
            {err.p1Field && (
              <Text
                style={{
                  fontSize: 13,
                  color: 'red',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  fontFamily: 'Inter-Regular',
                }}>
                {err.p1Field}
              </Text>
            )}

            <View style={{marginVertical: 10, position: 'relative'}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Password
              </Text>
              <TextInput
                keyboardType="default"
                secureTextEntry={p1}
                value={formData.password}
                onChangeText={text => handleChange(text, 'password')}
                style={[
                  styles.input_field,
                  {
                    borderColor:
                      err.emptyField || err.p1Field || err.noMatch
                        ? 'red'
                        : Colors.secondary,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: 13,
                  marginVertical: 1,
                  color: Colors.secondary,
                }}>
                Password should contain at least one capital letter, one special
                character, one number, and should be at least 6 characters long.
              </Text>

              <Eye
                width={20}
                height={20}
                onPress={() => setP1(!p1)}
                style={{position: 'absolute', right: 8, top: hp(5.5)}}
              />
            </View>

            {/* EMPTY P2 FIELDS ERROR MESSAGE */}
            {err.p2Field && (
              <Text
                style={{
                  fontSize: 15,
                  color: 'red',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  fontFamily: 'Inter-Regular',
                }}>
                {err.p2Field}
              </Text>
            )}
            <View style={{marginVertical: 10, position: 'relative'}}>
              <Text style={{fontSize: 13, marginVertical: 5, color: '#262626'}}>
                Confirm Password
              </Text>
              <TextInput
                keyboardType="default"
                secureTextEntry={p2}
                value={formData.confirmPassword}
                onChangeText={text => handleChange(text, 'confirmPassword')}
                style={[
                  styles.input_field,
                  {
                    borderColor:
                      err.emptyField || err.p2Field || err.noMatch
                        ? 'red'
                        : Colors.secondary,
                  },
                ]}
              />
              <Eye
                width={20}
                height={20}
                onPress={() => setP2(!p2)}
                style={{position: 'absolute', right: 8, top: hp(5.5)}}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, {marginTop: 20}]}>
              <Text style={styles.txt}>
                {isLoading ? 'Loading' : 'Proceed'}
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
              <Text style={{color: Colors.secondary}}>Signup With</Text>
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
              <Text>Already Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.push('login')}>
                <Text style={{color: Colors.secondary}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* FORM SECTION ENDS HERE */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

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
    marginBottom: 15,
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
