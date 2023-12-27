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

```sh
yarn add react-native-popout-transition
```

## Usage

```js
import { multiply } from 'react-native-popout-transition';

// ...

const result = await multiply(3, 7);
```

Make sure you added the following to your info.plist file `dict`, in order to support 120hz ProMotion iPhone performance:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
