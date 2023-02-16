import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {sWidth, vScale} from '../themes/scale';
import {Icon} from 'react-native-elements';
import {AppButton} from '../components/shared';

const Details = ({route, navigation}) => {
  const {place} = route.params;
  const {name, selectedLocation, phone, type} = place;
  const [editMode, setEditMode] = useState(false);
  const [newLocation, setNewLocation] = useState(selectedLocation);

  const handelPress = event => {
    if (editMode) {
      setNewLocation(event.nativeEvent.coordinate);
    }
  };

  const onContinuePress = () => {
    const data = {
      ...place,
      selectedLocation: newLocation,
    };

    navigation.navigate('AddPlace', {placeForEdit: data});
  };

  return (
    <SafeAreaView>
      <Icon name={type} />
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <MapView
        onPress={handelPress}
        region={{...newLocation, latitudeDelta: 3.7, longitudeDelta: 3.8}}
        // initialRegion={newLocation}
        style={styles.map}>
        <Marker coordinate={newLocation} />
      </MapView>
      {editMode ? (
        <>
          <Text style={styles.select}>Select new location and continue</Text>
          <AppButton title="Continue" onPress={onContinuePress} />
        </>
      ) : (
        <AppButton title="Edit" onPress={() => setEditMode(true)} />
      )}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  map: {
    width: sWidth,
    height: vScale(300),
    borderRadius: vScale(10),
    alignSelf: 'center',
  },
  select: {
    alignSelf: 'center',
    marginVertical: vScale(20),
  },
});
