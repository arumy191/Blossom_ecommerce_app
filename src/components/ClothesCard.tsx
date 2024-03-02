import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface ClothesCardProps {
  id: string;
  index: number;
  type: string;
  season: string;
  imagelink_square: ImageProps;
  name: string;
  material: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const ClothesCard: React.FC<ClothesCardProps> = ({
  id,
  index,
  type,
  season,
  imagelink_square,
  name,
  material,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={['mistyrose', 'white']}>
      <ImageBackground
        source={imagelink_square}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'star'}
            color={'gold'}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubtitle}>{material}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
        € <Text style={styles.CardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              season,
              material,
              imagelink_square,
              name,
              prices: [{...price, quantity: 1}],
            });
          }}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_10,
    borderColor: 'grey',
    borderWidth: 1
    
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.cormorantgaramond_bold,
    color: 'black',
    fontSize: FONTSIZE.size_20,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: 'black',
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.cormorantgaramond_bold,
    color: 'black',
    fontSize: FONTSIZE.size_24,
  },
  CardPrice: {
    color: 'black',
  },
});

export default ClothesCard;