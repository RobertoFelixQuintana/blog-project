import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './helpers/privateRoute';
import { PublicRoute } from './helpers/publicRoute';
import Login from './containers/Login/Login.jsx';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import NotFound from './containers/NotMatch/NotFound.jsx';
import PostForm from './containers/Posts/CreatePost/CreateForm';
import ListPosts from './containers/Posts/ListPost/ListPosts';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ListPosts />} />
            <Route path="create-post" element={<PostForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
