import React, { useState } from 'react'
import QrReader from 'react-qr-scanner-ios'
import store from './store';
function Scanner(props) {
    const { qrValue, setQrValue, switchToForm } = props;
    const [errTxt, setErrTxt] = useState('');
    const [debugMsg, setDebugMsg] = useState('');
    const [debugHandleMsg, setDebugHandleMsg] = useState('');

    return (
        <div className="App">
            <header className="App-header">
                <QrReader
                    delay={500}
                    facingMode="rear"
                    isIos={true}
                    style={{
                        height: 500,
                        width: 500,
                    }}
                    onError={err => {
                        setErrTxt(err.message);
                    }}
                    setDebugMsg={(msg, msg1) => {
                        if (msg === 'handleWorkerMessage') {
                            setDebugHandleMsg(msg1)
                        } else if (msg === 'checkCount') {
                            setDebugMsg(msg1)
                        } else setDebugMsg(msg)

                    }}
                    onScan={obj => {
                        if (obj) {
                            let text = obj.text;
                            if (typeof obj === 'string') {
                                text = obj;
                            }
                            if (text === ' ') text = '';
                            if (text) {
                                if (text.startsWith(store.QRPREFIX)) {
                                    setQrValue(text);
                                    switchToForm();
                                } else {
                                    setErrTxt(`Got bad text ${text}`);
                                }
                            }
                        }
                    }}
                />
                <a
                    className="App-link"
                    href="https://www.acccn.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Acccn QR Scanner v1
                </a>
                <p>{ qrValue}</p>
                <p>debugHandleMsg ${debugHandleMsg}</p>
                <p>{errTxt}</p>
            </header>
        </div>
    );
}

export default Scanner;