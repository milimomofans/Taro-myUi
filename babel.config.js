/* eslint-disable import/no-commonjs */
const apis = require('@tarojs/taro-h5/dist/taroApis')

// module.exports = {
//   presets: [
//     [
//       '@babel/env',
//       {
//         spec: true,
//         useBuiltIns: false
//       }
//     ]
//   ],
//   plugins: [
//     '@babel/plugin-proposal-class-properties',
//     [
//       '@babel/plugin-transform-react-jsx',
//       {
//         pragma: 'Nerv.createElement'
//       }
//     ],
//     ['@babel/plugin-proposal-object-rest-spread'],
//     ['babel-plugin-transform-taroapi', {
//       apis,
//       packageName: '@tarojs/taro-h5'
//     }]
//   ]
// }

module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/env',
      {
        spec: true,
        useBuiltIns: false
      }
    ]
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'Nerv.createElement'
      }
    ],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['babel-plugin-transform-taroapi', {
      apis,
      packageName: '@tarojs/taro-h5'
    }]
  ];

  return {
    presets,
    plugins
  };
}
