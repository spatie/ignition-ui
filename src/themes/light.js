import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwindcss/defaultConfig";

const { theme: { colors }  } = resolveConfig(tailwindConfig);

// Converted automatically using ./tools/themeFromVsCode
var lightTheme = {
  plain: {
    color: colors.gray['800'],
    backgroundColor: colors.white
  },
  styles: [{
    types: ["comment"],
    style: {
      color: colors.gray['500'],
    }
  }, {
    types: ["builtin"],
    style: {
      color: colors.indigo['400']
    }
  }, {
    types: ["number", "variable", "inserted"],
    style: {
      color: colors.emerald['600']
    }
  }, {
    types: ["operator"],
    style: {
      color: colors.gray['800']
    }
  }, {
    types: ["constant", "char"],
    style: {
      color: colors.violet['700']
    }
  }, {
    types: ["tag"],
    style: {
      color: colors.red['700']
    }
  }, {
    types: ["attr-name"],
    style: {
      color: colors.red['500']
    }
  }, {
    types: ["deleted", "string"],
    style: {
      color: colors.red['600']
    }
  }, {
    types: ["changed", "punctuation"],
    style: {
      color: colors.indigo['500']
    }
  }, {
    types: ["function", "keyword"],
    style: {
      color: colors.indigo['600']
    }
  }, {
    types: ["class-name"],
    style: {
      color: colors.blue['500']
    }
  }]
};

export default lightTheme;
