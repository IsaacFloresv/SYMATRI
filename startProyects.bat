@echo off
echo Iniciando proyectos en pestañas...

wt ^
  new-tab cmd /k "cd /d D:\proyectos\symatri\backend && npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\frontend && npm run dev" ^
  ; new-tab cmd /k "cd /d D:\proyectos\symatri\emailsender && npm run dev"
  ; new-tab cmd /k "cd /d D:\proyectos\symatri &&"