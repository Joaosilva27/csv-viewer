import React, { useState, useRef } from "react";
import "./App.css";

// --- Icons (Standard SVG Components) ---
const IconCopy = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
  </svg>
);

const IconCheck = () => (
  <svg
    className='icon icon-success'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='20 6 9 17 4 12'></polyline>
  </svg>
);

const IconUpload = () => (
  <svg className='icon icon-large' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
    <polyline points='17 8 12 3 7 8'></polyline>
    <line x1='12' y1='3' x2='12' y2='15'></line>
  </svg>
);

const IconSettings = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='12' cy='12' r='3'></circle>
    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
  </svg>
);

// --- Sub-Component: Copy Field ---
const CopyInput = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='copy-input-container'>
      <label className='input-label'>{label}</label>
      <div className='input-wrapper'>
        <code className='code-display'>{value || "Waiting for file..."}</code>
        <button onClick={handleCopy} disabled={!value} className='btn-icon'>
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
    </div>
  );
};

// --- Sub-Component: Copyable Table Cell ---
const CopyCell = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='input-wrapper'>
      <code className='code-display'>{value}</code>
      <button className='btn-icon' onClick={copy}>
        {copied ? <IconCheck /> : <IconCopy />}
      </button>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [fileData, setFileData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("");

  const [deviceId, setDeviceId] = useState("");
  const [deviceHash, setDeviceHash] = useState("");

  const [separator, setSeparator] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileInputRef = useRef(null);

  const calculateHash = async text => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const generateDeviceId = () => "dev_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);

  const processFile = async file => {
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    setDeviceHash(await calculateHash(text));
    setDeviceId(generateDeviceId());

    const rows = text
      .split(/\r?\n/)
      .filter(r => r.trim() !== "")
      .map(r => r.split(separator));

    if (hasHeaders) {
      setHeaders(rows[0]);
      setFileData(rows.slice(1));
    } else {
      setHeaders(rows[0].map((_, i) => `Column ${i + 1}`));
      setFileData(rows);
    }
  };

  const resetAll = () => {
    setFileData([]);
    setHeaders([]);
    setFileName("");
    setDeviceId("");
    setDeviceHash("");
  };

  return (
    <div className='app-container'>
      <nav className='navbar'>
        <div className='nav-brand'>
          <div className='logo-box'>P</div>
          <span className='brand-text'>Project CSV</span>
        </div>
      </nav>

      <main className='main-content'>
        <section className='card settings-card'>
          <div className='card-header clickable' onClick={() => setShowAdvanced(!showAdvanced)}>
            <IconSettings />
            <h2>CSV Settings</h2>
          </div>

          {showAdvanced && (
            <div className='settings-body show'>
              <select value={separator} onChange={e => setSeparator(e.target.value)}>
                <option value=','>Comma (,)</option>
                <option value=';'>Semi-colon (;)</option>
                <option value='|'>Bar (|)</option>
                <option value='\t'>Tab</option>
              </select>

              <label>
                <input type='checkbox' checked={hasHeaders} onChange={e => setHasHeaders(e.target.checked)} /> First row contains headers
              </label>

              <button className='btn-link-danger' onClick={resetAll}>
                Reset
              </button>
            </div>
          )}
        </section>

        {fileName && (
          <section className='card device-card'>
            <div className='card-header dark-header'>
              <h3>Device Identity Generated</h3>
              <span className='file-badge'>{fileName}</span>
            </div>
            <div className='device-grid'>
              <CopyInput label='Device ID' value={deviceId} />
              <CopyInput label='Device Hash (SHA-256)' value={deviceHash} />
            </div>
          </section>
        )}

        {!fileName && (
          <div className='upload-area' onClick={() => fileInputRef.current.click()}>
            <input ref={fileInputRef} type='file' accept='.csv' hidden onChange={e => processFile(e.target.files[0])} />
            <IconUpload />
            <h3>Select .csv files</h3>
          </div>
        )}

        {fileData.length > 0 && (
          <div className='card table-card'>
            <table className='csv-table'>
              <thead>
                <tr>
                  <th>#</th>
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, r) => (
                  <tr key={r}>
                    <td className='index-col'>{r + 1}</td>
                    {row.map((cell, c) => {
                      const header = headers[c]?.toLowerCase();
                      const copyable = header === "device serial number" || header === "hardware hash";
                      return <td key={c}>{copyable ? <CopyCell value={cell} /> : <input defaultValue={cell} className='table-input' />}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className='footer'>
        <p>&copy; 2026 Project CSV Clone. Open Source.</p>
      </footer>
    </div>
  );
}

export default App;
