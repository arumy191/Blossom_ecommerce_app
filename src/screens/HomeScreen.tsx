import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import {FlatList} from 'react-native';
import ClothesCard from '../components/ClothesCard';
import CollectionsCard from '../components/CollectionsCard';
import {Dimensions} from 'react-native';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getClothesList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let clotheslist = data.filter((item: any) => item.name == category);
    return clotheslist;
  }
};

const HomeScreen = ({navigation}: any) => {
  const ClothesList = useStore((state: any) => state.ClothesList);
  const CollectionList = useStore((state: any) => state.CollectionList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [categories, setCategories] = useState(
    getCategoriesFromData(ClothesList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedClothes, setSortedClothes] = useState(
    getClothesList(categoryIndex.category, ClothesList),
  );

  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchClothes = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedClothes([
        ...ClothesList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchClothes = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedClothes([...ClothesList]);
    setSearchText('');
  };

  const ClothesCardAddToCart = ({
    id,
    index,
    name,
    season,
    imagelink_square,
    material,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      season,
      imagelink_square,
      material,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}

        <HeaderBar title="BLOSSOM"/>
        <Text style={styles.ScreenTitle}> 
        Women's Clothing
        </Text>

        {/* Search Input */}

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchClothes(searchText);
            }}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Clothes"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchClothes(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchClothes();
              }}>
              <CustomIcon
                style={styles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Category Scroller */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedClothes([
                    ...getClothesList(categories[index], ClothesList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: 'royalblue'}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Clothes Flatlist */}

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Clothes Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedClothes}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <ClothesCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  season={item.season}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  material={item.material}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={ClothesCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.ClothesCollectionsTitle}>Collections</Text>

        {/* Collections Flatlist */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CollectionList}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.coid}
          renderItem={({item}) => {
            return (
              
               <CollectionsCard
                  coid={item.coid}
                  coindex={item.coindex}
                  type={item.type}
                  coimagelink={item.coimagelink}
                  coname={item.coname}
                />
              
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.cormorantgaramond_bolditalic,
    color: 'royalblue',
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.cormorantgaramond_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.cormorantgaramond_bold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: 'royalblue',
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  ClothesCollectionsTitle: {
    fontSize: FONTSIZE.size_20,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.cormorantgaramond_bold,
    color: 'grey',
  },
});

export default HomeScreen;