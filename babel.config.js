module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin", // 기존 플러그인
			["module:react-native-dotenv"], // 추가된 dotenv 플러그인
		],
	};
};
