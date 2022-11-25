import React, {useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
const temp = ()=>{
    return (<></>);
}
const register =(callback)=>{
    window.addEventListener("message", (event) => {
        if(event.data.id==="appName"){
            console.log("HOST", event);
            callback(event.data.message);
        }
    }, false);
}

export const ComponentStorage = (prop) => {
    const [name,setName] = useState('');
    useEffect(()=>{
        register(setName);
    },[])

    const evento = ()=>{
        window.postMessage("recoil","*");
    }
    return (
        <>
            COMPONENT HOST {name}
            <button onClick={evento}>evento</button>
        </>
    );
};
