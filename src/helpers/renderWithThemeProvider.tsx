import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../assets/styles/theme';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import MainContainerApp from '../components/templates/MainContainer/MainContainer';
import GeneralProvider from '../providers/GeneralProvider';

export const renderWithThemeProvider = (elem: any) =>
  render(
    <GeneralProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainContainerApp>{elem}</MainContainerApp>
        </ThemeProvider>
      </BrowserRouter>
    </GeneralProvider>
  );
