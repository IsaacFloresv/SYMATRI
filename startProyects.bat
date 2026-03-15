@echo off
echo Iniciando proyectos en pestañas...

wt ^
  new-tab cmd /k "cd /d D:\proyectos\symatri\backend && (if not exist node_modules npm i) & npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\frontend && (if not exist node_modules npm i) & npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\emailsender && (if not exist node_modules npm i) & npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\emailsender && code ." ^