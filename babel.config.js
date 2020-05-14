const presets = ['@babel/preset-env', '@babel/preset-react'];
const plugins = [];

if (!process.env.NODE_ENV.match(/test/i)) {
    plugins.push(['import', { libraryName: 'antd', libraryDirectory: 'src', style: 'css' }]);
}

module.exports = { presets, plugins };
