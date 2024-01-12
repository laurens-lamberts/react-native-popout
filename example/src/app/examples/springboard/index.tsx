import React from 'react';
import PopoutRootView from 'react-native-popout';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Overview from './Overview';
import Wallpaper from './Wallpaper';

const Springboard = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <Wallpaper />
      <PopoutRootView>
        <Overview />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default Springboard;
