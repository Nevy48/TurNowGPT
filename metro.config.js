const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(process.cwd());
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
