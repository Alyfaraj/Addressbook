import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppButton, ContainerView, TextInputFilled} from '../components/shared';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import colors from '../themes/colors';
import {fontScale, sHeight, vScale} from '../themes/scale';
import fonts from '../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {userSignup} from '../toolkit/user';

const SignUp = ({navigation}) => {
  const {loaders} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  console.log(loaders);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('please add correct email')
      .required('please add email')
      .trim(),
    password: Yup.string().required('please add password').trim(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => handleSignUp(values),
  });

  const handleSignUp = values => {
    dispatch(userSignup(values));
  };

  return (
    <ContainerView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInputFilled
        value={formik.values.email}
        maxLength={50}
        keyboardType="email-address"
        placeholder="Enter your email"
        label="Email"
        errorMessage={formik.touched.email && formik.errors.email}
        onBlur={() => formik.setFieldTouched('email')}
        onChangeText={formik.handleChange('email')}
      />
      <TextInputFilled
        secureTextEntry
        value={formik.values.password}
        maxLength={50}
        label="Password"
        placeholder="Enter your password"
        errorMessage={formik.touched.password && formik.errors.password}
        onBlur={() => formik.setFieldTouched('password')}
        onChangeText={formik.handleChange('password')}
      />
      <AppButton
        loading={loaders.userSignup}
        onPress={formik.handleSubmit}
        title="Signup"
      />
    </ContainerView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: {
    marginTop: sHeight * 0.24,
    marginBottom: vScale(30),
    fontFamily: fonts.BOLD,
    fontSize: fontScale(20),
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
