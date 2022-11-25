import React, {Suspense, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import {ComponentStorage} from "./componentStorage";


export const dynamicFederation = async (scope, module) => {
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};

const RemoteApp = React.lazy(() => dynamicFederation('app2', './RemoteApp'));


const App = () => {
  return (
    <Provider store={store}>
      <div>
        Welcome to Host App REDUX
        <div>
          <Suspense fallback="Loading...">
            <RemoteApp store={store}>
            </RemoteApp>
            <ComponentStorage/>
          </Suspense>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
