import React, { useState } from 'react'
import QrReader from 'react-qr-scanner-ios'
import store from './store';
function Scanner(props) {
    const { qrValue, setQrValue, switchToForm, initialFormValues, setInitialFormValues } = props;
    const [errTxt, setErrTxt] = useState('');
    const [debugMsg, setDebugMsg] = useState('');
    const [debugHandleMsg, setDebugHandleMsg] = useState('');
    const scannerRef = React.createRef();
    const legacyMode = flase;
    const scanUrl = 'https://acccncheckin.azurewebsites.net/api/scan?param=';
    return (
        <div className="App">
            <header className="App-header">
                <QrReader
                    ref={scannerRef}
                    legacyMode={legacyMode}
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
                                } else if (text.startsWith(scanUrl)) {
                                    const b64 = text.substr(scanUrl.length);
                                    const buf = Buffer.from(b64, 'base64').toString();
                                    const parts = buf.split('&');
                                    const json = parts.reduce((acc, p) => {
                                        const pp = p.split('=');
                                        acc[decodeURIComponent(pp[0])] =  decodeURIComponent(pp[1]).trim();
                                        return acc;
                                    }, {});
                                    setInitialFormValues(json);
                                    switchToForm();
                                }
                                else {
                                    setErrTxt(`Got bad text ${text}`);
                                }
                            }
                        }
                    }}
                />
                {
                    legacyMode && <a href='#'
                        onClick={
                            e => {
                                scannerRef.current.openImageDialog();
                            }
                        }
                    >File</a>
                }
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
                <p>{initialFormValues.name} {initialFormValues.email} { initialFormValues.role}</p>
                <p>{errTxt}</p>
            </header>
        </div>
    );
}

export default Scanner;