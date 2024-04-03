'use client'
import { useState } from 'react';

export default function Home() {
  const [codeData, setCodeData] = useState({ code: '', expirationTime: 0 });
  const [flag, setFlag] = useState('');
  const [error, setError] = useState('');


  const fetchCode = async () => {
    const res = await fetch('/api/codes');
    const data = await res.json();
    setCodeData(data);
  };

  const validateCode = async (enteredCode:string) => {
    const { code, expirationTime } = codeData;
    const res = await fetch('/api/codes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enteredCode, currentCode: code, expirationTime })
    });
    const data = await res.json();
    if (data.success) {
      setFlag(data.flag);
    } else {
      setFlag('');
      setError('Code expired or incorrect');
    }
  };

  const handlePaste = (event:any) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Random Code Generator</h1>
      <p>Current Code: {codeData.code}</p>
      <button onClick={fetchCode}>Generate Code</button>
      <input
        type="text"
        placeholder="Enter code"
        onChange={(e) => validateCode(e.target.value)}
        onPaste={handlePaste} 
      />
      {flag && <p>{flag}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
