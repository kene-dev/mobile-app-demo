import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from '../screens/HomeScreens/Homepage';
import Settings from '../screens/HomeScreens/Settings';
import H from '../assets/home_solid.svg';
import HO from '../assets/home_outline.svg';
import Set from '../assets/set_solid.svg';
import SetO from '../assets/set_outline.svg';
import {Colors} from '../utils/colors';
import Landing from '../screens/Authscreens/LandingPage';
import SignUp from '../screens/Authscreens/SignUp';
import Login from '../screens/Authscreens/Login';
import Update from '../screens/HomeScreens/Update';

const Tab = createBottomTabNavigator();
const GeneralStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName={'landing_page'}>
      <AuthStack.Screen
        name="landing_page"
        component={Landing}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="sign_up"
        component={SignUp}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export const GeneralStackScreen = () => {
  return (
    <GeneralStack.Navigator initialRouteName="home">
      <GeneralStack.Screen
        name="home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <GeneralStack.Screen
        name="update"
        component={Update}
        options={{headerShown: false}}
      />
    </GeneralStack.Navigator>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home_tab"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (route.name === 'home_tab') {
            return focused ? (
              <H width={22} height={22} />
            ) : (
              <HO width={22} height={22} />
            );
          } else if (route.name === 'settings_tab') {
            return focused ? (
              <Set width={22} height={22} />
            ) : (
              <SetO width={22} height={22} />
            );
          }
        },

        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="home_tab"
        component={Homepage}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="settings_tab"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
