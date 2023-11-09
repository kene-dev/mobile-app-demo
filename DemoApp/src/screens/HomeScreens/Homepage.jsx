import {
  Alert,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, resetUser} from '../../Redux/UserSlice';

const Homepage = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeIndexSource, setActiveIndexSource] = useState(0);
  const {singleUser, isLoading, isSuccess, isError, message} = useSelector(
    state => state.singleuser,
  );

  const dispatch = useDispatch();
  const sreenWidth = Dimensions.get('window').width;
  const newWidth = sreenWidth - 32;

  const cardData = [
    {
      acctType: 'Basic Acct',
      acctNum: '0235691392',
      acctBal: '7,245,438.54',
    },
    {
      acctType: 'Standard Acct',
      acctNum: '6235871392',
      acctBal: '1,245,438.54',
    },
    {
      acctType: 'Premium Acct',
      acctNum: '6235835492',
      acctBal: '1,245,438.54',
    },
  ];

  const renderedItem = ({item, index}) => {
    return (
      <View
        key={item.acctNum}
        style={{
          height: 132,
          width: newWidth,
          marginRight: 3,
          backgroundColor: Colors.secondary,
          rowGap: 7,
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Text style={[styles.card_text, {fontSize: 13}]}>
                Show Balance
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flexDirection: 'row', columnGap: 5, alignItems: 'center'}}>
            {/* <Naira width={14} height={14} /> */}
            <Text style={styles.card_text}>
              {showBalance ? item.acctBal : '*******'}
            </Text>
          </View>
        </View>

        <View style={{height: 1, backgroundColor: 'white'}}></View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.card_text}>{item.acctType}</Text>
          <Text style={styles.card_text}>{item.acctNum}</Text>
        </View>
      </View>
    );
  };

  const handleScroll = event => {
    const screenPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(screenPosition / newWidth);
    const newIndex = Math.floor(index);
    // console.log(Math.floor(index))
    if (newIndex < 0) {
      setActiveIndexSource(0);
    } else {
      setActiveIndexSource(Math.floor(index));
    }
  };

  useEffect(() => {
    if (isError) {
      Alert.alert('Failed User Fetch', message, [
        {
          text: 'Okay',
        },
      ]);
      setTimeout(() => {
        dispatch(resetUser());
      }, 2500);
    }
    if (isSuccess) {
      setTimeout(() => {
        dispatch(resetUser());
      }, 2500);
    }
  }, [isError, isSuccess, message]);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <View style={{rowGap: 5, paddingHorizontal: 15, marginTop: 30}}>
      <StatusBar hidden={false} backgroundColor={Colors.primary} />
      <Text style={styles.sub_text}>
        Welcome{' '}
        {singleUser
          ? singleUser.first_name + ' ' + singleUser.last_name
          : 'User'}
      </Text>
      {/* SWIPRER SECTION STARTS HERE */}
      <FlatList
        data={cardData}
        renderItem={renderedItem}
        keyExtractor={item => item.acctNum}
        pagingEnabled
        onScroll={handleScroll}
        horizontal
      />

      <View
        style={{
          flexDirection: 'row',
          columnGap: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 30,
        }}>
        {cardData.map((dot, index) => (
          <View
            key={index}
            style={{
              width: activeIndexSource === index ? 40 : 10,
              height: 10,
              borderRadius: 20,
              backgroundColor: Colors.primary,
              opacity: activeIndexSource === index ? 0.8 : 0.5,
            }}></View>
        ))}
      </View>
      {/* SWIPRER SECTION ENDS HERE */}
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  btn: {
    height: 41,
    backgroundColor: '#1D9A6C',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  card_text: {
    fontSize: 14,
    color: '#fff',
  },
  sub_text: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: '500',
  },
});
