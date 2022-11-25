import React, {Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import {ComponentStorage} from "./componentStorage";
import {RecoilRoot} from "recoil";


export const dynamicFederation = async (scope, module) => {
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  return await container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};

const RemoteApp = React.lazy(() => dynamicFederation('app2', './RemoteApp'));


const App = () => {
  let [atom,setAtom] = useState(null);
  useEffect(()=>{
    dynamicFederation('app2', './Atoms').then(
        (r)=>{
          setAtom(r.nameAppState);
        }
    );

  },[]);
  return (
    <RecoilRoot>
      <div>
        Welcome to Host App RECOIL
        <div>
          <Suspense fallback="Loading...">
            <RemoteApp/>
            <ComponentStorage atom={atom}/>
          </Suspense>
        </div>
      </div>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
