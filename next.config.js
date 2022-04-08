// module.exports = {
//   reactStrictMode: true,
// }
const withTM = require("next-transpile-modules")(["react-simple-captcha"]);

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

module.exports = withTM({
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
});

// module.exports = {
//   async headers() {
//     return [
//       {
//         // Apply these headers to all routes in your application.
//         source: "/:path*",
//         headers: securityHeaders,
//       },
//     ];
//   },
// };
