import React, {useEffect} from 'react';
import {dynamicFederation} from "./bootstrap";
import { useSelector, useDispatch } from 'react-redux';
const reducer = async()=>{
    let r =  await dynamicFederation('app2', './Reducer')
    return r;
}
export const ComponentStorage = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state['remoteApp']);
    useEffect(()=>{
        reducer().then(x=>{
                dispatch(x.changeAppNameAction("CUALQUIER INFO..."))
        })
    },[]);
    return (
        <>COMPONENT HOST {state && state.appName}</>
    );
};
