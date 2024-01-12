import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {PopoutTile, PopoutContext} from 'react-native-popout';
import {DATA} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const {
    elementOpened,
    onElementTap,
    setOverlayComponent,
    setOverlayUnderNotch,
  } = useContext(PopoutContext);

  return (
    <ScrollView
      contentContainerStyle={{gap: 20, paddingTop: insets.top, margin: 20}}>
      <PopoutTile
        style={{width: 200, height: 100}}
        item={DATA.testCollection[0]}
        onTap={viewRef => {
          const item = DATA.testCollection[0];
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, item);
        }}
      />
      <PopoutTile
        style={{width: 100, height: 200}}
        item={DATA.testCollection[1]}
        onTap={viewRef => {
          const item = DATA.testCollection[1];
          setOverlayUnderNotch(false);
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, item);
        }}
      />
      <PopoutTile
        style={{width: screenWidth - 40, height: screenWidth - 40}}
        item={DATA.testCollection[2]}
        onTap={viewRef => {
          const item = DATA.testCollection[2];
          setOverlayUnderNotch(false);
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, item);
        }}
      />
    </ScrollView>
  );
};

export default Overview;
