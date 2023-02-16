import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale, sWidth, vScale} from '../themes/scale';
import colors from '../themes/colors';
import {deletePlace} from '../toolkit/places';
import {useNavigation} from '@react-navigation/native';

const PlacesList = () => {
  const navigation = useNavigation();
  const {list} = useSelector(state => state.places);
  const dispatch = useDispatch();

  const onDetele = placeId => {
    dispatch(deletePlace({placeId}));
  };

  const sortList = data =>
    data.slice().sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  const RenderItem = ({item}) => (
    <Pressable onPress={() => navigation.navigate('Details', {place: item})}>
      <View style={styles.itemContainer}>
        <Icon name={item.type} />
        <View style={{flex: 1}}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.phone}</Text>
        </View>
        <Icon
          name="delete"
          color={colors.red}
          onPress={() => onDetele(item.id)}
        />
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={sortList(list)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RenderItem {...{item}} />}
      />
    </SafeAreaView>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  itemContainer: {
    width: sWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOpacity: 0.1,
    shadowOffset: {width: 1, height: 1},
    elevation: 1,
    borderRadius: vScale(10),
    marginVertical: vScale(10),
    paddingVertical: vScale(10),
    paddingHorizontal: scale(20),
  },
  text: {
    marginStart: scale(10),
    marginVertical: vScale(5),
    color: colors.black,
  },
});
