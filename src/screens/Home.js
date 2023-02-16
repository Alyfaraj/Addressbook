import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../toolkit/user';
import {AppButton} from '../components/shared';
import MapView, {Marker} from 'react-native-maps';
import {isEmpty} from 'lodash';
import {getPlaces} from '../toolkit/places';
import {Icon} from 'react-native-elements';
import colors from '../themes/colors';
import {scale, vScale} from '../themes/scale';

const Home = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 43.3344,
    longitude: 34444,
  });
  const dispatch = useDispatch();
  const {list} = useSelector(state => state.places);

  useEffect(() => {
    dispatch(getPlaces());
  }, []);

  const onLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        maxZoomLevel={3}
        onPress={e => setSelectedLocation(e.nativeEvent.coordinate)}>
        <Marker coordinate={selectedLocation} />
        {list?.map(place => (
          <Marker
            key={place.id}
            onPress={() => navigation.navigate('Details', {place})}
            coordinate={place?.selectedLocation}>
            <Pressable>
              <Icon name={place.type} />
            </Pressable>
          </Marker>
        ))}
      </MapView>
      <Icon
        onPress={() => navigation.navigate('PlacesList')}
        name="list"
        containerStyle={styles.list}
      />
      <Icon onPress={onLogout} name="logout" containerStyle={styles.logout} />
      <AppButton
        disabled={isEmpty(selectedLocation)}
        title="Add Place"
        onPress={() => navigation.navigate('AddPlace', {selectedLocation})}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  list: {
    backgroundColor: colors.white,
    padding: scale(10),
    borderRadius: vScale(20),
    position: 'absolute',
    zIndex: 99,
    top: vScale(50),
    end: scale(20),
  },
  logout: {
    backgroundColor: colors.white,
    padding: scale(10),
    borderRadius: vScale(20),
    position: 'absolute',
    zIndex: 99,
    top: vScale(50),
    start: scale(20),
  },
});
