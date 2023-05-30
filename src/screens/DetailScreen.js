import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import normalize from 'react-native-normalize';

const DetailScreen = ({route, navigation}) => {
  let Id = route.params.item.Id;
  const backButton = require('../assets/backButton.png');

  const [data, setData] = useState();
  const [tittle, setTittle] = useState();
  useEffect(() => {
    DetailDataRequest();
  }, []);

  const DetailDataRequest = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.extrazone.com/promotions?Id=${Id}`,
        headers: {
          'Content-Type': 'application/json',
          'X-Country-Id': 'TR',
          'X-Language-Id': 'TR',
        },
      });
      let data = response.data;
      setData(data);
      convertTittle(data);
      console.log('DetailData response', response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const convertTittle = data => {
    const splitByGreaterSign = data.Title.split('>');
    const textAfterGreaterSign =
      splitByGreaterSign.length > 1 ? splitByGreaterSign[1].trim() : '';

    const splitByLessSign = textAfterGreaterSign.split('<');
    const textBeforeLessSign =
      splitByLessSign.length > 0 ? splitByLessSign[0].trim() : '';
    setTittle(textBeforeLessSign);
  };
  console.log('detaildata', data);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={styles.backButton}>
        <Image
          resizeMode="contain"
          style={styles.backButtonImage}
          source={backButton}
        />
      </TouchableOpacity>
      {data && (
        <>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{uri: data.ImageUrl}}
            />
            <Image
              resizeMode="contain"
              style={styles.brandIcon}
              source={{uri: data.BrandIconUrl}}
            />
            <View style={styles.date}>
              <Text style={styles.dateText}>{data.RemainingText}</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tittle}</Text>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>{data.Description}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{data.DetailButtonText}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    zIndex: 9,
    marginTop: normalize(50, 'height'),
    marginLeft: normalize(15, 'width'),
    backgroundColor: '#1D1E1C',
    width: normalize(40, 'width'),
    height: normalize(40, 'height'),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: normalize(17, 'width'),
    height: normalize(17, 'height'),
  },
  imageContainer: {
    height: normalize(320, 'height'),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: normalize(110, 'width'),
  },
  brandIcon: {
    position: 'absolute',
    width: normalize(55, 'width'),
    height: normalize(55, 'height'),
    bottom: 0,
    left: normalize(10, 'width'),
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: normalize(30, 'width'),
  },
  date: {
    width: normalize(97, 'width'),
    height: normalize(32, 'height'),
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E1C',
    borderRadius: normalize(26, 'width'),
    bottom: normalize(10, 'width'),
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: normalize(13, 'width'),
    fontWeight: '400',
  },
  titleContainer: {
    width: normalize(345, 'width'),
    height: normalize(70, 'height'),
    marginTop: normalize(15, 'height'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: '700',
    color: '#1D1E1C',
    fontSize: normalize(26, 'width'),
    lineHeight: normalize(30, 'width'),
  },
  descriptionContainer: {
    width: normalize(345, 'width'),
    height: normalize(50, 'height'),
    marginTop: normalize(45, 'height'),
    alignSelf: 'center',
    bottom: normalize(40, 'width'),
  },
  description: {
    fontWeight: '400',
    color: '#1D1E1C',
    fontSize: normalize(14, 'width'),
    lineHeight: normalize(22, 'width'),
  },
  buttonContainer: {
    width: normalize(345, 'width'),
    height: normalize(56, 'height'),
    backgroundColor: '#F40000',
    position: 'absolute',
    bottom: normalize(20, 'height'),
    alignSelf: 'center',
    borderRadius: normalize(28, 'width'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: normalize(14, 'width'),
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
