import React from 'react';
import PopoutRootView from 'react-native-popout';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Overview from './Overview';

const Testing = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PopoutRootView>
        <Overview />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default Testing;
