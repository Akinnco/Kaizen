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
import normalize from 'react-native-normalize';

const ScrollBar = data => {
  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          borderWidth: 1.5,
          width: normalize(105, 'width'),
          height: normalize(36, 'height'),
          borderRadius: normalize(8, 'width'),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: normalize(5, 'width'),
          borderColor: '#ECEEEF',
        }}>
        <Image
          resizeMode="contain"
          source={{
            uri: item.IconUrl,
          }}
          style={{
            width: normalize(24, 'width'),
            height: normalize(24, 'width'),
            borderRadius: normalize(6, 'width'),
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            marginLeft: normalize(8, 'width'),
            width: normalize(60, 'width'),
          }}>
          {item.Name}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={{marginTop: normalize(20, 'height')}}>
      <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.Id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ScrollBar;

const styles = StyleSheet.create({});
