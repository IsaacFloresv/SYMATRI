export default function SectionTableTask() {
    return (        
        <main className="flex-1 p-8">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-white">Panel de Control del Estudiante</h1>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-white">Progreso General</h2>
                        <div className="bg-card-dark rounded-lg p-6 shadow-sm">
                            <p className="text-lg font-semibold text-text-light mb-2">Progreso en el Curso: 75%</p>
                            <div className="w-full bg-border-dark rounded-full h-4">
                                <div className="bg-primary h-4 rounded-full w-[75%]"></div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Resumen de Tareas</h2>
                        <div className="bg-card-dark rounded-lg shadow-sm">
                            <ul className="divide-y divide-border-dark">
                                <li className="p-4 flex items-center gap-4 hover:bg-card-dark/50">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Completar el cuestionario de álgebra</p>
                                        <p className="text-sm text-text-dark">Matemáticas - Fecha de entrega: 15 de mayo</p>
                                    </div>
                                    <span className="material-symbols-outlined text-green-500 ml-auto">check_circle</span>
                                </li>
                                <li className="p-4 flex items-center gap-4 hover:bg-card-dark/50">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Investigar sobre la Revolución Francesa</p>
                                        <p className="text-sm text-text-dark">Historia - Fecha de entrega: 18 de mayo</p>
                                    </div>
                                    <span className="material-symbols-outlined text-yellow-500 ml-auto">pending</span>
                                </li>
                                <li className="p-4 flex items-center gap-4 hover:bg-card-dark/50">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Preparar presentación sobre el sistema solar</p>
                                        <p className="text-sm text-text-dark">Ciencias - Fecha de entrega: 20 de mayo</p>
                                    </div>
                                    <span className="material-symbols-outlined text-red-500 ml-auto">cancel</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Logros y Badges</h2>
                        <div className="bg-card-dark rounded-lg p-6 shadow-sm">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">🏆</div>
                                    <p className="text-sm text-text-light font-semibold">Estudiante del Mes</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">🌟</div>
                                    <p className="text-sm text-text-light font-semibold">10 Tareas Completadas</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">🧠</div>
                                    <p className="text-sm text-text-light font-semibold">Genio Matemático</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Próximos Eventos</h2>
                        <div className="bg-card-dark rounded-lg shadow-sm">
                            <ul className="divide-y divide-border-dark">
                                <li className="p-4 flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Examen parcial de Matemáticas</p>
                                        <p className="text-sm text-text-dark">16 de mayo, 10:00 AM</p>
                                    </div>
                                </li>
                                <li className="p-4 flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Reunión de padres y maestros</p>
                                        <p className="text-sm text-text-dark">19 de mayo, 2:00 PM</p>
                                    </div>
                                </li>
                                <li className="p-4 flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1"><svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path></svg></div>
                                    <div>
                                        <p className="font-semibold text-text-light">Presentación de proyectos de Ciencias</p>
                                        <p className="text-sm text-text-dark">22 de mayo, 9:00 AM</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Acceso Rápido</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                                Ver Calificaciones
                            </button>
                            <button className="flex-1 bg-primary/20 text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary/30 transition-colors">
                                Ver Horario de Clases
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>);
}