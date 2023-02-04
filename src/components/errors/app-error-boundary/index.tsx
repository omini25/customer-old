import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error-fallback';

const AppErrorBoundary: FC = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default AppErrorBoundary;
