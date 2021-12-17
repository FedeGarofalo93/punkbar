import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Beers from './containers/beers/Beers'
import Layout from './containers/layout/Layout';
import OrderDetails from './containers/order/OrderDetails';

/**
 * Main application router.
 * @author Federico Garofalo (federico.garofalo@checkbox.ar)
 */
const MainRouter = () => {
  return (
    <main>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/beers" />}
            />
            <Route exact path="/beers" element={<Beers />} />
            <Route exact path="/order" element={<OrderDetails />} />
            <Route
              path="*"
              element={<Navigate to="/beers" />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </main>
  );
};

export default MainRouter;
