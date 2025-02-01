# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- added disableBlur option for overlay backdrop
- removed white tile background
- fixed close button fallback

## [0.1.15-2] - 2025-02-01

- marked optional params optional
- attempt to fix disabling blur

## [0.1.15-1] - 2025-02-01

- Updated dev dependencies
- replaced createAnimatedComponent(Canvas) with the canvas wrapped by an animated view

## [0.1.14] - 2024-04-27

- Removed type re-export from index as it goes missing when turning to JS

## [0.1.13] - 2024-02-01

- Corrected custom CloseButton component and added progress opacity to it.
- Type-fixes for custom overlay- and close components.

## [0.1.12] - 2024-02-01

- Added `onClose` callback to `PopoutTile` component
- Added custom CloseButton to `PopoutTile` component
- Renamed components to have Pascal-casing

## [0.1.11] - 2024-01-31

- turned all overlay configuration into PopoutTile params, removing the need for reading the context from your project. This also looks better in code. OnTap is now an optional param.

## [0.1.10] - 2024-01-31

- `clamp` instead of `decal` blur on overlay backdrop when it is not dimmed

## [0.1.9] - 2024-01-31

- Added config for dimmedOverlayBackdrop

## [0.1.8] - 2024-01-31

- setTileOriginContainerRef now provides an option to indicate what root container to use for the tile origin. This is useful when the tile is not a direct child of the root container, but instead in a bottomsheet or any other container that is not occupying the full screen.

- Optimization not to make a screenshot for blurring / scaling when both those features are disabled.

## [0.1.7] - 2024-01-31

- added configurability for pan handler
- added configurability for overlay border radius

## [0.1.6] - 2024-01-29

- Much smoother transition by transitioning the backdrop image into the tile image.
- Fixed overlay backdrop blur (was not properly blurred)

## [0.1.5] - 2024-01-24

- Interpolated backdrop blur- and scale based on the pan gesture. This now also ensures the scale of the backdrop is back to it's original form for the overlay to properly animate into the position of the tile.

- Fixed user scroll on space outside of tiles.
- Corrected to-tile animation border radius interpolation
- Cleanup and performance improvements.

## [0.1.4] - 2024-01-13

- Corrected pan-down close animation

## [0.1.3] - 2024-01-13

- Now working for Android as well.

## [0.1.2] - 2024-01-13

- Smoother transition easing
- Corrected backdrop scale effect transition
- Proper clipping and border radius transition going from tile aspect-ratio to the overlay one. (TODO: make image position vertically centered)
- Made more configurable

## [0.1.1] - 2024-01-06

- Added README.md to package.

## [0.1.0] - 2024-01-06

- Initial preview release.

[unreleased]: https://github.com/laurens-lamberts/react-native-popout/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/laurens-lamberts/react-native-popout/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/laurens-lamberts/react-native-popout/releases/tag/v0.1.0
