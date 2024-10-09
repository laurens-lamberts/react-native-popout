import React, {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  PopoutTile,
  PopoutContext,
  PopoutOverlayContent,
} from 'react-native-popout';
import Row from '../../components/Row';
import {DATA, ROWS} from '../../content/content';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Overview = () => {
  const insets = useSafeAreaInsets();
  const {elementOpened} = useContext(PopoutContext);

  return (
    <ScrollView
      contentContainerStyle={{gap: 20, margin: 20, marginTop: insets.top}}>
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
          <Row scrollEnabled={!elementOpened} style={{marginHorizontal: -20}}>
            {DATA.testCollection.map((item, index) => (
              <PopoutTile
                key={item.id}
                item={item}
                overlayUnderNotch={false}
                OverlayComponent={() => (
                  <PopoutOverlayContent
                    item={DATA.testCollection[index]}
                    textColor="white"
                  />
                )}
              />
            ))}
          </Row>
        </View>
      ))}
    </ScrollView>
  );
};

export default Overview;
