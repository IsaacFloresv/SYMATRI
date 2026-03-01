export default function PreviewInforme() {
  return (
    <body className="bg-background-dark font-display text-white">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="relative flex flex-col w-full max-w-6xl h-[95vh] bg-[#1a2734] rounded-xl shadow-2xl">
            <header className="flex items-center justify-between p-4 border-b border-[#233648] shrink-0">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white">Vista Previa del Informe</h2>
                    <p className="text-sm text-[#92aec9]">Resumen Mensual de Asistencia - Mayo 2024</p>
                </div>
                <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>
            <main className="flex-1 p-6 overflow-auto">
                <div className="bg-[#111a22] p-8 rounded-lg">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Informe de Asistencia Mensual</h3>
                            <p className="text-[#92aec9]">Periodo: 1 de Mayo, 2024 - 31 de Mayo, 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img alt="Logo Colegio" className="rounded-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8HdfBiF6wIBfEPjYUiBlnGPzpnihRmqrm3_bHukHcbGRXosc0_l930YZr9gByrnzpWotro6GYez35sFRfqmfYIff6GJNyVebsyjbM1YQwT0Y294O_uvMd4isFtugrxkYk7pV0c7DycjIvPeZMbpk3LJpEFMBOlIo4vLN9d8NPJan8UU_kLTw_YXcKwUe_Es1YBB69hWyP-qUkP1heIcsQ9lNo11QSJfsrjBP8k8jQRQ_7QrgLWKWrdQk5tLgGp3-3P5ysuNEZF4HO" />
                            <span className="text-lg font-semibold">Colegio Excelencia</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#233648]">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9]">Estudiante</th>
                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9] text-center">Días Presente</th>
                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9] text-center">Ausencias</th>
                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9] text-center">Tardanzas</th>
                                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9] text-center">% Asistencia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#233648]">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Fernanda González</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">21</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">1</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">2</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium text-center">95.4%</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Mateo Rodríguez</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">22</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">0</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">0</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium text-center">100%</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Sofía Hernández</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">19</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 text-center">3</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">1</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium text-center">86.3%</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Alejandro Pérez</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">22</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">0</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">0</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium text-center">100%</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Camila Gómez</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">20</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">2</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9] text-center">3</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium text-center">90.9%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 text-right text-xs text-[#92aec9]">
                        <p>Total de estudiantes: 5</p>
                        <p>Informe generado el: 1 de Junio, 2024</p>
                    </div>
                </div>
            </main>
            <footer className="flex items-center justify-between p-4 border-t border-[#233648] bg-[#1a2734] shrink-0 rounded-b-xl">
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer rounded-lg h-10 px-4 bg-white/10 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        <span className="truncate">Volver</span>
                    </button>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input className="h-4 w-4 rounded border-gray-500 bg-[#233648] text-primary focus:ring-primary focus:ring-offset-[#1a2734]" type="checkbox" />
                                <span className="text-white text-sm">PDF</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input className="h-4 w-4 rounded border-gray-500 bg-[#233648] text-primary focus:ring-primary focus:ring-offset-[#1a2734]" type="checkbox" />
                                <span className="text-white text-sm">Excel</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input className="h-4 w-4 rounded border-gray-500 bg-[#233648] text-primary focus:ring-primary focus:ring-offset-[#1a2734]" type="checkbox" />
                                <span className="text-white text-sm">CSV</span>
                            </label>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
                        <span className="material-symbols-outlined">download</span>
                        <span className="truncate">Generar Informe</span>
                    </button>
                </div>
            </footer>
        </div>
      </div>

    </body>
  );
}
