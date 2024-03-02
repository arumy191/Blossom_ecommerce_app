import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.42;

interface CollectionsCardProps {
    coid: string;
    coindex: number;
    type: string;
    coimagelink: ImageProps;
    coname: string;
    
  }
  
  const CollectionsCard: React.FC<CollectionsCardProps> = ({
    coid,
    coindex,
    type,
    coimagelink,
    coname,
  })=> {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.CardLinearGradientContainer}
        colors={['mistyrose', 'white']}>
        <ImageBackground
          source={coimagelink}
          style={styles.CardImageBG}
          resizeMode="cover">
        </ImageBackground>
        <Text style={styles.CardTitle}>{coname}</Text>
        <Text style={styles.CardSubtitle}>View more</Text>
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
      height: 130,
      borderRadius: BORDERRADIUS.radius_10,
      marginBottom: SPACING.space_15,
      overflow: 'hidden'
    },
    CardTitle: {
      fontFamily: FONTFAMILY.poppins_medium,
      color: 'black',
      fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: 'black',
        fontSize: FONTSIZE.size_10,
      }
  });

export default CollectionsCard;