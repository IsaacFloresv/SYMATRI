export default function VistaInformes() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-black">Gestión de Informes</h1>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left">
            <thead className="bg-[#233648]">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9]">Report Name</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9]">Created By</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9]">Last Modified</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#92aec9]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233648]">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Monthly Attendance Summary</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9]">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9]">2024-05-10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-primary hover:text-blue-400 transition-colors">Vista Previa</button>
                    <button className="text-[#92aec9] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Absences by Grade</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9]">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#92aec9]">2024-05-08</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-primary hover:text-blue-400 transition-colors">Vista Previa</button>
                    <button className="text-[#92aec9] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
