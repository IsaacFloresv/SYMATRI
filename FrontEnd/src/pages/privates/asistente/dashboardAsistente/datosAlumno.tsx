import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Student {
  id: string;
  name: string;
  studentId: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
  birthDate?: string;
  gender?: string;
  admissionDate?: string;
  tutor?: string;
  emergencyPhone?: string;
  grade?: string;
  section?: string;
  teacher?: string;
  average?: number;
  absences?: number;
  tardies?: number;
  grades?: Array<{ subject: string; teacher: string; final: number }>;
}

export default function DatosAlumno() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/alumnos/byid?id=${id}`, {
          headers,
        });
        if (res.ok) {
          const data: any = await res.json();
          // map server response to Student interface as needed
          setStudent({
            id: data.id || "",
            name: data.name || data.studentName || "",
            studentId: data.studentId || data.id || "",
            avatarUrl: data.avatarUrl || data.photoUrl || "",
            email: data.email,
            phone: data.phone || data.telefono,
            address: data.address,
            active: data.active,
            birthDate: data.birthDate,
            gender: data.gender,
            admissionDate: data.admissionDate,
            tutor: data.tutor,
            emergencyPhone: data.emergencyPhone,
            grade: data.grade,
            section: data.section,
            teacher: data.teacher,
            average: data.average,
            absences: data.absences,
            tardies: data.tardies,
            grades: data.grades,
          });
        }
      } catch (e) {
        console.error("failed loading alumno", e);
      }
    }
    load();
  }, [id]);

  if (!student) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Detalles del Alumno
            </p>
            <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal">
              Información completa de {student.name}.
            </p>
          </div>
          <Button
            variant="ghost"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-x-2"
            onClick={() => navigate(-1 as any)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al Panel
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 text-center">
              <div
                className="mx-auto bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 mb-4"
                style={{
                  backgroundImage: `url('${student.avatarUrl || ""}')`,
                }}
              ></div>
              <h2 className="text-black dark:text-white text-xl font-bold leading-tight">
                {student.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                ID Alumno: {student.studentId}
              </p>
              {student.active && (
                <span className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <span className="size-2 rounded-full bg-green-500"></span>
                  Activo
                </span>
              )}
            </div>
            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6">
              <h3 className="text-black dark:text-white text-lg font-bold mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-3 text-sm">
                {student.email && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                      mail
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {student.email}
                    </span>
                  </div>
                )}
                {student.phone && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                      call
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {student.phone}
                    </span>
                  </div>
                )}
                {student.address && (
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5">
                      home
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {student.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* other sections (general data, academics, grades) could also be populated similarly */}
        </div>
      </div>
    </main>
  );
}
