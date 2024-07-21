const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  crud: (action, data) => ipcRenderer.invoke('crud', action, data),
  printBarcode: (htmlContent) => ipcRenderer.send('print-barcode', htmlContent)
});
