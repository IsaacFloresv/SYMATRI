export default function informeProfesor() {
    return (
    <main class="flex-1 p-6 lg:p-8">
<div class="max-w-7xl mx-auto">
<!-- PageHeading -->
<div class="flex flex-wrap justify-between items-center gap-4 mb-8">
<h1 class="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Generación y Gestión de Informes</h1>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Left Panel: Report Generation -->
<div class="lg:col-span-1">
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark h-fit">
<!-- SectionHeader -->
<h2 class="text-xl font-bold leading-tight tracking-[-0.015em] mb-6">Generar Nuevo Informe</h2>
<form class="flex flex-col gap-6">
<!-- TextField: Tipo de Informe -->
<label class="flex flex-col w-full">
<p class="text-sm font-medium leading-normal pb-2">Tipo de Informe</p>
<select class="form-select w-full rounded-DEFAULT text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 px-3 text-base font-normal leading-normal appearance-none">
<option>Informe de Calificaciones</option>
<option>Informe de Asistencia</option>
<option>Informe de Comportamiento</option>
</select>
</label>
<!-- TextField: Período Académico -->
<label class="flex flex-col w-full">
<p class="text-sm font-medium leading-normal pb-2">Período Académico</p>
<select class="form-select w-full rounded-DEFAULT text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 px-3 text-base font-normal leading-normal appearance-none">
<option>1er Trimestre</option>
<option>2do Trimestre</option>
<option>3er Trimestre</option>
<option>Anual</option>
</select>
</label>
<!-- TextField: Sección/Clase -->
<label class="flex flex-col w-full">
<p class="text-sm font-medium leading-normal pb-2">Sección/Clase</p>
<select class="form-select w-full rounded-DEFAULT text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-12 px-3 text-base font-normal leading-normal appearance-none">
<option>Matemáticas 7-A</option>
<option>Matemáticas 7-B</option>
<option>Álgebra 8-A</option>
</select>
</label>
<!-- Primary Button -->
<button class="mt-4 flex w-full items-center justify-center gap-2 rounded-DEFAULT bg-primary h-12 px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark" type="button">
<span class="material-symbols-outlined">add_chart</span>
                                    Generar Informe
                                </button>
</form>
</div>
</div>
<!-- Right Panel: Report History -->
<div class="lg:col-span-2">
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
<h2 class="text-xl font-bold leading-tight tracking-[-0.015em]">Historial de Informes Generados</h2>
<div class="relative w-full sm:w-auto">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary">search</span>
<input class="form-input w-full sm:w-64 pl-10 pr-4 py-2 h-10 rounded-DEFAULT border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Buscar informe..." type="text"/>
</div>
</div>
<!-- Reports Table -->
<div class="overflow-x-auto">
<table class="w-full text-left text-sm">
<thead class="border-b border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary">
<tr>
<th class="py-3 px-4 font-medium" scope="col">Informe</th>
<th class="py-3 px-4 font-medium" scope="col">Fecha</th>
<th class="py-3 px-4 font-medium" scope="col">Detalles</th>
<th class="py-3 px-4 font-medium text-right" scope="col">Acciones</th>
</tr>
</thead>
<tbody>
<tr class="border-b border-border-light dark:border-border-dark">
<td class="py-4 px-4 font-medium">Informe de Calificaciones</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">15/07/2024</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">Matemáticas 7-A, 2do Trimestre</td>
<td class="py-4 px-4">
<div class="flex justify-end items-center gap-2">
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Visualizar informe">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Descargar informe">
<span class="material-symbols-outlined">download</span>
</button>
<button class="p-2 rounded-full hover:bg-danger/10 text-danger transition-colors" data-alt="Eliminar informe">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</td>
</tr>
<tr class="border-b border-border-light dark:border-border-dark">
<td class="py-4 px-4 font-medium">Informe de Asistencia</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">10/07/2024</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">Álgebra 8-A, 2do Trimestre</td>
<td class="py-4 px-4">
<div class="flex justify-end items-center gap-2">
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Visualizar informe">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Descargar informe">
<span class="material-symbols-outlined">download</span>
</button>
<button class="p-2 rounded-full hover:bg-danger/10 text-danger transition-colors" data-alt="Eliminar informe">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</td>
</tr>
<tr class="border-b border-border-light dark:border-border-dark">
<td class="py-4 px-4 font-medium">Informe de Calificaciones</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">15/04/2024</td>
<td class="py-4 px-4 text-text-light-secondary dark:text-text-dark-secondary">Matemáticas 7-B, 1er Trimestre</td>
<td class="py-4 px-4">
<div class="flex justify-end items-center gap-2">
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Visualizar informe">
<span class="material-symbols-outlined">visibility</span>
</button>
<button class="p-2 rounded-full hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary transition-colors" data-alt="Descargar informe">
<span class="material-symbols-outlined">download</span>
</button>
<button class="p-2 rounded-full hover:bg-danger/10 text-danger transition-colors" data-alt="Eliminar informe">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
<!-- Empty State -->
<!-- 
                                <div class="text-center py-16">
                                    <span class="material-symbols-outlined text-5xl text-text-light-secondary dark:text-text-dark-secondary/50 mb-4">upcoming</span>
                                    <p class="font-medium">Aún no has generado ningún informe.</p>
                                    <p class="text-text-light-secondary dark:text-text-dark-secondary">Utiliza el panel de la izquierda para crear tu primero.</p>
                                </div> 
                                -->
</div>
</div>
</div>
</div>
</div>
</main>

    )
  }   

  