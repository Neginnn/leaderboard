/* eslint-disable @next/next/no-sync-scripts */
import { ReactElement, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Global as GlobalStyles } from '@emotion/react';
import { QueryClientProvider as ReactQueryProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Layout } from '@/components/_common/Layout';
import { Meta } from '@/components/_common/Meta';
import { Scripts } from '@/components/_common/Scripts';
import { TrackingScripts } from '@/components/TrackingScripts';
import { isEnvironment } from '@/helpers/environment';
import { theme } from '@/styles/chakraTheme';
import globalStyles from '@/styles/global';

const queryClient = new QueryClient();

function NeginTest({ Component, pageProps }: any) {
  const { layoutValues } = pageProps;
  const isProduction = isEnvironment('prod');

  useEffect(() => {
    if (!isProduction)
      console.log('🚨 Triggered NeginTest Reload. (This should only render once.)');
  }, [isProduction]);

  const getMainLayout = (page: ReactElement) => {
    return <Layout layoutValues={{ ...layoutValues }}>{page}</Layout>;
  };

  // https://nextjs.org/docs/basic-features/layouts
  // when getLayout property exists at the page level,
  // it lets us _define_ the layout on a per-page basis, IE header, footer, disclaimer.
  // if getLayout property does not exist, getMainLayout
  const getLayout = Component.getLayout || ((page: ReactElement) => getMainLayout(page));

  return (
    <>
      <Meta />
      <TrackingScripts />
      <Scripts />
      <ReactQueryProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <GlobalStyles styles={globalStyles} />
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </ReactQueryProvider>
    </>
  );
}

export default NeginTest;
