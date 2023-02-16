import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppButton, ContainerView, TextInputFilled} from '../components/shared';
import fonts from '../themes/fonts';
import {fontScale, scale, vScale} from '../themes/scale';
import colors from '../themes/colors';
import {Icon} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {addPlace, updatePlace} from '../toolkit/places';
import {isEmpty} from 'lodash';

const AddPlace = ({route, navigation}) => {
  const {selectedLocation, placeForEdit} = route?.params || {};
  const editMode = !isEmpty(placeForEdit);
  const {loaders} = useSelector(state => state.places);

  const dispatch = useDispatch();
  const initialValues = {
    type: editMode ? placeForEdit.type : 'home',
    name: editMode ? placeForEdit.name : '',
    phone: editMode ? placeForEdit.phone : '',
  };

  const validationSchema = Yup.object({
    type: Yup.string(),
    name: Yup.string()
      .min('5', 'name should be more than 4 chars')
      .required('please add place name')
      .trim(),
    phone: Yup.string()
      .required('please add place phone')
      .matches('^[0-9]', 'please enter numbers only')
      .trim(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => handelSubmit(values),
  });

  const handelSubmit = async values => {
    if (editMode) {
      const updateData = {
        ...placeForEdit,
        ...values,
      };
      // update place
      dispatch(updatePlace({updateData}))
        .unwrap()
        .then(() => {
          navigation.pop(2);
        });

      // add place
    } else {
      dispatch(addPlace({...values, selectedLocation}))
        .unwrap()
        .then(() => {
          navigation.pop();
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editMode ? 'Edit Place' : 'Add Place'}</Text>
      <ContainerView>
        <View style={styles.typesContainer}>
          {types.map((item, index) => (
            <Pressable
              onPress={() => formik.setFieldValue('type', item.id)}
              key={index}
              style={[
                styles.typeItemContainer,
                {
                  backgroundColor:
                    item.id == formik.values.type
                      ? colors.mainColor
                      : colors.background,
                },
              ]}>
              <Icon name={item.icon} />
              <Text style={styles.itemText}>{item.icon}</Text>
            </Pressable>
          ))}
        </View>
        <TextInputFilled
          placeholder="Place Name"
          label="Place Name"
          value={formik.values.name}
          errorMessage={formik.touched.name && formik.errors.name}
          onBlur={() => formik.setFieldTouched('name')}
          onChangeText={formik.handleChange('name')}
        />
        <TextInputFilled
          placeholder="Place Phone"
          label="Place Phone"
          value={formik.values.phone}
          errorMessage={formik.touched.phone && formik.errors.phone}
          onBlur={() => formik.setFieldTouched('phone')}
          onChangeText={formik.handleChange('phone')}
          keyboardType="number-pad"
        />
        <AppButton
          loading={loaders.addPlace || loaders.updatePlace}
          title={editMode ? 'Edit' : 'Save'}
          onPress={formik.handleSubmit}
        />
      </ContainerView>
    </View>
  );
};

const types = [
  {
    id: 'home',
    icon: 'home',
  },
  {
    id: 'restaurant',
    icon: 'restaurant',
  },
  {
    id: 'park',
    icon: 'park',
  },
];

export default AddPlace;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white, flex: 1},
  title: {
    fontFamily: fonts.BOLD,
    alignSelf: 'center',
    fontSize: fontScale(20),
    marginVertical: vScale(20),
  },
  typesContainer: {
    flexDirection: 'row',
    width: scale(330),
    alignSelf: 'center',
    marginVertical: vScale(20),
    justifyContent: 'space-around',
  },
  typeItemContainer: {
    flexDirection: 'row',
    padding: scale(10),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mainColor,
    borderRadius: vScale(10),
    alignItems: 'center',
  },
  itemText: {
    fontFamily: fonts.LIGHT,
    color: colors.black,
  },
});
