import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AddPlace, Details, Login, PlacesList, SignUp} from '../screens';
import {Host} from 'react-native-portalize';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const MainNav = ({}) => {
  const {loggedIn} = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loggedIn ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="PlacesList" component={PlacesList} />
              <Stack.Screen name="Details" component={Details} />

              <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="AddPlace" component={AddPlace} />
              </Stack.Group>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default MainNav;
