const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx');
const fs = require('fs');
// Dynamic import of ES module
const isDev = async () => (await import('electron-is-dev')).default;

let db;

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Amba Shakti',
    minWidth: 1050,
    minHeight: 700,
    icon: path.join(__dirname, '..', 'assets', 'icons', 'icon.png'),
    // minWidth: 800, // Set the minimum width
    // minHeight: 600, // Set the minimum height
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.removeMenu();

  // isDev().then((isDev) => {
  //   if (isDev) {
  //     mainWindow.loadURL('http://localhost:3000');
  //   } else {
  //     mainWindow.loadFile(path.join(__dirname, '..', 'app', 'build', 'index.html'));
  //   }
  // });

  // Always load the index.html from the React build output
  mainWindow.loadFile(path.join(__dirname, '..', 'app', 'build', 'index.html'));

  mainWindow.on('closed', () => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database', err);
      } else {
        console.log('Database closed successfully');
      }
    });
  });

  // Get the userData path
const userDataPath = app.getPath('userData');

// Create a subdirectory named 'records' inside the userData path
const recordsDir = path.join(userDataPath, 'records');

// Ensure the 'records' directory exists
if (!fs.existsSync(recordsDir)) {
    fs.mkdirSync(recordsDir);
}

  // Initialize the database and create the table if it doesn't exist
  const dbPath = path.join(recordsDir, 'ambashakti.db');

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log('Database opened successfully');
      db.run(`CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        division TEXT,
        heat_no TEXT,
        length REAL,
        date TEXT,
        bundal_no TEXT,
        weight REAL,
        company TEXT,
        grade TEXT,
        colour_code TEXT,
        dia REAL,
        uin TEXT,
        chemistry TEXT
      )`, (err) => {
        if (err) {
          console.error('Error creating table', err);
        } else {
          console.log('Table created successfully');
        }
      });
    }
  });

  ipcMain.handle('crud', async (event, action, data) => {
    switch (action) {
      case 'create':
        return createRecord(data);
      case 'read':
        return readRecords(data.page, data.limits, data.search);
      case 'update':
        return updateRecord(data);
      case 'delete':
        return deleteRecord(data.id);
      case 'search':
        return searchByUIN(data.uin);
      case 'export':
        return exportToExcel();
      case 'deleteTable':
        return deleteTable();
      default:
        return { status: 'error', message: 'Invalid action' };
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('print-barcode', (event, htmlContent) => {
  const printWindow = new BrowserWindow({ show: false });

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURI(htmlContent)}`);

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({}, (success, errorType) => {
      if (!success) {
        dialog.showErrorBox('Printing Error', `Failed to print barcode: ${errorType}`);
      }
      printWindow.close();
    });
  });
});

function createRecord(dataArray) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION", function(err) {
        if (err) {
          reject({ status: 'error', message: err.message });
          return;
        }

        const stmt = db.prepare(`INSERT INTO records (division, heat_no, length, date, bundal_no, weight, company, grade, colour_code, dia, uin, chemistry)
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        dataArray.forEach(value => {
          stmt.run(value.division, value.heat_no, value.length, value.date, value.bundal_no, value.weight, value.company, value.grade, value.colour_code, value.dia, value.uin, value.chemistry, function(err) {
            if (err) {
              db.run("ROLLBACK");
              stmt.finalize();
              reject({ status: 'error', message: err.message });
              return;
            }
          });
        });

        stmt.finalize(err => {
          if (err) {
            db.run("ROLLBACK");
            reject({ status: 'error', message: err.message });
          } else {
            db.run("COMMIT");
            resolve({ status: 'success', message: `${dataArray.length} records inserted successfully` });
            console.log("Records inserted successfully");
          }
        });
      });
    });
  });
}


function readRecords(page, limit, search) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT COUNT(*) as total FROM records;';
    let params = [];

    console.log("Executing total count query:", sql);

    db.get(sql, params, (err, result) => {
      if (err) {
        console.error("Error executing total count query:", err);
        reject({ status: 'error', message: err.message });
      } else {
        const totalCount = result.total;
        // console.log("Total count:", totalCount);

        // Calculate offset based on page number and limit
        const limit=10;
        const offset = (page - 1) * limit;

        sql = `SELECT * FROM records`;

        if (search) {
          sql += ` WHERE uin LIKE ? OR date LIKE ?`;
          params.push(`%${search}%`);
          params.push(`%${search}%`);
        }

        sql += ` LIMIT ? OFFSET ?;`;

        params.push(limit);
        params.push(offset);

        // console.log("Executing data query:", sql);
        // console.log("Query parameters:", params);

        db.all(sql, params, (err, rows) => {
          if (err) {
            console.error("Error executing data query:", err);
            reject({ status: 'error', message: err.message });
          } else {
            // console.log("Query result:", rows);
            // console.log("Query completed successfully", totalCount, rows);
            resolve({ status: 'success', totalCount, data: rows });
          }
        });
      }
    });
  });
}


function updateRecord(data) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`UPDATE records SET division = ?, heat_no = ?, length = ?, date = ?, bundal_no = ?, weight = ?, company = ?, grade = ?, colour_code = ?, dia = ?, uin = ?, chemistry = ? WHERE id = ?`);
    stmt.run(data.division, data.heat_no, data.length, data.date, data.bundal_no, data.weight, data.company, data.grade, data.colour_code, data.dia, data.uin, data.chemistry, data.id, function (err) {
      if (err) {
        reject({ status: 'error', message: err.message });
      } else {
        resolve({ status: 'success', changes: this.changes });
      }
    });
  });
}

function deleteRecord(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('DELETE FROM records WHERE id = ?');
    stmt.run(id, function (err) {
      if (err) {
        reject({ status: 'error', message: err.message });
      } else {
        resolve({ status: 'success', changes: this.changes });
      }
    });
  });
}

function searchByUIN(uin) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM records WHERE uin = ?', [uin], (err, rows) => {
      if (err) {
        reject({ status: 'error', message: err.message });
      } else {
        resolve({ status: 'success', data: rows });
      }
    });
  });
}

function exportToExcel() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM records', (err, rows) => {
      if (err) {
        console.error("Database query error: ", err);
        reject({ status: 'error', message: err.message });
      } else {
        try {
          const worksheet = xlsx.utils.json_to_sheet(rows);
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Records');
          const downloadsPath = app.getPath('downloads');
          const filePath = path.join(downloadsPath, 'records.xlsx');
          xlsx.writeFile(workbook, filePath);
          resolve({ status: 'success', path: filePath });
          console.log("Exported successfully to: ", filePath);
        } catch (writeErr) {
          console.error("Error writing Excel file: ", writeErr);
          reject({ status: 'error', message: writeErr.message });
        }
      }
    });
  });
}

function deleteTable() {
  return new Promise((resolve, reject) => {
    db.run('DROP TABLE IF EXISTS records', (err) => {
      if (err) {
        console.error("Error deleting table: ", err);
        reject({ status: 'error', message: err.message });
      } else {
        resolve({ status: 'success', message: 'Table deleted successfully' });
        console.log("Table deleted successfully");
      }
    });
  });
}
