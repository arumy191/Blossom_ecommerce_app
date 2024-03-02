import { StatusBar, StyleSheet, Text, View, } from 'react-native';
import React from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

const OrderHistoryScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar />
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />
          </View>
          <Text style={styles.InfoText}>Order History is empty</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  InfoText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: 'blue',
    textAlign: 'center',
    flex: 1
  },
});

export default OrderHistoryScreen;