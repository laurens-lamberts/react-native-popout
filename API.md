# API Specification

## [`PopoutRootView`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22PopoutRootView%22%5D "package/src/components/PopoutRootView.tsx")

[`PopoutRootView`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22PopoutRootView%22%5D "package/src/components/PopoutRootView.tsx") is a React component that serves as the root view for the popout transition. It should wrap the main content of your app.

### Props

- [`children`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22children%22%5D "package/src/components/PopoutRootView.tsx"): ReactNode - The main content of your app.

### Usage

```typescript
import PopoutRootView from "<your-library-name>";

// In your component's render method:
<PopoutRootView>{/* Your app's content */}</PopoutRootView>;
```

## [`PopoutTile`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutTile.tsx%22%2C%22PopoutTile%22%5D "package/src/components/PopoutTile.tsx")

[`PopoutTile`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutTile.tsx%22%2C%22PopoutTile%22%5D "package/src/components/PopoutTile.tsx") is a React component that represents a tile in the popout transition.

### Props

- [`children`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22children%22%5D "package/src/components/PopoutRootView.tsx"): ReactNode - The content of the tile.
- [`style`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutTile.tsx%22%2C%22style%22%5D "package/src/components/PopoutTile.tsx"): Object - The style object for the tile.

### Usage

```typescript
import { PopoutTile } from "<your-library-name>";

// In your component's render method:
<PopoutTile style={{ width: 100, height: 100 }}>
  {/* Your tile's content */}
</PopoutTile>;
```

## [`PopoutContext`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22PopoutContext%22%5D "package/src/components/PopoutRootView.tsx")

[`PopoutContext`](command:_github.copilot.openSymbolInFile?%5B%22package%2Fsrc%2Fcomponents%2FPopoutRootView.tsx%22%2C%22PopoutContext%22%5D "package/src/components/PopoutRootView.tsx") is a React context that provides the state and actions for the popout transition.

### Values

- `elementOpened`: PopoutTileType | null - The currently opened popout tile, or null if no tile is opened.
- `onElementTap`: Function - A function to be called when a popout tile is tapped. It receives a reference to the Animated.View and the tapped PopoutTileType item.
- `OverlayComponent`: React.ComponentType | null - The component to be rendered as an overlay, or null if no overlay should be rendered.
- `setOverlayComponent`: Function - Function to set the OverlayComponent. It receives a React.ComponentType or null.
- `overlayUnderNotch`: boolean - Boolean indicating whether the overlay should be rendered under the notch.
- `setOverlayUnderNotch`: Function - Function to set the overlayUnderNotch property. It receives a boolean.

### Usage

```typescript
import { useContext } from "react";
import { PopoutContext } from "react-native-popout";

// In your component:
const {
  elementOpened,
  onElementTap,
  OverlayComponent,
  setOverlayComponent,
  overlayUnderNotch,
  setOverlayUnderNotch,
} = useContext(PopoutContext);
```
