import React from 'react'
import { StyleSheet, Text, View, StatusBar} from 'react-native'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, FONTFAMILY, FONTSIZE,} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

const FavoritesScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar  />
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favourites" />
          </View>
          <Text style={styles.InfoText}>Favourites list is empty</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
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
})


export default FavoritesScreen