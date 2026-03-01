export default function VistaEventos() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-white text-3xl font-bold tracking-tight">Calendario Escolar</h1>
          <p className="text-[#92aec9] text-base font-normal">Consulta tus eventos próximos y tareas pendientes.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div className="bg-card-dark rounded-xl p-5 border border-border-dark">
            <div className="flex items-center justify-between text-white mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event</span>
                Agosto 2024
              </h2>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-1 hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-dark-secondary uppercase tracking-wider mb-2">
              <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sá</div>
            </div>
            <div className="calendar-grid grid grid-cols-7 gap-1 text-center text-sm text-white">
              <div className="text-text-dark-secondary/30">28</div><div className="text-text-dark-secondary/30">29</div><div className="text-text-dark-secondary/30">30</div><div className="text-text-dark-secondary/30">31</div>
              <div>1</div><div>2</div><div>3</div>
              <div>4</div><div>5</div><div>6</div><div className="relative"><span className="bg-primary/20 border border-primary text-primary font-bold rounded-full size-8 flex items-center justify-center">7</span></div><div>8</div><div>9</div><div>10</div>
              <div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
              <div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div>
              <div className="relative"><span className="font-bold">25</span><div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-yellow-400 rounded-full"></div></div><div>26</div><div>27</div><div>28</div><div>29</div><div>30</div><div>31</div>
            </div>
          </div>
          <div className="bg-card-dark rounded-xl p-5 border border-border-dark">
            <div className="flex items-center justify-between text-white mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event</span>
                Septiembre 2024
              </h2>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-1 hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-dark-secondary uppercase tracking-wider mb-2">
              <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sá</div>
            </div>
            <div className="calendar-grid grid grid-cols-7 gap-1 text-center text-sm text-white">
              <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
              <div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div className="relative">14<div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-blue-400 rounded-full"></div></div>
              <div className="relative"><span className="bg-primary rounded-full size-8 flex items-center justify-center">15</span><div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-yellow-400 rounded-full"></div></div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div><div>21</div>
              <div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div><div className="relative">28<div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-red-400 rounded-full"></div></div>
              <div>29</div><div>30</div><div className="text-text-dark-secondary/30">1</div><div className="text-text-dark-secondary/30">2</div><div className="text-text-dark-secondary/30">3</div><div className="text-text-dark-secondary/30">4</div><div className="text-text-dark-secondary/30">5</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-border-dark flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                  <span className="material-symbols-outlined text-blue-400 text-lg">event_upcoming</span>
                  Eventos hoy
                </h3>
                <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold whitespace-nowrap">2 EVENTOS</span>
              </div>
              <div className="p-3 space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary cursor-pointer hover:bg-primary/20 transition-colors">
                  <h4 className="text-sm font-semibold text-white truncate">Reunión de Padres</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-text-dark-secondary">schedule</span>
                    <span className="text-xs text-text-dark-secondary">18:00 PM</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border-l-4 border-gray-500 cursor-pointer hover:bg-white/10 transition-colors">
                  <h4 className="text-sm font-semibold text-white truncate">Clase de Refuerzo</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-text-dark-secondary">schedule</span>
                    <span className="text-xs text-text-dark-secondary">16:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
              <div className="px-4 py-3 bg-white/5 border-b border-border-dark flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                  <span className="material-symbols-outlined text-yellow-400 text-lg">assignment_late</span>
                  Tareas Pendientes
                </h3>
                <span className="text-[9px] bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">3 HOY</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Proyecto de Ciencias</p>
                    <p className="text-[10px] text-red-400 font-medium">Vence en 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Ensayo de Historia</p>
                    <p className="text-[10px] text-text-dark-secondary">Vence mañana</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Ejercicios de Cálculo</p>
                    <p className="text-[10px] text-text-dark-secondary">Vence en 3 días</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
              <div className="px-3 py-3 bg-white/5 border-b border-border-dark flex items-center justify-between gap-2">
                <h3 className="text-[11px] font-bold text-white uppercase tracking-tight flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="material-symbols-outlined text-red-400 text-[18px] flex-shrink-0">school</span>
                  <span className="truncate">Próximos Exámenes</span>
                </h3>
                <span className="text-[9px] bg-red-400/20 text-red-400 px-2 py-0.5 rounded-full font-extrabold whitespace-nowrap flex-shrink-0">2 PRONTO</span>
              </div>
              <div className="p-3 space-y-3">
                <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/30 cursor-pointer hover:bg-red-400/20 transition-colors">
                  <h4 className="text-sm font-semibold text-white truncate">Examen de Matemáticas</h4>
                  <p className="text-[10px] text-red-400 font-medium mt-1">Mañana - Álgebra Avanzada</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-border-dark cursor-pointer hover:bg-white/10 transition-colors">
                  <h4 className="text-sm font-semibold text-white truncate">Parcial de Literatura</h4>
                  <p className="text-[10px] text-text-dark-secondary mt-1">Viernes - Análisis de Textos</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-card-dark rounded-xl border border-border-dark flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Detalles del Evento</h3>
                    <p className="text-sm text-text-dark-secondary">Información completa del elemento seleccionado</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark hover:bg-white/5 text-text-dark-secondary">
                    <span className="material-symbols-outlined text-xl">share</span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark hover:bg-white/5 text-text-dark-secondary">
                    <span className="material-symbols-outlined text-xl">bookmark</span>
                  </button>
                </div>
              </div>
              <div className="p-8 flex-1">
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">Institucional</span>
                    <h4 className="text-3xl font-bold text-white mt-4">Reunión de Padres y Maestros</h4>
                    <p className="mt-4 text-text-dark-secondary leading-relaxed text-lg">
                      Reunión trimestral obligatoria para discutir el progreso académico del primer periodo, entrega de boletas y coordinación de los próximos eventos extracurriculares del año escolar 2024-2025.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-white/5 p-2 rounded-lg mr-4">
                          <span className="material-symbols-outlined text-primary text-2xl">calendar_today</span>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Fecha y Hora</p>
                          <p className="text-white font-medium text-lg">25 de Octubre, 2024</p>
                          <p className="text-text-dark-secondary">06:00 PM - 08:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-white/5 p-2 rounded-lg mr-4">
                          <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Ubicación</p>
                          <p className="text-white font-medium text-lg">Auditorio Principal</p>
                          <p className="text-text-dark-secondary">Edificio A, Planta Baja</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-white/5 p-2 rounded-lg mr-4">
                          <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Público Objetivo</p>
                          <p className="text-white font-medium text-lg">Padres y Tutores</p>
                          <p className="text-text-dark-secondary">Todos los niveles</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-white/5 p-2 rounded-lg mr-4">
                          <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Estado</p>
                          <div className="flex items-center gap-2">
                            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-green-500 font-bold">Confirmado</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">info</span>
                      Notas adicionales
                    </h5>
                    <p className="text-sm text-text-dark-secondary leading-relaxed">
                      Se recomienda llegar 15 minutos antes para el registro. El estacionamiento del ala norte estará disponible sin costo para los asistentes. Habrá servicio de cafetería al finalizar la sesión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
