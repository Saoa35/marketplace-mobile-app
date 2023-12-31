import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../styles/styles';
import {MainButton} from '../components/buttons/MainButton';
import {NameInput} from '../components/inputs/NameInput';
import {EmailInput} from '../components/inputs/EmailInput';
import {PhoneInput} from '../components/inputs/PhoneInput';
import {PasswordInput} from '../components/inputs/PasswordInput';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

function SignUpScreen({setuserData}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (!userName || !userEmail || !phone || !password) {
        Snackbar.show({
          text: 'All input fields are required',
          backgroundColor: COLORS.red,
          duration: Snackbar.LENGTH_LONG,
          marginBottom: 50,
        });
      } else {
        const response = await axios.post(
          'https://rn.binary-travel-app.xyz/api/v1/auth/sign-up',
          {
            fullName: userName,
            email: userEmail,
            phoneNumber: phone,
            password: password,
          },
        );

        if (response.status === 200) {
          setuserData(response.data);
          navigation.navigate('TabNavigation');
        }
      }
    } catch (error) {
      Snackbar.show({
        text: error.message,
        backgroundColor: COLORS.red,
        duration: Snackbar.LENGTH_LONG,
        marginBottom: 100,
      });

      console.log(error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.iputContainer}>
        <NameInput userName={userName} setUserName={setUserName} />

        <EmailInput userEmail={userEmail} setEmail={setEmail} />

        <PhoneInput phone={phone} setPhone={setPhone} />

        <PasswordInput password={password} setPassword={setPassword} />
      </View>

      <View style={styles.bottomContainer}>
        <MainButton
          name={'Sign Up'}
          onPressFunction={handleSubmit}
          btnColor={COLORS.green}
        />
        <View style={styles.bottomTextWrapper}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: COLORS.title,
    marginTop: 50,
    marginBottom: 70,
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '700',
  },
  iputContainer: {
    alignItems: 'center',
  },

  bottomContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  bottomTextWrapper: {
    marginTop: 20,
    flexDirection: 'row',
  },
  bottomText: {
    fontSize: 20,
  },

  linkText: {
    fontSize: 20,
    color: COLORS.green,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
