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
  up: (breakpoint: string) => `@media (min-width: calc(${breakpoint} + 0.02px))`,
  down: (breakpoint: string) => `@media (max-width: ${breakpoint})`,
  between: (breakpoint: string, breakpoint2: string) =>
    `@media (min-width: calc(${breakpoint} + 0.02px)) and (max-width: ${breakpoint2})`
};
