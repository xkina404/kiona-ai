import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  avatar: {
    open: () => ipcRenderer.invoke('avatar:open'),
    close: () => ipcRenderer.invoke('avatar:close'),
    toggleAlwaysOnTop: (flag: boolean) =>
      ipcRenderer.invoke('avatar:toggle-always-on-top', flag),
  },
});