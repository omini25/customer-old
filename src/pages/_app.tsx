import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { DefaultSeo } from 'next-seo';
import SEO from 'lib/seo/seo.config';
import AppErrorBoundary from 'components/errors/app-error-boundary';
import { NextComponentType } from 'next';
import { Layout } from 'components/lib';
import { LayoutProps } from 'components/lib/layout';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps?: LayoutProps };
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <AppErrorBoundary>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        {showNotice && (
          <div className="relative flex w-full justify-center bg-red-500 p-2 text-white">
            <span>
              The business dashboard has been moved{' '}
              <a className="rounded-md bg-black px-2" href="https://business.getdaabo.com.ng">
                here
              </a>
            </span>
            <button className="absolute right-4 my-auto" onClick={() => setShowNotice(false)}>
              <MdClose />
            </button>
          </div>
        )}
        <Layout {...(Component.layoutProps || {})}>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer hideProgressBar />
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default MyApp;
