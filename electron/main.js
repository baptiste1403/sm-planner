const { app, BrowserWindow, shell, Menu } = require('electron');

if (require('electron-squirrel-startup')) app.quit();

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require("path");

const serv = express();
const port = 43434;

serv.use(fileUpload());

serv.put("/addpost", (req, res) => {
  
  let asFiles = true;
  if(fs.existsSync(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`))) {
    fs.rmSync(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`, 'data.json'), { force: true });
    asFiles = false;
  }
  fs.mkdirSync(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`), {recursive: true});
  if(asFiles && req.body.files) {
    for(file of JSON.parse(req.body.files)) {
      fs.copyFile(file.path, path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`, `${file.name}`), (err) => {
        console.log(err);
      });
    }
  }
  
  console.log(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`));
  fs.writeFileSync(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`, `data.json`), JSON.stringify(req.body));

});

serv.get("/post/:year/:month", (req, res) => {
  let result = {}
  let nbDays = new Date(+req.params.year, +req.params.month, 0).getDate();

  for(i = 1; i <= nbDays; i++) {
    let curPath = path.join(app.getPath('userData'), `smplanner`, `${+req.params.year}-${req.params.month.padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
    if(fs.existsSync(curPath)) {
      let subDirs = fs.readdirSync(curPath);
      for(let subDir of subDirs) {
        let data = JSON.parse(fs.readFileSync(path.join(curPath, subDir, 'data.json')));
        if(!result[i]) {
          result[i] = []
        }
        result[i].push(data);
      }
    }
  }
  res.json(result);
});

serv.post("/delpost", (req, res) => {
  console.log(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`));
  fs.rmSync(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`), {recursive: true, force: true});
});

serv.post("/showpost", (req, res) => {
  shell.openPath(path.join(app.getPath('userData'), `smplanner`, `${req.body.date}`, `${req.body.name}`));
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  })

  win.loadFile('./index.html');
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();
})

serv.listen(port);