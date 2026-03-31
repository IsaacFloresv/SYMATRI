import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  userName?: string;
  datosPersonales?: {
    firstName?: string;
    lastName?: string;
    name?: string;
    nombre?: string;
    first_name?: string;
    last_name?: string;
  };
  roleId?: number;
}

export default function GestionMatricula() {
  const session = useAuthStorage((s) => s.user);
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [creatingNewStudent, setCreatingNewStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudentName = (stu: Student) => {
    const dp = stu.datosPersonales || ({} as any);
    const firstName = dp.firstName || dp.first_name || dp.name || dp.nombre || "";
    const lastName = dp.lastName || dp.last_name || "";
    const username = (stu as any).userName || (stu as any).user_name || "";
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    return name || username || `Alumno #${stu.id}`;
  };

  useEffect(() => {
    async function loadStudents() {
      if (!session?.id) return;

      setLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;

        const res = await fetch(`${api.baseUrl}/encargadoalumnos/byid?id=${session.id}`, { headers });
        if (!res.ok) throw new Error("Error al cargar alumnos");
        const data = await res.json();
        // API returns [{ ..., encargado: [{ alumno: { ... } }, ...] }]
        const alumnos = Array.isArray(data?.[0]?.encargado)
          ? data[0].encargado.map((e: any) => e.alumno).filter(Boolean)
          : [];
        setStudents(alumnos);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la lista de alumnos.");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, [session?.id]);

  const handleStartEnrollment = () => {
    if (creatingNewStudent) {
      navigate(`/encargado/asistente-matricula?newStudent=true`);
      return;
    }

    if (!selectedStudent) return;
    navigate(`/encargado/asistente-matricula?alumnoId=${selectedStudent.id}`);
  };

  return (
    <main className="flex-1 p-4 md:p-10">
      <div className="w-full max-w-[520px] mx-auto flex flex-col gap-8">
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-10">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight">
              Validación de Alumno
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed mt-2">
              Ingrese el nombre del alumno para iniciar el proceso de matrícula
            </p>
          </div>

          <div className="w-full">
            <img
              src="/matricula.png"
              alt="Estudiante ingresando datos"
              className="w-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 p-5">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Detalles de inscripción
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Por favor, asegúrese de que el nombre coincida con el documento de identidad oficial para evitar retrasos.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">
                  Seleccione al alumno que desee matricular
                </label>

                {loading ? (
                  <p className="text-sm text-muted-foreground">Cargando alumnos…</p>
                ) : error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : students.length > 0 ? (
                  <select
                    value={creatingNewStudent ? "new" : selectedStudent?.id ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "new") {
                        setSelectedStudent(null);
                        setCreatingNewStudent(true);
                        return;
                      }

                      const id = Number(value);
                      const stu = students.find((s) => s.id === id) || null;
                      setSelectedStudent(stu);
                      setCreatingNewStudent(false);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccione alumno...</option>
                    {students.map((stu) => (
                      <option key={stu.id} value={stu.id}>
                        {getStudentName(stu)}
                      </option>
                    ))}
                    <option value="new">+ Agregar estudiante nuevo</option>
                  </select>
                ) : (
                  <p className="text-sm text-muted-foreground">No hay alumnos asignados.</p>
                )}
              </div>

              <Button className="w-full h-14" onClick={handleStartEnrollment}>
                <span className="material-symbols-outlined mr-2">how_to_reg</span>
                Iniciar Matrícula
              </Button>

              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-500 text-xs font-medium">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Conexión segura y encriptada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-500">
          <a className="hover:text-primary" href="#">
            Ayuda
          </a>
          <a className="hover:text-primary" href="#">
            Privacidad
          </a>
          <a className="hover:text-primary" href="#">
            Términos
          </a>
        </div>
      </div>
    </main>
  );
}
