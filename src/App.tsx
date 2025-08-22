import React from 'react';

import { ThemeProvider } from 'styled-components';

import PasswordGeneratorMain from './components/PasswordGeneratorMain';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const StyledThemeProvider = ThemeProvider as any;
const StyledGlobalStyle = GlobalStyle as any;

const App: React.FC = () => (
  <StyledThemeProvider theme={theme}>
    <div className="App">
      <PasswordGeneratorMain />
    </div>
    <StyledGlobalStyle />
  </StyledThemeProvider>
);

export default App;
