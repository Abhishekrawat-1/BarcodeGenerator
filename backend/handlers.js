const { ipcMain } = require('electron');
const { addData, deleteData, getAllData, updateData, exportToExcel } = require('../services/databasecrud');

ipcMain.handle('add-data', async (event, month, data) => {
  return new Promise((resolve, reject) => {
    addData(month, data, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
});

ipcMain.handle('delete-data', async (event, month, id) => {
  return new Promise((resolve, reject) => {
    deleteData(month, id, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

ipcMain.handle('get-all-data', async (event, month) => {
  return new Promise((resolve, reject) => {
    getAllData(month, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

ipcMain.handle('update-data', async (event, month, id, newData) => {
  return new Promise((resolve, reject) => {
    updateData(month, id, newData, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

ipcMain.handle('export-to-excel', async () => {
  return new Promise((resolve, reject) => {
    exportToExcel((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});
