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

const Footer = () => {
  const bottomButton = require('../../../assets/bottomButton.png');
  const bottomButtonLeft = require('../../../assets/bottomButtonLeft.png');
  const bottomButtonRight = require('../../../assets/bottomButtonRight.png');

  return (
    <View style={styles.footerContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.leftTab}>
          <Image
            resizeMode="contain"
            style={styles.LeftimageStyle}
            source={bottomButtonLeft}
          />
          <Text style={styles.LeftText}>KEŞFET</Text>
        </TouchableOpacity>
        <View style={styles.middleTab}></View>
        <TouchableOpacity activeOpacity={1} style={styles.rightTab}>
          <Image
            resizeMode="contain"
            style={styles.LeftimageStyle}
            source={bottomButtonRight}
          />
          <Text style={styles.LeftText}>DAHA CÜZDAN</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={1} style={styles.absoluteButton}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={bottomButton}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Footer;
const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  innerContainer: {
    width: '100%',
    height: normalize(Dimensions.get('window').height / 10, 'height'),
    flexDirection: 'row',
  },
  leftTab: {
    width: '33%',
    borderTopLeftRadius: normalize(40),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleTab: {
    width: '34%',
  },
  rightTab: {
    width: '33%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: normalize(40),
  },
  absoluteButton: {
    position: 'absolute',
    width: '34%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    bottom: normalize(15, 'height'),
    height: normalize(69, 'height'),
    width: normalize(69, 'height'),
    alignSelf: 'center',
    shadowColor: '#D8D8D8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  LeftimageStyle: {
    width: normalize(25),
    height: normalize(25),
  },
  LeftText: {
    color: '#1D1E1C',
    fontWeight: '700',
  },
});
