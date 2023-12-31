const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const thirdPartyPath = path.resolve(__dirname + '/../package/'); // Path of your local module

const thirdParty = {
  your_module_name: thirdPartyPath,
};
const watchFolders = [thirdPartyPath];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // existing dependencies
  resolver: {
    thirdParty,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
