import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import conectys from './conectys.png';

/* ===================== ICONS ===================== */

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

const IconGitHub = () => (
  <svg className='github-icon' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.05 11.05 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.24 2.73.12 3.02.73.81 1.17 1.85 1.17 3.11 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z' />
  </svg>
);

const IconSearch = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='11' cy='11' r='8'></circle>
    <path d='m21 21-4.35-4.35'></path>
  </svg>
);

const IconMoon = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </svg>
);

const IconSun = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='12' cy='12' r='5' />
    <line x1='12' y1='1' x2='12' y2='3' />
    <line x1='12' y1='21' x2='12' y2='23' />
    <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
    <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
    <line x1='1' y1='12' x2='3' y2='12' />
    <line x1='21' y1='12' x2='23' y2='12' />
  </svg>
);

/* ===================== COPY CELL ===================== */

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

/* ===================== APP ===================== */

function App() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [separator, setSeparator] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("csvRows") || "[]");
    setRows(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const processFile = async file => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return;

    const headers = hasHeaders ? lines[0].split(separator) : [];
    const dataLines = hasHeaders ? lines.slice(1) : lines;

    const serialIndex = headers.findIndex(h => h.toLowerCase().includes("serial"));
    const hashIndex = headers.findIndex(h => h.toLowerCase().includes("hash"));

    if (hasHeaders && (serialIndex === -1 || hashIndex === -1)) {
      alert("CSV must contain Device Serial Number and Hardware Hash headers");
      return;
    }

    const parsed = dataLines.map(line => {
      const cols = line.split(separator);
      return {
        serial: hasHeaders ? cols[serialIndex] : cols[0],
        hash: hasHeaders ? cols[hashIndex] : cols[1],
      };
    });

    const updated = [...parsed.reverse(), ...rows];
    setRows(updated);
    localStorage.setItem("csvRows", JSON.stringify(updated));
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

  const filteredRows = rows.filter(r => r.serial.toLowerCase().includes(search.toLowerCase()) || r.hash.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <nav className='navbar'>
        <div className='nav-brand'>
          <img src={conectys}ys alt='Conectys Logo' style={{ width: 130 }} />
        </div>

        <button className='btn-icon' onClick={() => setDarkMode(!darkMode)} aria-label='Toggle theme'>
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>
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
                <option value='|'>Pipe (|)</option>
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
            <div className='search-bar'>
              <input
                className='search-input'
                placeholder='Search by serial number or hardware hash...'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className='btn-search' aria-label='Search'>
                <IconSearch />
              </button>
            </div>

            <div className='table-wrapper'>
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
                  {filteredRows.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <CopyCell value={r.serial} />
                      </td>
                      <td>
                        <CopyCell value={r.hash} />
                      </td>
                      <td>
                        <button className='btn-icon btn-danger' onClick={() => removeRow(i)}>
                          <IconTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className='footer'>
        <p>&copy; 2026 CSV Viewer. Open Source.</p>
        <a
          href='https://github.com/Joaosilva27/csv-viewer'
          target='_blank'
          rel='noopener noreferrer'
          className='github-link'
          aria-label='GitHub Repository'
        >
          <IconGitHub />
        </a>
      </footer>
    </div>
  );
}

export default App;
