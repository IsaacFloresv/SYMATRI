@echo off
echo Iniciando proyectos en pestañas...

wt ^
  new-tab cmd /k "cd /d D:\proyectos\symatri\backend && npm i && npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\frontend && npm i && npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\emailsender && npm i && npm run dev"
  ; new-tab -d "D:\proyectos\symatri" cmd /k cls