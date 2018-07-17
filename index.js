const electron=require('electron');
const path=require('path');
const url=require('url');

const { app, BrowserWindow,Menu,ipcMain }= electron;

let mainWindow;
let settingWindow;

app.on('ready',()=>{
  mainWindow=new BrowserWindow({width: 400, height: 350,frame:true,backgroundColor:'#f44336',x:900,y:-50,show:false,maximizable:false,resizable:false });
  mainWindow.on('closed',()=>{
    app.quit();
    mainWindow=null;
  });

  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,'index.html'),
    protocol:'file:',
    slashes:true
  }));

  mainWindow.on('ready-to-show',()=>{
    mainWindow.show();
  })

  const mainMenu=Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function addSettingWindow(){
  settingWindow=new BrowserWindow({width: 300, height: 300,frame:true,backgroundColor:'#42a5f5',x:950,y:50,maximizable:false });
  settingWindow.on('closed',()=>{
    settingWindow=null;
  });
  settingWindow.loadURL(url.format({
    pathname:path.join(__dirname,'settings.html'),
    protocol:'file:',
    slashes:true
  }));
}
ipcMain.on('settings',(e,item)=>{
  addSettingWindow();
});

ipcMain.on('saved',(e,item)=>{
  mainWindow.webContents.send('saved');
  settingWindow.close();
});

const menuTemplate=[
  {
    label:'',
    submenu:[
      {
        label:'Quit',
        accelerator: process.plateform=='darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
]
