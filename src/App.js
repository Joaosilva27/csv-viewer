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
        <button onClick={handleCopy} disabled={!value} className='btn-icon' title='Copy to clipboard'>
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [fileData, setFileData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("");

  // Device Identity State
  const [deviceId, setDeviceId] = useState("");
  const [deviceHash, setDeviceHash] = useState("");

  // Settings State
  const [separator, setSeparator] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileInputRef = useRef(null);

  // Logic: Calculate SHA-256
  const calculateHash = async text => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  // Logic: Generate Mock Device UUID
  const generateDeviceId = () => {
    return "dev_" + crypto.randomUUID().split("-").join("").substring(0, 16);
  };

  // Logic: File Processing
  const processFile = async file => {
    if (!file) return;

    setFileName(file.name);

    // 1. Identity Logic
    const text = await file.text();
    const hash = await calculateHash(text);
    const newId = generateDeviceId();

    setDeviceHash(hash);
    setDeviceId(newId);

    // 2. CSV Parser Logic
    const rows = text.split(/\r?\n/).filter(row => row.trim() !== "");
    if (rows.length === 0) return;

    let parsedData = rows.map(row => row.split(separator));

    if (hasHeaders) {
      setHeaders(parsedData[0]);
      setFileData(parsedData.slice(1));
    } else {
      const maxCols = Math.max(...parsedData.map(row => row.length));
      setHeaders(Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`));
      setFileData(parsedData);
    }
  };

  const handleFileChange = e => {
    processFile(e.target.files[0]);
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const resetAll = () => {
    setFileData([]);
    setFileName("");
    setDeviceId("");
    setDeviceHash("");
    setHeaders([]);
  };

  return (
    <div className='app-container'>
      {/* Navigation */}
      <nav className='navbar'>
        <div className='nav-brand'>
          <div className='logo-box'>P</div>
          <span className='brand-text'>Project CSV</span>
        </div>
        <div className='nav-links'>
          <a href='#home'>Home</a>
          <a href='#github'>GitHub</a>
          <a href='#about'>About</a>
        </div>
      </nav>

      <main className='main-content'>
        {/* Settings Panel */}
        <section className='card settings-card'>
          <div className='card-header clickable' onClick={() => setShowAdvanced(!showAdvanced)}>
            <div className='header-title'>
              <IconSettings />
              <h2>CSV Settings</h2>
            </div>
            <span className={`arrow ${showAdvanced ? "open" : ""}`}>▼</span>
          </div>

          <div className={`settings-body ${showAdvanced ? "show" : ""}`}>
            <div className='control-group'>
              <label>Column Separator</label>
              <select value={separator} onChange={e => setSeparator(e.target.value)}>
                <option value=','>Comma (,)</option>
                <option value=';'>Semi-colon (;)</option>
                <option value='|'>Bar (|)</option>
                <option value='\t'>Tab</option>
              </select>
            </div>

            <div className='control-group checkbox-group'>
              <input type='checkbox' id='headerCheck' checked={hasHeaders} onChange={e => setHasHeaders(e.target.checked)} />
              <label htmlFor='headerCheck'>First row contains headers</label>
            </div>

            <div className='control-group action-group'>
              <button onClick={resetAll} className='btn-link-danger'>
                Reset All
              </button>
            </div>
          </div>
        </section>

        {/* Device Identity Panel (The Requirement) */}
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

        {/* Upload Area */}
        {!fileName && (
          <div className='upload-area' onClick={triggerFileInput}>
            <input type='file' accept='.csv,.txt' onChange={handleFileChange} className='hidden-input' ref={fileInputRef} />
            <div className='upload-icon-wrapper'>
              <IconUpload />
            </div>
            <h3>Select .csv files</h3>
            <p>Files are processed locally in your browser.</p>
          </div>
        )}

        {/* Data Table */}
        {fileData.length > 0 && (
          <div className='card table-card'>
            <div className='card-header'>
              <h3>File Preview</h3>
              <span className='row-count'>{fileData.length} Rows</span>
            </div>
            <div className='table-wrapper'>
              <table className='csv-table'>
                <thead>
                  <tr>
                    <th className='index-col'>#</th>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className='index-col'>{rowIndex + 1}</td>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          <input defaultValue={cell} className='table-input' />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
