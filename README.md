# react-native-popout-transition

A popout-style transition using reanimated, skia and gesture handler

TODO: enter video here

Features;

- Custom renderings in both the tile and popout.
- Popout animates from- and to the tile.
- Drag the popout more than 200px down to close it.
- Optional blur of the entire screen behind the popout.
- Optional blurred image background for the popout.

Libraries used;

- `reanimated` (for the transition animation)
- `react-native-skia` (for image effects).
- `react-native-gesture-handler` (for dragging the popout)
- `react-native-safe-area-context` (to ensure the popout renders below a notch, if applicable)

Inspired by the `Netflix`, `Balance` and `App Store` iOS apps.

I find this transition to be natural and visually pleasing. Using the `reanimated` library, it is possible to create a smooth transition between the tile and the popout. Using the `react-native-skia` library, it is possible to add a blur effect to the background of the popout. This makes the popout stand out from the rest of the app, and makes it easier to focus on the popout. The 'react-native-gesture-handler' library is used to make the popout draggable. This makes it possible to close the popout by dragging it down.

## Installation

To install the library, navigate to your project directory and run:

```bash
npm install --save react-native-popout-transition
```

or if you are using Yarn:

```bash
yarn add react-native-popout-transition
```

and if not yet present in your project, install the following packages;

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context @shopify/react-native-skia
```

Make sure you added the following to your info.plist file `dict`, in order to support 120hz ProMotion iPhone performance:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

## Usage

Here's a minimal example of how to use the library:

### Your App.tsx / index.js file

```typescriptreact
import PopoutRootView from 'react-native-popout-transition';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Screen from './Screen';

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PopoutRootView>
        <Screen />
      </PopoutRootView>
    </SafeAreaProvider>
  );
};

export default App;
```

### Your Screen.tsx file (or a name of your choice)

```typescriptreact
import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {PopoutTile, PopoutContext, PopoutTileType} from 'react-native-popout-transition';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TEST_ITEM = {
  id: 0,
  title: 'Test',
  image: 'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}: PopoutTileType;

const Screen = () => {
  const insets = useSafeAreaInsets();
  const {onElementTap, setOverlayComponent} =
    useContext(PopoutContext);

  return (
    <View style={{paddingTop: insets.top}}>
      <PopoutTile
        item={TEST_ITEM}
        onTap={viewRef => {
          setOverlayComponent(
            <View style={{margin: 20}}>
              <Text style={{color: 'white'}}>{item.title}</Text>
            </View>,
          );
          onElementTap(viewRef, TEST_ITEM);
        }}
      />
    </View>
  );
};

export default Screen;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
