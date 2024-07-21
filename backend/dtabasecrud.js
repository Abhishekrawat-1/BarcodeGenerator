const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'data', 'app.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
  }
});

const addData = (month, data, callback) => {
  const monthTable = `month_${String(month).padStart(2, '0')}`;
  db.run(`INSERT INTO ${monthTable} (data) VALUES (?)`, [data], function (err) {
    callback(err, this.lastID);
  });
};

const deleteData = (month, id, callback) => {
  const monthTable = `month_${String(month).padStart(2, '0')}`;
  db.run(`DELETE FROM ${monthTable} WHERE id = ?`, [id], callback);
};

const getAllData = (month, callback) => {
  const monthTable = `month_${String(month).padStart(2, '0')}`;
  db.all(`SELECT * FROM ${monthTable}`, [], (err, rows) => {
    callback(err, rows);
  });
};

const updateData = (month, id, newData, callback) => {
  const monthTable = `month_${String(month).padStart(2, '0')}`;
  db.run(`UPDATE ${monthTable} SET data = ? WHERE id = ?`, [newData, id], callback);
};

const exportToExcel = (callback) => {
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  const tasks = [];

  for (let i = 1; i <= 12; i++) {
    const monthTable = `month_${String(i).padStart(2, '0')}`;
    tasks.push(new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${monthTable}`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const worksheet = workbook.addWorksheet(`Month ${i}`);
          worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Data', key: 'data', width: 30 },
          ];
          rows.forEach(row => {
            worksheet.addRow(row);
          });
          resolve();
        }
      });
    }));
  }

  Promise.all(tasks)
    .then(() => {
      workbook.xlsx.writeFile('data.xlsx').then(() => {
        callback(null);
      });
    })
    .catch(callback);
};

module.exports = { addData, deleteData, getAllData, updateData, exportToExcel };
