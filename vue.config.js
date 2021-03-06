module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/regime/' : '/',
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '192.168.0.16:8080',
    proxy: {
      "^/api": {
        target: "http://localhost:8081/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.transformAssetUrls = {
          img: "src",
          image: "xlink:href",
          "b-avatar": "src",
          "b-img": "src",
          "b-img-lazy": ["src", "blank-src"],
          "b-card": "img-src",
          "b-card-img": "src",
          "b-card-img-lazy": ["src", "blank-src"],
          "b-carousel-slide": "img-src",
          "b-embed": "src",
        };

        return options;
      });
  },
};