import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ConectysLogo from "./conectys.png";
import VikingLogo from "./viking.png";

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

const IconFile = () => (
  <svg className='mode-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
    <polyline points='13 2 13 9 20 9'></polyline>
  </svg>
);

const IconEdit = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
  </svg>
);

const IconDownload = () => (
  <svg className='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
    <polyline points='7 10 12 15 17 10'></polyline>
    <line x1='12' y1='15' x2='12' y2='3'></line>
  </svg>
);

/* ===================== EDITABLE COPY CELL ===================== */

const EditableCopyCell = ({ value, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const copy = e => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <div className='input-wrapper'>
      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          className='edit-input'
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <code className='code-display' onClick={handleClick} style={{ cursor: "text" }}>
          {value}
        </code>
      )}
      <button className='btn-icon' onClick={copy} title='Copy'>
        {copied ? <IconCheck /> : <IconCopy />}
      </button>
    </div>
  );
};

/* ===================== APP ===================== */

function App() {
  const [mode, setMode] = useState(null);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");
  const [separator, setSeparator] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("csvMode");
    if (savedMode) {
      setMode(savedMode);
      const savedRows = JSON.parse(localStorage.getItem(`csvRows_${savedMode}`) || "[]");
      const savedHeaders = JSON.parse(localStorage.getItem(`csvHeaders_${savedMode}`) || "[]");
      setRows(savedRows);
      setHeaders(savedHeaders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const selectMode = selectedMode => {
    setMode(selectedMode);
    localStorage.setItem("csvMode", selectedMode);
    const savedRows = JSON.parse(localStorage.getItem(`csvRows_${selectedMode}`) || "[]");
    const savedHeaders = JSON.parse(localStorage.getItem(`csvHeaders_${selectedMode}`) || "[]");
    setRows(savedRows);
    setHeaders(savedHeaders);
  };

  const processVikingFile = async file => {
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
    localStorage.setItem(`csvRows_viking`, JSON.stringify(updated));
  };

  const processOtherFile = async file => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return;

    const fileHeaders = hasHeaders ? lines[0].split(separator) : [];
    const dataLines = hasHeaders ? lines.slice(1) : lines;

    const columnHeaders =
      fileHeaders.length > 0 ? fileHeaders : Array.from({ length: dataLines[0].split(separator).length }, (_, i) => `Column ${i + 1}`);

    const parsed = dataLines.map(line => {
      const cols = line.split(separator);
      const rowData = {};
      columnHeaders.forEach((header, index) => {
        rowData[header] = cols[index] || "";
      });
      return rowData;
    });

    const updated = [...parsed.reverse(), ...rows];
    setRows(updated);
    setHeaders(columnHeaders);
    localStorage.setItem(`csvRows_other`, JSON.stringify(updated));
    localStorage.setItem(`csvHeaders_other`, JSON.stringify(columnHeaders));
  };

  const processFile = async file => {
    if (mode === "viking") {
      await processVikingFile(file);
    } else if (mode === "other") {
      await processOtherFile(file);
    }
  };

  const removeRow = rowToRemove => {
    const updated = rows.filter(r => r !== rowToRemove);
    setRows(updated);
    localStorage.setItem(`csvRows_${mode}`, JSON.stringify(updated));
  };

  const updateCell = (rowToUpdate, field, newValue) => {
    const updated = rows.map(r => {
      if (r === rowToUpdate) {
        return { ...r, [field]: newValue };
      }
      return r;
    });
    setRows(updated);
    localStorage.setItem(`csvRows_${mode}`, JSON.stringify(updated));
  };

  const downloadCSV = () => {
    let csvContent = "";

    if (mode === "viking") {
      // Add headers
      csvContent += "Device Serial Number,Hardware Hash\n";
      // Add rows
      rows.forEach(row => {
        csvContent += `${row.serial},${row.hash}\n`;
      });
    } else {
      // Add headers
      csvContent += headers.join(",") + "\n";
      // Add rows
      rows.forEach(row => {
        const rowValues = headers.map(header => row[header] || "");
        csvContent += rowValues.join(",") + "\n";
      });
    }

    // Create download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${mode}_export_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRows =
    mode === "viking"
      ? rows.filter(r => r.serial?.toLowerCase().includes(search.toLowerCase()) || r.hash?.toLowerCase().includes(search.toLowerCase()))
      : rows.filter(r => Object.values(r).some(val => String(val).toLowerCase().includes(search.toLowerCase())));

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <nav className='navbar'>
        <div className='nav-brand clickable' onClick={() => setMode(null)} style={{ cursor: "pointer" }}>
          <img src={ConectysLogo} alt='Conectys Logo' className='brand-logo' />
          <span className='brand-text'>CSV Viewer</span>
        </div>

        <button className='btn-icon' onClick={() => setDarkMode(!darkMode)} aria-label='Toggle theme'>
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>
      </nav>

      <main className='main-content'>
        {!mode ? (
          <div className='mode-selection'>
            <h2>Select CSV Mode</h2>
            <div className='mode-buttons'>
              <div className='mode-card' onClick={() => selectMode("viking")}>
                <img src={VikingLogo} alt='Viking Logo' className='mode-icon' />
                <h3>Viking</h3>
                <p>Import CSV files with Device Serial Number and Hardware Hash columns</p>
              </div>
              <div className='mode-card' onClick={() => selectMode("other")}>
                <IconFile />
                <h3>Other</h3>
                <p>Import any CSV file with custom columns and data</p>
              </div>
            </div>
          </div>
        ) : (
          <>
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

                  <button
                    className='btn-link-danger'
                    onClick={() => {
                      const modeName = mode === "viking" ? "Viking Cloud" : "Other";
                      if (window.confirm(`Are you sure you want to delete all ${modeName} data? This cannot be undone.`)) {
                        setRows([]);
                        setHeaders([]);
                        localStorage.removeItem(`csvRows_${mode}`);
                        localStorage.removeItem(`csvHeaders_${mode}`);
                      }
                    }}
                  >
                    Reset {mode === "viking" ? "Viking Cloud" : "Other"} Data
                  </button>
                </div>
              )}
            </section>

            <div className='upload-area' onClick={() => fileInputRef.current.click()}>
              <input ref={fileInputRef} type='file' accept='.csv' hidden onChange={e => processFile(e.target.files[0])} />
              <IconUpload />
              <h3>Select CSV file</h3>
              <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#6b7280" }}>
                {mode === "viking" ? "Viking Cloud Mode - Requires Serial & Hash columns" : "Other Mode - Any CSV format accepted"}
              </p>
            </div>

            {rows.length > 0 && (
              <div className='card table-card'>
                <div className='search-bar'>
                  <input className='search-input' placeholder='Search...' value={search} onChange={e => setSearch(e.target.value)} />
                  <button className='btn-search' aria-label='Search'>
                    <IconSearch />
                  </button>
                  <button className='btn-download' onClick={downloadCSV} title='Export CSV'>
                    <IconDownload />
                    <span>Export</span>
                  </button>
                </div>

                <div className='table-wrapper'>
                  <table className={`csv-table ${mode === "other" ? "compact" : ""}`}>
                    <thead>
                      <tr>
                        <th>#</th>
                        {mode === "viking" ? (
                          <>
                            <th>Device Serial Number</th>
                            <th>Hardware Hash</th>
                          </>
                        ) : (
                          headers.map((header, i) => <th key={i}>{header}</th>)
                        )}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((r, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          {mode === "viking" ? (
                            <>
                              <td>
                                <EditableCopyCell value={r.serial} onEdit={newValue => updateCell(r, "serial", newValue)} />
                              </td>
                              <td>
                                <EditableCopyCell value={r.hash} onEdit={newValue => updateCell(r, "hash", newValue)} />
                              </td>
                            </>
                          ) : (
                            headers.map((header, j) => (
                              <td key={j}>
                                <EditableCopyCell value={r[header]} onEdit={newValue => updateCell(r, header, newValue)} />
                              </td>
                            ))
                          )}
                          <td>
                            <button className='btn-icon btn-danger' onClick={() => removeRow(r)}>
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
          </>
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
