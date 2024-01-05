import React, {useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  PopoutTile,
  PopoutContext,
  PopoutOverlayContent,
} from 'react-native-popout-transition';
import Row from '../../components/Row';
import {DATA, ROWS} from '../../content/content';

const NetflixExample = () => {
  const {elementOpened, onElementTap, setOverlayComponent} =
    useContext(PopoutContext);

  return (
    <SafeAreaView style={{gap: 20}}>
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
                  onElementTap(viewRef, DATA.testCollection[index]);
                  setOverlayComponent(
                    <PopoutOverlayContent
                      item={DATA.testCollection[index]}
                      textColor="white"
                    />,
                  );
                }}
                // isOpened={elementOpened?.id === item.id}
              />
            ))}
          </Row>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default NetflixExample;
