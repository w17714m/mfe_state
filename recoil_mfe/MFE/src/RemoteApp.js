import React, {useState} from 'react';
import {useEffect} from 'react';
import {
    RecoilRoot, useRecoilState
} from 'recoil';
import {nameAppState} from "./atoms";

const RemoteApp = () => {
    const [ nameApp, setNameApp ] = useRecoilState(nameAppState);
    const [ remoteAppInput, setRemoteAppInput ] = useState('');
    useEffect(()=>{
        window.addEventListener("message", (event) => {
            if(event.data==='recoil'){
                setNameApp("UPDATE CROSS DOMAIN");
                event.source.postMessage({response:true,message:"UPDATE CROSS DOMAIN"},event.origin);
            }
        }, false);
    },[])



    return (
        <div style={{marginTop: '10px'}}>
            <div>RemoteApp</div>
            <div>RemoteApp's name from the redux store : {nameApp}</div>

            <div>
                <input
                    style={{marginRight: '10px'}}
                    type="text"
                    onChange={e => {
                        setRemoteAppInput(e.target.value);
                    }}
                />
                <button onClick={() => setNameApp(remoteAppInput)}>
                    Dispatch RemoteApp new name
                </button>
            </div>
        </div>
    );
};

const RemoteAppWrapper = (props) => {

    useEffect(() => {

    }, []);

    return (
        <>
            <RecoilRoot>
                <RemoteApp/>
                {props.children}
            </RecoilRoot>
        </>
    );
};

export default RemoteAppWrapper;
