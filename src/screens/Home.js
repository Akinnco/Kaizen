import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';
import normalize from 'react-native-normalize';
import Footer from '../component/HighLevel/Footer/Footer';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import ScrollBar from '../component/LowLevel/Tabs/ScrollBar';
import Layout from '../component/HighLevel/Layout/Layout';
const Home = ({navigation}) => {
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [imagesIndex, setImagesIndex] = useState(0);

  const isCarousel = React.useRef(null);
  useEffect(() => {
    ScrollListRequest();
    SliderDataRequest();
  }, []);

  const ScrollListRequest = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.extrazone.com/tags/list',
        headers: {
          'Content-Type': 'application/json',
          'X-Country-Id': 'TR',
          'X-Language-Id': 'TR',
        },
      });
      setData(response.data);
      console.log('ScrollList response', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const SliderDataRequest = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.extrazone.com/promotions/list?Channel=PWA',
        headers: {
          'Content-Type': 'application/json',
          'X-Country-Id': 'TR',
          'X-Language-Id': 'TR',
        },
      });

      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({item, index}) => {
    const splitByGreaterSign = item.Title.split('>');
    const textAfterGreaterSign =
      splitByGreaterSign.length > 1 ? splitByGreaterSign[1].trim() : '';

    const splitByLessSign = textAfterGreaterSign.split('<');
    const textBeforeLessSign =
      splitByLessSign.length > 0 ? splitByLessSign[0].trim() : '';
    return (
      <View style={styles.renderContainer}>
        <View>
          <View
            style={{
              ...styles.shadowColor,
              backgroundColor: item.PromotionCardColor,
            }}></View>

          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <View style={styles.brandIconContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.brandIcon}
                  source={{uri: item.BrandIconUrl}}
                />
              </View>

              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: item.ImageUrl}}
              />

              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{item.RemainingText}</Text>
              </View>
              <View
                style={{
                  width: normalize(245, 'width'),
                  height: normalize(50, 'height'),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.title}>{textBeforeLessSign}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailScreen', {
                    item: item,
                  })
                }
                style={styles.button}>
                <Text
                  style={{
                    color: item.PromotionCardColor,
                  }}>
                  Hemen Katıl
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Layout>
      <ScrollBar data={data} />

      <View style={{marginTop: normalize(10, 'height')}}>
        <Carousel
          layout={'default'}
          data={images}
          renderItem={renderItem}
          itemWidth={normalize(310, 'width')}
          sliderWidth={normalize(400, 'width')}
          onSnapToItem={index => setImagesIndex(index)}
          ref={isCarousel}
          inactiveSlideOpacity={2}
          // ref={isCarousel}
          // firstItem={item_id}
          // layoutCardOffset={9}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={imagesIndex}
          carouselRef={isCarousel}
          dotStyle={{
            width: normalize(10, 'width'),
            height: normalize(10, 'width'),
            borderRadius: 5,
            marginHorizontal: 0,
            bottom: normalize(26, 'height'),
            backgroundColor: images[imagesIndex]?.PromotionCardColor,
          }}
          inactiveDotStyle={{
            backgroundColor: '#D8D8D8', // etkin noktanın rengi
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    </Layout>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    width: normalize(305, 'width'),
    height: normalize(362, 'height'),
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: normalize(20),
    borderBottomLeftRadius: normalize(20),
    borderWidth: 2,
    borderColor: '#F4F6F5',
    borderTopRightRadius: normalize(15),
    borderTopLeftRadius: normalize(15),
    paddingTop: 2,
  },
  shadowColor: {
    width: normalize(295, 'width'),
    height: normalize(100, 'height'),
    position: 'absolute',
    bottom: normalize(-15, 'height'),
    transform: [{skewY: '3deg'}],
    borderTopRightRadius: normalize(70),
    borderBottomLeftRadius: normalize(20),
    borderBottomRightRadius: normalize(20),
    marginLeft: 10,
  },
  renderContainer: {
    position: 'relative',
    height: normalize(400, 'height'),
  },

  contentContainer: {
    position: 'relative',
  },
  brandIconContainer: {
    position: 'absolute',
  },
  brandIcon: {
    width: normalize(55, 'width'),
    height: normalize(55, 'width'),
    position: 'absolute',
    zIndex: 1,
    left: normalize(10, 'width'),
    borderWidth: 4.5,
    borderColor: 'white',
    borderRadius: normalize(50),
    bottom: normalize(30, 'height'),
  },
  image: {
    width: normalize(303, 'width'),
    height: normalize(220, 'width'),
    borderRadius: normalize(20),
    borderBottomLeftRadius: normalize(80),
  },
  durationContainer: {
    backgroundColor: '#1D1E1C',
    width: normalize(97),
    height: normalize(32),
    alignSelf: 'flex-end',
    bottom: normalize(40, 'height'),
    marginRight: normalize(10),
    borderRadius: normalize(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationText: {
    color: 'white',
  },
  title: {
    fontWeight: '700',
    lineHeight: normalize(20, 'width'),
  },
  button: {
    alignSelf: 'center',
  },
});
