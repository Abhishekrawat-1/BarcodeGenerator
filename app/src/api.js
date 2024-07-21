const { ipcRenderer } = window.require('electron');

export const getData = async () => {
  return await ipcRenderer.invoke('get-data');
};

export const addData = async (data) => {
  return await ipcRenderer.invoke('add-data', data);
};

export const updateData = async (id, data) => {
  return await ipcRenderer.invoke('update-data', { id, updatedData: data });
};

export const deleteData = async (id) => {
  return await ipcRenderer.invoke('delete-data', id);
};
