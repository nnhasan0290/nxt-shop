module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0  0 20px #00000012",
      },
      keyframes: {
        pingFast: {
          "0%": { transform: "scale(0); opacity:.5" },
          "100%": { transform: "scale(1.1); opacity: 0" },
        },
      },
      animation: {
        pingFast: "pingFast 1.6s linear infinite",
        pingSlow: "pingFast .8s linear infinite",
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [],
};
