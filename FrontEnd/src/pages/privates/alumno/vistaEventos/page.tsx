export default function eventosAlumnos() {
    return (

        <main className="flex-1 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-3xl font-bold tracking-tight">Gestión de Eventos</h1>
                        <p className="text-[#92aec9] text-base font-normal leading-normal">Visualiza y gestiona todos los eventos escolares.</p>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="bg-card-dark rounded-xl p-4">
                        <div className="flex items-center justify-between text-white">
                            <button className="p-1"><span className="material-symbols-outlined">chevron_left</span></button>
                            <h2 className="text-lg font-semibold">Octubre 2024</h2>
                            <button className="p-1"><span className="material-symbols-outlined">chevron_right</span></button>
                        </div>
                        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm text-text-dark-secondary">
                            <div>Do</div>
                            <div>Lu</div>
                            <div>Ma</div>
                            <div>Mi</div>
                            <div>Ju</div>
                            <div>Vi</div>
                            <div>Sá</div>
                        </div>
                        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm text-white">
                            <div className="text-text-dark-secondary"></div>
                            <div className="text-text-dark-secondary"></div>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                            <div>11</div>
                            <div>12</div>
                            <div>13</div>
                            <div>14</div>
                            <div>15</div>
                            <div>16</div>
                            <div>17</div>
                            <div>18</div>
                            <div>19</div>
                            <div>20</div>
                            <div>21</div>
                            <div>22</div>
                            <div>23</div>
                            <div>24</div>
                            <div className="relative"><span className="bg-primary rounded-full size-8 flex items-center justify-center">25</span>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 bg-yellow-400 rounded-full"></div>
                            </div>
                            <div>26</div>
                            <div>27</div>
                            <div>28</div>
                            <div>29</div>
                            <div>30</div>
                            <div>31</div>
                        </div>
                    </div>
                    <div className="bg-card-dark rounded-xl p-4">
                        <div className="flex items-center justify-between text-white">
                            <button className="p-1"><span className="material-symbols-outlined">chevron_left</span></button>
                            <h2 className="text-lg font-semibold">Noviembre 2024</h2>
                            <button className="p-1"><span className="material-symbols-outlined">chevron_right</span></button>
                        </div>
                        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm text-text-dark-secondary">
                            <div>Do</div>
                            <div>Lu</div>
                            <div>Ma</div>
                            <div>Mi</div>
                            <div>Ju</div>
                            <div>Vi</div>
                            <div>Sá</div>
                        </div>
                        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm text-white">
                            <div className="text-text-dark-secondary"></div>
                            <div className="text-text-dark-secondary"></div>
                            <div className="text-text-dark-secondary"></div>
                            <div className="text-text-dark-secondary"></div>
                            <div className="text-text-dark-secondary"></div>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                            <div>11</div>
                            <div>12</div>
                            <div>13</div>
                            <div>14</div>
                            <div className="relative"><span className="border border-primary rounded-full size-8 flex items-center justify-center">15</span>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 bg-yellow-400 rounded-full"></div>
                            </div>
                            <div>16</div>
                            <div>17</div>
                            <div>18</div>
                            <div>19</div>
                            <div>20</div>
                            <div>21</div>
                            <div>22</div>
                            <div>23</div>
                            <div>24</div>
                            <div>25</div>
                            <div>26</div>
                            <div>27</div>
                            <div>28</div>
                            <div>29</div>
                            <div>30</div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="overflow-x-auto bg-card-dark rounded-xl">
                            <table className="w-full text-left text-sm text-text-dark-secondary">
                                <thead className="text-xs uppercase text-text-dark-secondary/70">
                                    <tr>
                                        <th className="px-6 py-3" scope="col">Título del Evento</th>
                                        <th className="px-6 py-3" scope="col">Tipo</th>
                                        <th className="px-6 py-3" scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="cursor-pointer border-t border-border-dark bg-primary/20 text-text-dark-primary">
                                        <td className="px-6 py-4 font-medium">Reunión de Padres y Maestros</td>
                                        <td className="px-6 py-4">Reunión</td>
                                        <td className="px-6 py-4">25 de Oct, 2024</td>
                                    </tr>
                                    <tr className="cursor-pointer border-t border-border-dark hover:bg-card-dark/50">
                                        <td className="px-6 py-4 font-medium text-text-dark-primary">Feria de Ciencias Anual</td>
                                        <td className="px-6 py-4">Académico</td>
                                        <td className="px-6 py-4">15 de Nov, 2024</td>
                                    </tr>
                                    <tr className="cursor-pointer border-t border-border-dark hover:bg-card-dark/50">
                                        <td className="px-6 py-4 font-medium text-text-dark-primary">Torneo de Fútbol Interescolar</td>
                                        <td className="px-6 py-4">Deportivo</td>
                                        <td className="px-6 py-4">28 de Sep, 2024</td>
                                    </tr>
                                    <tr className="cursor-pointer border-t border-border-dark hover:bg-card-dark/50">
                                        <td className="px-6 py-4 font-medium text-text-dark-primary">Concierto de Invierno</td>
                                        <td className="px-6 py-4">Cultural</td>
                                        <td className="px-6 py-4">12 de Dic, 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-card-dark rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Detalles del Evento</h3>
                            <div className="flex gap-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-text-dark-secondary"><span className="material-symbols-outlined text-xl">edit</span></button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-text-dark-secondary"><span className="material-symbols-outlined text-xl">delete</span></button>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-border-dark pt-4">
                            <h4 className="text-lg font-semibold text-white">Reunión de Padres y Maestros</h4>
                            <p className="mt-2 text-sm text-text-dark-secondary">Reunión trimestral para discutir el progreso de los estudiantes y los próximos eventos escolares.</p>
                            <div className="mt-6 space-y-4 text-sm">
                                <div className="flex items-start">
                                    <span className="material-symbols-outlined text-primary mr-3 mt-0.5 text-lg">calendar_today</span>
                                    <div>
                                        <p className="font-medium text-white">Fecha y Hora</p>
                                        <p className="text-text-dark-secondary">25 de Octubre, 2024 - 6:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="material-symbols-outlined text-primary mr-3 mt-0.5 text-lg">location_on</span>
                                    <div>
                                        <p className="font-medium text-white">Ubicación</p>
                                        <p className="text-text-dark-secondary">Auditorio Principal</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="material-symbols-outlined text-primary mr-3 mt-0.5 text-lg">groups</span>
                                    <div>
                                        <p className="font-medium text-white">Público Objetivo</p>
                                        <p className="text-text-dark-secondary">Padres</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="material-symbols-outlined text-primary mr-3 mt-0.5 text-lg">label</span>
                                    <div>
                                        <p className="font-medium text-white">Tipo de Evento</p>
                                        <p className="text-text-dark-secondary">Reunión</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="material-symbols-outlined text-primary mr-3 mt-0.5 text-lg">task_alt</span>
                                    <div>
                                        <p className="font-medium text-white">Estado</p>
                                        <p className="text-text-dark-secondary">Confirmado</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}       
