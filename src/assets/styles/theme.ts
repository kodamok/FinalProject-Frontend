export const theme = {
  color: {
    main1: '#eae2b7',
    main2: '#001523',
    main3: '#9e0059',
    main4: '#fcbf49',
    main5: '#2A9D8F',
    main6: '#FF0054',
    main7: '#1F313E',
    main8: '#FFFFFF',
    main9: '#e76f51'
  },
  fontSizeInter: {
    xxl: '5.61rem',
    xl: '4.209rem',
    l: '3.157rem',
    ml: '2.369rem',
    m: '1.777rem',
    ms: '1.333rem',
    s: '1rem'
  },
  fontSizeOpenSans: {
    xxl: '2.488rem',
    xl: '2.074rem',
    l: '1.728rem',
    ml: '1.44rem',
    m: '1.2rem',
    ms: '1rem',
    xs: '0.833rem',
    xxs: '0.694rem',
    xxxs: '0.5793rem'
  },

  breakpoint: {
    s: '440px',
    sm: '720px',
    m: '1060px',
    l: '1440px'
  },
  boxShadow: {
    mainShadow: `0px 0.1px 0.1px rgba(0, 0, 0, 0.063), 0px 0.1px 0.3px rgba(0, 0, 0, 0.119),
    0px 0.2px 0.7px rgba(0, 0, 0, 0.17), 0px 0.3px 1.2px rgba(0, 0, 0, 0.216),
    0px 0.5px 2px rgba(0, 0, 0, 0.259), 0px 0.7px 3.2px rgba(0, 0, 0, 0.296),
    0px 1px 4.9px rgba(0, 0, 0, 0.326), 0px 1.5px 7.9px rgba(0, 0, 0, 0.348),
    0px 2.3px 13.6px rgba(0, 0, 0, 0.356), 0px 4px 27px rgba(0, 0, 0, 0.34);`
  },
  up: (breakpoint: string) => `@media (min-width: calc(${breakpoint} + 0.02px))`,
  down: (breakpoint: string) => `@media (max-width: ${breakpoint})`,
  between: (breakpoint: string, breakpoint2: string) =>
    `@media (min-width: calc(${breakpoint} + 0.02px)) and (max-width: ${breakpoint2})`
};
