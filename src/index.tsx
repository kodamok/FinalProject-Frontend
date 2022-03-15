import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { BrowserRouter } from 'react-router-dom';
import GeneralProvider from './providers/GeneralProvider';
import 'sanitize.css/sanitize.css';
import 'flag-icons/css/flag-icons.min.css';
import reportWebVitals from './reportWebVitals';
import App from './view/App';
import { LoadingSpin } from './components/atoms/LoadingSpin/LoadingSpin';

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
    }
  } as any);

ReactDOM.render(
  <Suspense fallback={<LoadingSpin />}>
    <React.StrictMode>
      <GeneralProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
