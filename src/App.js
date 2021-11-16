import './App.css';
import React, { useEffect, useState } from 'react'
import QrReader from 'react-qr-scanner-ios'

function App() {
  const [result, setResult] = useState();
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
          setDebugMsg={(msg,msg1) => {
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
                setResult(text);
              }
            }
          }}
        />
        <p>Result={result}</p>
        <a
          className="App-link"
          href="https://www.acccn.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acccn QR Scanner Test rear-
        </a>
        <p>debugHandleMsg ${debugHandleMsg}</p>
        <p>{debugMsg}</p>
        <p>{errTxt}</p>
      </header>
    </div>
  );
}

export default App;
