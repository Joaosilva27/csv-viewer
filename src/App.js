import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// --- Icons ---
const IconCopy = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
  </svg>
);

const IconCheck = () => (
  <svg className='icon icon-success' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
    <polyline points='20 6 9 17 4 12'></polyline>
  </svg>
);

const IconUpload = () => (
  <svg className='icon icon-large' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
    <polyline points='17 8 12 3 7 8'></polyline>
    <line x1='12' y1='3' x2='12' y2='15'></line>
  </svg>
);

const IconSettings = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='12' cy='12' r='3'></circle>
    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
  </svg>
);

const IconTrash = () => (
  <svg
    className='icon icon-danger'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='3 6 5 6 21 6'></polyline>
    <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'></path>
    <path d='M10 11v6'></path>
    <path d='M14 11v6'></path>
    <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'></path>
  </svg>
);

// --- Copyable Cell ---
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

function App() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [separator, setSeparator] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("csvRows") || "[]");
    setRows(saved);
  }, []);

  const processFile = async file => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);

    const headerLine = hasHeaders ? lines[0] : "";
    const dataLines = hasHeaders ? lines.slice(1) : lines;

    const headers = hasHeaders ? headerLine.split(separator) : [];
    const serialIndex = headers.findIndex(h => h.toLowerCase().includes("serial"));
    const hashIndex = headers.findIndex(h => h.toLowerCase().includes("hash"));

    if (serialIndex === -1 || hashIndex === -1) {
      alert("CSV must contain Device Serial Number and Hardware Hash");
      return;
    }

    const parsed = dataLines.map(line => {
      const cols = line.split(separator);
      return {
        serial: cols[serialIndex],
        hash: cols[hashIndex],
      };
    });

    const updated = [...parsed.reverse(), ...rows];
    localStorage.setItem("csvRows", JSON.stringify(updated));
    setRows(updated);
  };

  const removeRow = index => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    localStorage.setItem("csvRows", JSON.stringify(updated));
  };

  const resetAll = () => {
    localStorage.removeItem("csvRows");
    setRows([]);
    setSearch("");
  };

  const filteredRows = rows.filter(r => {
    const q = search.toLowerCase();
    return r.serial.toLowerCase().includes(q) || r.hash.toLowerCase().includes(q);
  });

  return (
    <div className='app-container'>
      <nav className='navbar'>
        <div className='nav-brand'>
          <img src='https://www.conectys.com/wp-content/uploads/2024/08/conectys-logo.svg' alt='Conectys Logo' style={{ width: "130px" }} />
          <span className='brand-text'>CSV Viewer</span>
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
                <option value=';'>Semicolon (;)</option>
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

        <div className='upload-area' onClick={() => fileInputRef.current.click()}>
          <input ref={fileInputRef} type='file' accept='.csv' hidden onChange={e => processFile(e.target.files[0])} />
          <IconUpload />
          <h3>Select CSV file</h3>
        </div>

        {rows.length > 0 && (
          <div className='card table-card'>
            <input
              className='search-input'
              placeholder='Search by serial number or hardware hash...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <table className='csv-table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Device Serial Number</th>
                  <th>Hardware Hash</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r, i) => {
                  const realIndex = rows.findIndex(row => row.serial === r.serial && row.hash === r.hash);

                  return (
                    <tr key={realIndex}>
                      <td>{i + 1}</td>
                      <td>
                        <CopyCell value={r.serial} />
                      </td>
                      <td>
                        <CopyCell value={r.hash} />
                      </td>
                      <td>
                        <button className='btn-icon btn-danger' onClick={() => removeRow(realIndex)} title='Remove row'>
                          <IconTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className='footer'>
        <p>&copy; 2026 CSV Viewer. Open Source.</p>
      </footer>
    </div>
  );
}

export default App;
