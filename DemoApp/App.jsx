import 'react-native-gesture-handler';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStackScreen, GeneralStackScreen} from './src/stacks/stack';
import store from './src/Redux/store';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  );
};
export default App;

export const Layout = () => {
  const {user} = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {user ? <GeneralStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};
