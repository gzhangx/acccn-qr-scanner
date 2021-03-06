import './App.css';
import React, { useEffect, useState } from 'react'
import Scanner from './Scanner';
import { Tabs, Tab } from 'react-bootstrap'
import RegisterForm from './RegisterForm';

function App() {
  const [tabKey, setTabKey] = useState('scanEvent');
  const [qrValue, setQrValue] = useState('');
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: '',
    role: '',
    count:1,
    id: ''
  });
  return (
    <div className="App">
      <Tabs defaultActiveKey="scanEvent" id="mainTabs" className="mb-3" activeKey={ tabKey} onSelect={
        k=>setTabKey(k)
       }>
        <Tab eventKey="scanEvent" title="Scan">
          <div>
            <Scanner inScanMode={tabKey === 'scanEvent'}
              setInitialFormValues={setInitialFormValues}
              initialFormValues={initialFormValues}
              qrValue={qrValue} setQrValue={setQrValue} switchToForm={() => {
                setTabKey('registerEvent');
              }}
            />
            <p>{initialFormValues?.name}</p>
          </div>
          </Tab>
          <Tab eventKey="registerEvent" title="Register">
          <RegisterForm qrValue={qrValue} setQrValue={setQrValue} initialFormValues={initialFormValues}
            setInitialFormValues={setInitialFormValues}
          />
          </Tab>
        </Tabs>
      </div>
  );
}

export default App;
