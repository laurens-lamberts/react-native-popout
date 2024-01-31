import React, {useContext, useRef} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {PopoutTile, PopoutContext} from 'react-native-popout';
import {DATA} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const tileOriginContainerRef = useRef<ScrollView>();
  const {
    elementOpened,
    onElementTap,
    setOverlayComponent,
    setHasPanHandle,
    setOverlayBorderRadius,
    setTileOriginContainerRef,
    setDimmedOverlayBackdrop,
  } = useContext(PopoutContext);

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 20,
        paddingTop: insets.top,
        margin: 20,
      }}
      ref={tileOriginContainerRef}>
      <Text style={{color: 'white'}}>
        {`backdropBlur false
backdropScale false
landscape ratio
under notch`}
      </Text>
      <PopoutTile
        backdropBlur={false}
        backdropScale={true}
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
      <Text style={{color: 'white'}}>
        {`backdropBlur true
backdropScale false
portrait ratio
NOT under notch`}
      </Text>
      <PopoutTile
        backdropScale={false}
        style={{width: 100, height: 200}}
        item={DATA.testCollection[1]}
        overlayUnderNotch={false}
        onTap={viewRef => {
          const item = DATA.testCollection[1];
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, item);
        }}
      />
      <Text style={{color: 'white'}}>
        {`backdropBlur true
backdropScale true
portrait ratio
NOT under notch`}
      </Text>
      <PopoutTile
        style={{width: screenWidth - 40, height: screenWidth - 40}}
        item={DATA.testCollection[2]}
        overlayUnderNotch={false}
        onTap={viewRef => {
          const item = DATA.testCollection[2];
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, item);
        }}
      />
      <Text style={{color: 'white'}}>
        {`backdropBlur false
backdropScale false
landscape ratio
under notch
no pan handle
no overlay border radius
no dimmed overlay backdrop
with container ref`}
      </Text>
      <PopoutTile
        backdropBlur={false}
        backdropScale={true}
        style={{width: 200, height: 100}}
        item={DATA.testCollection[0]}
        onTap={viewRef => {
          const item = DATA.testCollection[0];
          setOverlayBorderRadius(0);
          setHasPanHandle(false);
          setTileOriginContainerRef(tileOriginContainerRef);
          setDimmedOverlayBackdrop(false);
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
