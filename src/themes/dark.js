import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";

const { theme: { colors }  } = resolveConfig(tailwindConfig);

// Converted automatically using ./tools/themeFromVsCode
var darkTheme = {
  plain: {
    color: colors.gray[100],
    backgroundColor: colors.gray[800],
  },
  styles: [{
    types: ["prolog"],
    style: {
      color: colors.indigo[600],
    }
  }, {
    types: ["comment"],
    style: {
      color: colors.gray[500],
    }
  }, {
    types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
    style: {
      color: colors.blue[300],
    }
  }, {
    types: ["number", "inserted"],
    style: {
      color: colors.emerald[300],
    }
  }, {
    types: ["constant"],
    style: {
      color: colors.violet[400],
    }
  }, {
    types: ["attr-name", "variable"],
    style: {
      color: colors.blue[200]
    }
  }, {
    types: ["deleted", "string", "attr-value", "template-punctuation"],
    style: {
      color: colors.red[300]
    }
  }, {
    types: ["selector"],
    style: {
      color: colors.yellow[200]
    }
  }, {
    // Fix tag color
    types: ["tag"],
    style: {
      color: colors.emerald[400]
    }
  }, {
    // Fix tag color for HTML
    types: ["tag"],
    languages: ["markup"],
    style: {
      color: colors.blue[400]
    }
  }, {
    types: ["punctuation", "operator"],
    style: {
      color: colors.gray[300]
    }
  }, {
    // Fix punctuation color for HTML
    types: ["punctuation"],
    languages: ["markup"],
    style: {
      color: colors.gray[400]
    }
  }, {
    types: ["function"],
    style: {
      color: colors.yellow[100]
    }
  }, {
    types: ["class-name"],
    style: {
      color: colors.violet[300]
    }
  }, {
    types: ["char"],
    style: {
      color: colors.red[200]
    }
  }]
};

export default darkTheme;
