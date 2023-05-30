import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
const Layout = ({children}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      {children}
      <Footer />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({});
