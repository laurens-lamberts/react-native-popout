import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {PopoutTile, PopoutContext} from 'react-native-popout-transition';
import {DATA} from '../../content/content';
import Row from '../../components/Row';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MARGIN = 20;

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const {elementOpened, onElementTap, setOverlayComponent} =
    useContext(PopoutContext);

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
          onTap={viewRef => {
            setOverlayComponent(
              <View style={{margin: 20}}>
                <Text style={{color: 'white'}}>{item.title}</Text>
              </View>,
            );
            onElementTap(viewRef, DATA.testCollection[index]);
          }}
          style={{
            borderRadius: 20,
            width: screenWidth - MARGIN * 2,
            height: screenWidth - MARGIN * 2,
          }}
        />
      ))}
    </ScrollView>
  );
};

export default Overview;
