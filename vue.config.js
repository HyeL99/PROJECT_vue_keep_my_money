module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style/_variables.scss";
          @import "@/assets/style/_themes.scss";
          @import "@/assets/style/_reset.scss";
          @import "@/assets/style/_common.scss";
        `,
      },
    },
  },
};
