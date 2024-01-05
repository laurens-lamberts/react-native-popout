import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PopoutRootView, {
  PopoutOverlayContent,
} from 'react-native-popout-transition';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NetflixExample from './NetflixExample';

const Example1 = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
        <PopoutRootView>
          <NetflixExample />
        </PopoutRootView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Example1;
