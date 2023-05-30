import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Dimensions,
} from 'react-native';
import normalize from 'react-native-normalize';

const Header = () => {
  const topLeftLogo = require('../../../assets/topLeftLogo.png');
  const bottomRightProfile = require('../../../assets/bottomRightProfile.png');

  return (
    <View style={styles.footerContainer}>
      <Image
        resizeMode="contain"
        style={styles.LeftimageStyle}
        source={topLeftLogo}
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userButton}>
        <Image
          resizeMode="contain"
          style={styles.userButtonImage}
          source={bottomRightProfile}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    height: normalize(40, 'height'),
    flexDirection: 'row',
    paddingLeft: normalize(15, 'width'),
    justifyContent: 'space-between',
    marginTop: normalize(40, 'height'),
  },
  LeftimageStyle: {
    width: normalize(80, 'width'),
    height: normalize(40, 'height'),
  },
  loginButton: {
    width: normalize(91, 'width'),
    height: normalize(40, 'height'),
    borderRadius: normalize(20, 'width'),
    backgroundColor: '#F40000',
    justifyContent: 'center',
    alignItems: 'center',
    left: normalize(55, 'width'),
  },
  loginButtonText: {
    color: '#FFFFFF',
  },
  userButton: {
    width: normalize(40, 'width'),
    height: normalize(40, 'height'),
    borderRadius: normalize(20, 'width'),
    backgroundColor: '#1D1E1C',
    justifyContent: 'center',
    alignItems: 'center',
    right: normalize(17),
  },
  userButtonImage: {
    width: normalize(17),
    height: normalize(17),
  },
});
