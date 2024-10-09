import React, {useRef} from 'react';
import {Pressable, Text, View, useWindowDimensions} from 'react-native';
import {PopoutTile} from 'react-native-popout';
import {DATA} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const tileOriginContainerRef = useRef<ScrollView>();

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
        OverlayComponent={() => (
          <View style={{margin: 20}}>
            <Text style={{color: 'white'}}>overlay component</Text>
          </View>
        )}
        style={{width: 200, height: 100}}
        item={DATA.testCollection[0]}
      />
      <Text style={{color: 'white'}}>
        {`backdropBlur true
backdropScale false
portrait ratio
NOT under notch`}
      </Text>
      <PopoutTile
        backdropScale={false}
        OverlayComponent={() => (
          <View style={{margin: 20}}>
            <Text style={{color: 'white'}}>overlay component</Text>
          </View>
        )}
        style={{width: 100, height: 200}}
        item={DATA.testCollection[1]}
        overlayUnderNotch={false}
      />
      <Text style={{color: 'white'}}>
        {`backdropBlur true
backdropScale true
portrait ratio
NOT under notch`}
      </Text>
      <PopoutTile
        OverlayComponent={() => (
          <View style={{margin: 20}}>
            <Text style={{color: 'white'}}>{DATA.testCollection[2].title}</Text>
          </View>
        )}
        style={{width: screenWidth - 40, height: screenWidth - 40}}
        item={DATA.testCollection[2]}
        overlayUnderNotch={false}
      />
      <Text style={{color: 'white'}}>
        {`backdropBlur false
backdropScale false
landscape ratio
under notch
no pan handle
no overlay border radius
no dimmed overlay backdrop
with container ref
with custom close button`}
      </Text>
      <PopoutTile
        backdropBlur={false}
        backdropScale={true}
        overlayBorderRadius={0.1}
        hasPanHandle={false}
        dimmedOverlayBackdrop={false}
        tileOriginContainerRef={tileOriginContainerRef}
        OverlayComponent={() => (
          <View style={{margin: 20}}>
            <Text style={{color: 'white'}}>{DATA.testCollection[0].title}</Text>
          </View>
        )}
        CloseButtonComponent={({closeOverlay}) => (
          <Pressable
            onPress={closeOverlay}
            style={{
              position: 'absolute',
              top: insets.top + 6,
              right: 6,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'rgba(225,20,20,0.7)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
            }}>
            <Text style={{color: 'white'}}>×</Text>
          </Pressable>
        )}
        style={{width: 200, height: 100}}
        item={DATA.testCollection[0]}
      />
    </ScrollView>
  );
};

export default Overview;
