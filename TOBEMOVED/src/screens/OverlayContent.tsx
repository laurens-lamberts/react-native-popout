import React from 'react';
import {Text, View} from 'react-native';
import {TileInfo} from './Overview';
import {ScrollView} from 'react-native-gesture-handler';

const OverlayContent = ({
  item,
  textColor,
}: {
  item: TileInfo;
  textColor: string;
}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'rgba(102, 119, 136, 0.3)',
          padding: 12,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          {item.title}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 20,
          padding: 12,
        }}>
        <Text
          style={{
            color: textColor,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
          facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
          nunc non hendrerit finibus, massa nunc blandit ante, vitae tincidunt
          est eros id nunc. Sed vitae lorem et libero tincidunt molestie. Donec
          sit amet libero eget mi aliquam aliquet. Nullam id augue quis enim
          lacinia consequat. Maecenas vitae nunc eget diam ultrices lacinia.
          Donec euismod ultricies nunc, sed aliquet nunc commodo vitae. Nulla
          facilisi. Morbi et lorem at nisl aliquet luctus. Sed quis rhoncus
          nisi. Nullam vitae libero quis turpis aliquam ultricies eget eget
          elit. Nullam eget nisl vel ipsum aliquam molestie. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
          facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
          nunc non hendrerit finibus, massa nunc blandit ante, vitae tincidunt
          est eros id nunc. Sed vitae lorem et libero tincidunt molestie. Donec
          sit amet libero eget mi aliquam aliquet. Nullam id augue quis enim
          lacinia consequat. Maecenas vitae nunc eget diam ultrices lacinia.
          Donec euismod ultricies nunc, sed aliquet nunc commodo vitae. Nulla
          facilisi. Morbi et lorem at nisl aliquet luctus. Sed quis rhoncus
          nisi. Nullam vitae libero quis turpis aliquam ultricies eget eget
          elit. Nullam eget nisl vel ipsum aliquam molestie. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
          facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
          nunc non hendrerit finibus, massa nunc blandit ante, vitae tincidunt
          est eros id nunc. Sed vitae lorem et libero tincidunt molestie. Donec
          sit amet libero eget mi aliquam aliquet. Nullam id augue quis enim
          lacinia consequat. Maecenas vitae nunc eget diam ultrices lacinia.
          Donec euismod ultricies nunc, sed aliquet nunc commodo vitae. Nulla
          facilisi. Morbi et lorem at nisl aliquet luctus. Sed quis rhoncus
          nisi. Nullam vitae libero quis turpis aliquam ultricies eget eget
          elit. Nullam eget nisl vel ipsum aliquam molestie. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </Text>
        <Text
          style={{
            color: textColor,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          eget velit vitae erat blandit aliquam. Suspendisse potenti. Nulla
          facilisi. Nullam at ante vitae sem aliquam aliquet. Donec euismod,
          nunc non hendrerit finibus, massa nunc blandit ante, vitae tincidunt
          est eros id nunc. Sed vitae lorem et libero tincidunt molestie. Donec
          sit amet libero eget mi aliquam aliquet. Nullam id augue quis enim
          lacinia consequat. Maecenas vitae nunc eget diam ultrices lacinia.
          Donec euismod ultricies nunc, sed aliquet nunc commodo vitae. Nulla
          facilisi. Morbi et lorem at nisl aliquet luctus. Sed quis rhoncus
          nisi. Nullam vitae libero quis turpis aliquam ultricies eget eget
          elit. Nullam eget nisl vel ipsum aliquam molestie. Nulla facilisi.
          Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </Text>
      </ScrollView>
    </View>
  );
};

export default OverlayContent;
