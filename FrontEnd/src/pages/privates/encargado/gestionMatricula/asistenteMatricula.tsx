import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { Button } from "@/components/ui/button";

type Option = {
  value: string;
  label: string;
};

type SelectableInputProps = {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label: string;
};

function formatDateToInput(value: string): string {
  if (!value) return "";

  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  // Try ISO combo format like 2024-05-17T14:30:00Z
  const isoMatch = value.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoMatch) return isoMatch[1];

  // Try common formats
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return "";
}

function SelectableInput({ id, value, onChange, options, label }: SelectableInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white appearance-none pr-8"
        id={id}
        value={value}
        onChange={onChange}
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27 fill=%27%239ca3af%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z%27 clip-rule=%27evenodd%27/%3e%3c/svg%3e')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AsistenteMatricula() {
  const [searchParams] = useSearchParams();
  const alumnoId = Number(searchParams.get("alumnoId") ?? "");

  const session = useAuthStorage((s) => s.user);
  const [encargadoName, setEncargadoName] = useState("");
  const [encargadoPhone, setEncargadoPhone] = useState("");
  const [encargadoEmail, setEncargadoEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    if (!alumnoId) return;

    const loadStudent = async () => {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/users/byid?id=${alumnoId}`, { headers });
        if (!res.ok) return;
        const data = await res.json();
        const nombre = data?.datosPersonales?.firstName;
        const apellido = data?.datosPersonales?.lastName;
        setStudentName([nombre, apellido].filter(Boolean).join(" ").trim());
        setDob(
          formatDateToInput(
            data?.datosPersonales?.birthDate ||
            data?.datosPersonales?.fechaNacimiento ||
            data?.datosPersonales?.nacimiento ||
            ""
          )
        );
        setAddress(data?.datosPersonales?.address ?? "");
        setGender(data?.datosPersonales?.genero ?? "");
      } catch (err) {
        console.error("Error cargando alumno", err);
      }
    };

    loadStudent();
  }, [alumnoId]);

  useEffect(() => {
    if (!session?.id) return;

    const loadEncargado = async () => {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/users/byid?id=${session.id}`, { headers });
        if (!res.ok) return;
        const data = await res.json();

        const nombre = data?.datosPersonales?.firstName || data?.datosPersonales?.name || data?.datosPersonales?.nombre;
        const apellido = data?.datosPersonales?.lastName || data?.datosPersonales?.last_name || "";
        const encargadoFullName = [nombre, apellido].filter(Boolean).join(" ").trim();
        setEncargadoName(encargadoFullName);

        // Prefill parent/guardian info with encargado details
        const encargadoPhoneValue = data?.datosPersonales?.telefono ?? data?.telefono ?? data?.datosPersonales?.phone ?? "";
        const encargadoEmailValue = data?.email ?? data?.datosPersonales?.email ?? "";
        setEncargadoPhone(encargadoPhoneValue);
        setEncargadoEmail(encargadoEmailValue);
        if (!parentName) setParentName(encargadoFullName);
        if (!parentContact && encargadoPhoneValue) setParentContact(encargadoPhoneValue);
        if (!parentEmail && encargadoEmailValue) setParentEmail(encargadoEmailValue);
      } catch (err) {
        console.error("Error cargando encargado", err);
        const anySession = session as any;
        if (anySession?.name || anySession?.userName) {
          const fallbackName = anySession.name || anySession.userName || "";
          setEncargadoName(fallbackName);
          if (!parentName) setParentName(fallbackName);
        }
        if (!parentEmail && (anySession?.email || (anySession as any)?.datosPersonales?.email)) {
          setParentEmail(anySession?.email || (anySession as any)?.datosPersonales?.email || "");
        }
        if (!parentContact && (anySession?.phone || (anySession as any)?.datosPersonales?.telefono || (anySession as any)?.datosPersonales?.phone)) {
          setParentContact(anySession?.phone || (anySession as any)?.datosPersonales?.telefono || (anySession as any)?.datosPersonales?.phone || "");
        }
      }
    };

    loadEncargado();
  }, [session?.id]);

  return (
    <main className="flex-grow p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">New Student Enrollment</h2>
          <p className="text-subtle-light dark:text-subtle-dark mt-1">
            Fill out the form below to enroll a new student.
          </p>
        </div>

        <div className="mb-6 bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Progress: <span className="text-primary">66% Complete</span>
            </h3>
            <Button className="font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-base">save</span>
              Save Draft
            </Button>
          </div>
          <div className="w-full bg-input-light dark:bg-input-dark rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: "66%" }} />
          </div>
        </div>

        <form className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="encargado-name">
                Encargado
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="encargado-name"
                type="text"
                value={encargadoName}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="encargado-phone">
                Encargado Phone
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="encargado-phone"
                type="tel"
                value={encargadoPhone}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="encargado-email">
                Encargado Email
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="encargado-email"
                type="email"
                value={encargadoEmail}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="student-name">
                Student Name
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="student-name"
                placeholder="Enter student's full name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">       
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Address
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="address"
                placeholder="Enter student's address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <SelectableInput
              id="gender"
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "", label: "Select gender" },
                { value: "masculino", label: "Male" },
                { value: "femenino", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>

          <hr className="border-border-light dark:border-border-dark" />

          <h3 className="text-lg font-semibold">Parent / Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="parent-name">
                Full Name
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="parent-name"
                placeholder="Enter parent/guardian's name"
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="parent-contact">
                Contact Number
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="parent-contact"
                placeholder="Enter contact number"
                type="tel"
                value={parentContact}
                onChange={(e) => setParentContact(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="parent-email">
              Email Address
            </label>
            <input
              className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
              id="parent-email"
              placeholder="Enter email address"
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
            />
          </div>

          <hr className="border-border-light dark:border-border-dark" />

          <h3 className="text-lg font-semibold">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectableInput
              id="grade"
              label="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              options={[
                { value: "", label: "Select grade" },
                { value: "1", label: "Grade 1" },
                { value: "2", label: "Grade 2" },
                { value: "3", label: "Grade 3" },
                { value: "4", label: "Grade 4" },
                { value: "5", label: "Grade 5" },
              ]}
            />
            <SelectableInput
              id="section"
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              options={[
                { value: "", label: "Select section" },
                { value: "A", label: "Section A" },
                { value: "B", label: "Section B" },
                { value: "C", label: "Section C" },
              ]}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              className="font-bold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-all duration-300 flex items-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined">person_add</span>
              <span>Enroll Student</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
