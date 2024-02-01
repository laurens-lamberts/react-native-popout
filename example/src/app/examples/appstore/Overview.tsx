import React from 'react';
import {ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {PopoutTile} from 'react-native-popout';
import {DATA} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MARGIN = 20;

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();

  const tileWidth = screenWidth - MARGIN * 2;

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 20,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        marginHorizontal: MARGIN,
      }}>
      {DATA.testCollection.map((item, index) => (
        <PopoutTile
          key={item.id}
          item={item}
          OverlayComponent={() => (
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>
          )}
          style={{
            borderRadius: 12,
            width: tileWidth,
            height: tileWidth * 1.3,
          }}>
          {/* <View
            style={{
              height: 60,
              top: tileWidth * 1.3 - 60,
              padding: 20,
              backgroundColor: 'rgba(225,20,20,0.7)',
            }}>
            <Text style={{color: 'white'}}>Paard</Text>
          </View> */}
        </PopoutTile>
      ))}
    </ScrollView>
  );
};

export default Overview;
