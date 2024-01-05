import React from 'react';
import PopoutRootView from 'react-native-popout-transition';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Overview from './Overview';

const Minimal = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PopoutRootView>
        <Overview />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default Minimal;
