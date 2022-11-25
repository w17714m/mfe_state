import {
  atom
} from 'recoil';

export const nameAppState = atom({
      key: 'appName',
      default: 'appName',
      effects:[
        ({storeID,onSet,node})=>{
          onSet((val)=>{
            console.log("ATOMS events");
            window.postMessage({id:node.key,message:val},"*");
          })
        }
      ]
    }
);
