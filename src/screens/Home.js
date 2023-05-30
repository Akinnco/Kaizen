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

import Carousel, {Pagination} from 'react-native-snap-carousel';

import Header from '../component/Header';
import ScrollBar from '../component/ScrollBar';
const Home = () => {
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [imagesIndex, setImagesIndex] = useState(0);
  const [imagesColor, setImagesColor] = useState();

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
      console.log('List response', response.data);
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
    console.log('Stepindex', index);
    console.log('item', item);
    const splitByGreaterSign = item.Title.split('>');
    const textAfterGreaterSign =
      splitByGreaterSign.length > 1 ? splitByGreaterSign[1].trim() : '';

    const splitByLessSign = textAfterGreaterSign.split('<');
    const textBeforeLessSign =
      splitByLessSign.length > 0 ? splitByLessSign[0].trim() : '';
    console.log('imagesData', images);
    return (
      <View style={{position: 'relative', height: normalize(462, 'height')}}>
        <View
          style={{
            width: normalize(295, 'width'),
            height: normalize(100, 'height'),
            backgroundColor: item.PromotionCardColor,
            position: 'absolute',
            bottom: 92,
            transform: [{skewY: '3deg'}],
            borderTopRightRadius: normalize(70),
            borderBottomLeftRadius: normalize(20),
            borderBottomRightRadius: normalize(20),
            marginLeft: 10,
          }}></View>

        <View
          style={{
            width: normalize(305, 'width'),
            height: normalize(362, 'height'),
            backgroundColor: item.BrandIconColor,
            borderBottomRightRadius: normalize(20),
            borderBottomLeftRadius: normalize(20),
          }}>
          <View style={{position: 'relative'}}>
            <Image
              resizeMode="contain"
              style={{
                width: normalize(55, 'width'),
                height: normalize(55, 'width'),
                position: 'absolute',
                zIndex: 1,
                left: normalize(10, 'width'),
                borderWidth: 4.5,
                borderColor: 'white',
                borderRadius: normalize(50),
                bottom: normalize(30, 'height'),
              }}
              source={{
                uri: item.BrandIconUrl,
              }}
            />
            <Image
              resizeMode="contain"
              style={{
                width: normalize(303, 'width'),
                height: normalize(220, 'width'),
                borderRadius: normalize(20),
                borderBottomLeftRadius: normalize(80),
              }}
              source={{
                uri: item.ImageUrl,
              }}
            />

            <View
              style={{
                backgroundColor: '#1D1E1C',
                width: normalize(97),
                height: normalize(32),
                alignSelf: 'flex-end',
                bottom: normalize(40, 'height'),
                marginRight: normalize(10),
                borderRadius: normalize(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>son 12 gün</Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: '700',
              height: normalize(50, 'height'),
              width: normalize(245, 'width'),
              alignSelf: 'center',
            }}>
            {textBeforeLessSign}
          </Text>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Text
              style={{
                color: item.PromotionCardColor,
              }}>
              Daha Daha
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollBar data={data} />

      <View style={{}}>
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
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
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
    </View>
  );
};

export default Home;
