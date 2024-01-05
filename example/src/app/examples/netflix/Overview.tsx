import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {
  PopoutTile,
  PopoutContext,
  PopoutOverlayContent,
} from 'react-native-popout-transition';
import Row from '../../components/Row';
import {DATA, ROWS} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {elementOpened, onElementTap, setOverlayComponent} =
    useContext(PopoutContext);

  return (
    <ScrollView contentContainerStyle={{gap: 20, paddingTop: insets.top}}>
      {ROWS.map(rowData => (
        <View key={rowData.id} style={{gap: 8}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {rowData.title}
          </Text>
          <Row scrollEnabled={!elementOpened}>
            {DATA.testCollection.map((item, index) => (
              <PopoutTile
                key={item.id}
                item={item}
                onTap={viewRef => {
                  setOverlayComponent(
                    <PopoutOverlayContent
                      item={DATA.testCollection[index]}
                      textColor="white"
                    />,
                  );
                  onElementTap(viewRef, DATA.testCollection[index]);
                }}
                // isOpened={elementOpened?.id === item.id}
              />
            ))}
          </Row>
        </View>
      ))}
    </ScrollView>
  );
};

export default Overview;
