import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = lazy(() => import('../pages/ComponentsDemo'));
const ButtonDemo = lazy(() => import('../pages/ButtonDemo'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));

function LazyComponent({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading page..." size="md" />}>
      {children}
    </Suspense>
  );
}

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LazyComponent>
            <Home />
          </LazyComponent>
        }
      />
      <Route
        path="/button"
        element={
          <LazyComponent>
            <ButtonDemo />
          </LazyComponent>
        }
      />
      <Route
        path="/about"
        element={
          <LazyComponent>
            <About />
          </LazyComponent>
        }
      />
      <Route
        path="*"
        element={
          <LazyComponent>
            <NotFound />
          </LazyComponent>
        }
      />
    </Routes>
  );
}