import './App.css';
import React, { useEffect, useState } from 'react'
import Scanner from './Scanner';
import { Tabs, Tab } from 'react-bootstrap'
import RegisterForm from './RegisterForm';

function App() {
  const [tabKey, setTabKey] = useState('scanEvent');
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: '',
    id: ''
  });
  return (
    <div className="App">
      <Tabs defaultActiveKey="scanEvent" id="mainTabs" className="mb-3" onSelect={
        k=>setTabKey(k)
       }>
        <Tab eventKey="scanEvent" title="Scan">
          <div>
            <Scanner inScanMode={tabKey === 'scanEvent'} setScanResult={setInitialFormValues} initialFormValues={initialFormValues} />
            <p>{initialFormValues?.name}</p>
          </div>
          </Tab>
          <Tab eventKey="registerEvent" title="Register">
          <RegisterForm/>
          </Tab>
        </Tabs>
      </div>
  );
}

export default App;
