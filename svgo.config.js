module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false
        },
      },
    },
    "convertStyleToAttrs",
    {
      name: "convertColors",
      params: {
        currentColor: false,
        names2hex: true,
        rgb2hex: true,
        convertCase: "lower",
        shorthex: false,
        shortname: false
      }
    },
    {
      name: "inlineStyles",
      params: {
        onlyMatchedOnce: false
      }
    },
    {
      name: "removeAttrs",
      params: {
        attrs: ["g:*","path:id","path:data-name"],
        elemSeparator: ":",
        preserveCurrentColor: false
      }
    },
  ],
}
