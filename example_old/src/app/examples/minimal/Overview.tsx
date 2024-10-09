import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PopoutTile} from 'react-native-popout';
import {DATA} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Overview = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={{gap: 20, paddingTop: insets.top}}>
      {DATA.testCollection.map((item, index) => (
        <PopoutTile
          key={item.id}
          item={item}
          OverlayComponent={() => (
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>
          )}
        />
      ))}
    </ScrollView>
  );
};

export default Overview;
