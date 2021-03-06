import { FunctionComponent } from 'react';

import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import { store } from 'redux/store'
import { Provider } from 'react-redux'

import {  QueryClient, QueryClientProvider } from 'react-query'

import createEmotionCache from 'utility/createEmotionCache';
import lightThemeOptions from 'styles/theme/lightThemeOptions';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import { Layout } from '@components';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const queryClient = new QueryClient()


const MyApp: FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
   
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider  store={store}>
      <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        </Layout>
        </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;