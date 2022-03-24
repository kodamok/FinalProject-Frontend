import * as React from 'react';
import '../helpers/matchMedia';
import { fireEvent, screen } from '@testing-library/react';
import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { renderWithThemeProvider } from '../helpers/renderWithThemeProvider';
import HomePage from '../components/templates/HomePage/HomePage';
import App from '../view/App';
import ClientsOrProjects from '../components/templates/Admin_ClientsOrProjects/ClientsOrProjects';
import Login from '../components/templates/Login/LogIn';

beforeEach(() => {
  i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ['en', 'de'],
      fallbacks: true,
      fallbackLng: 'en',
      whitelist: 'en',
      debug: false,
      // Options for language detector
      detection: {
        order: [
          'cookie',
          'localStorage',
          'sessionStorage',
          'navigator',
          'htmlTag',
          'querystring',
          'path',
          'subdomain'
        ],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18n',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage', 'cookie']
      },
      backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
      },
      react: {
        useSuspense: false
      }
    } as any);
});

describe('Test Snapshots', () => {
  it('Simple Test', () => {
    expect(2 + 2).toBe(4);
  });

  it('<HomePage />', () => {
    const comp = renderWithThemeProvider(<HomePage />);
    expect(comp.container.firstChild).toMatchSnapshot();
  });

  it('<App />', () => {
    const comp = renderWithThemeProvider(<App />);
    expect(comp.container.firstChild).toMatchSnapshot();
  });

  it('<ClientsOrProjects />', () => {
    const comp = renderWithThemeProvider(<ClientsOrProjects />);
    expect(comp.container.firstChild).toMatchSnapshot();
  });

  it('<Login />', () => {
    const comp = renderWithThemeProvider(<Login />);
    fireEvent.click(screen.getByText('Login'));
    setTimeout(() => {
      screen.getByText('Oops');
    }, 1000);
    expect(comp.container.firstChild).toMatchSnapshot();
  });
});

// const TYPE_NUMBER = 'number';
//
// export function add(a: any, b: any) {
//   // First check if a and b exist (zero is an allowed value), then check their types are correct
//   // eslint-disable-next-line valid-typeof
//   if ((a || a === 0) && (b || b === 0) && typeof a === TYPE_NUMBER && typeof b === TYPE_NUMBER) {
//     return a + b;
//   }
//   // If there's anything wrong with the input data, return false
//   return false;
// }
//
// const tests = [
//   // First check the happy path - the normal inputs expected to get an output
//   { inputs: [0, 0], expected: 0 },
//   { inputs: [0, 1], expected: 1 },
//   { inputs: [1, 1], expected: 2 },
//   { inputs: [1000, 1000], expected: 2000 },
//   // Now check the sad path - both extreme and strange inputs and what output they should give
//   { inputs: [100000000000000000, 100000000000000000], expected: 200000000000000000 },
//   { inputs: [false, false], expected: false },
//   { inputs: [null, null], expected: false },
//   { inputs: [undefined, undefined], expected: false },
//   { inputs: [NaN, NaN], expected: false },
//   { inputs: [false, false], expected: false }
// ];
//
// // Using forEach, lets loop over each test configuration, create a new Jest test for each of them,
// // and load in the test configuration into that test
// tests.forEach((config: any) => {
//   test(`Adding ${config.inputs[0]} and ${config.inputs[1]} should equal ${config.expected}`, () => {
//     expect(add.apply(this, config.inputs)).toEqual(config.expected);
//   });
// });
