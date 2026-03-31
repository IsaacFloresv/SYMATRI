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
  disabled?: boolean;
};

type Grado = {
  id: number | string;
  name: string;
};

type Seccion = {
  id: number | string;
  name?: string;
  periodo?: string;
  gradoId?: number;
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

function SelectableInput({ id, value, onChange, options, label, disabled }: SelectableInputProps) {
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
        disabled={disabled}
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
  const newStudentMode = searchParams.get("newStudent") === "true";

  const session = useAuthStorage((s) => s.user);
  const [encargadoName, setEncargadoName] = useState("");
  const [encargadoPhone, setEncargadoPhone] = useState("");
  const [encargadoEmail, setEncargadoEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [encargadoDireccion, setEncargadoDireccion] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [grados, setGrados] = useState<Grado[]>([]);
  const [secciones, setSecciones] = useState<Seccion[]>([]);
  const [availableSecciones, setAvailableSecciones] = useState<Seccion[]>([]);

  const [initialStudentData, setInitialStudentData] = useState<{
    firstName: string;
    lastName: string;
    birthDate: string;
    genero: string;
    address: string;
  } | null>(null);

  const [initialEncargadoData, setInitialEncargadoData] = useState<{
    firstName: string;
    lastName: string;
    telefono: string;
    email: string;
  } | null>(null);

  const [formMessage, setFormMessage] = useState("");

  const progress = (() => {
    const fields = [
      studentName,
      studentLastName,
      studentPhone,
      dob,
      gender,
      address,
      parentName,
      parentContact,
      parentEmail,
      encargadoName,
      encargadoPhone,
      encargadoEmail,
      encargadoDireccion,
      grade,
      section,
    ];
    const filled = fields.filter((item) => String(item).trim().length > 0).length;
    const total = fields.length;
    return Math.round((filled / total) * 100);
  })();

  useEffect(() => {
    if (newStudentMode) {
      setStudentName("");
      setStudentLastName("");
      setStudentPhone("");
      setDob("");
      setGender("");
      setAddress("");
      setInitialStudentData({
        firstName: "",
        lastName: "",
        birthDate: "",
        genero: "",
        address: "",
      });
      return;
    }

    if (!alumnoId) return;

    const loadStudent = async () => {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/users/byid?id=${alumnoId}`, { headers });
        if (!res.ok) return;
        const data = await res.json();
        const studentFirstName = data?.datosPersonales?.firstName ?? "";
        const studentLastName = data?.datosPersonales?.lastName ?? "";
        const studentBirthDate = formatDateToInput(
          data?.datosPersonales?.birthDate ||
          data?.datosPersonales?.fechaNacimiento ||
          data?.datosPersonales?.nacimiento ||
          ""
        );

        setStudentName([studentFirstName, studentLastName].filter(Boolean).join(" ").trim());
        setDob(studentBirthDate);
        setAddress(data?.datosPersonales?.address ?? "");
        setGender(data?.datosPersonales?.genero ?? "");

        setInitialStudentData({
          firstName: studentFirstName,
          lastName: studentLastName,
          birthDate: studentBirthDate,
          genero: data?.datosPersonales?.genero ?? "",
          address: data?.datosPersonales?.address ?? "",
        });
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

        const encargadoFirstName = data?.datosPersonales?.firstName || data?.datosPersonales?.name || data?.datosPersonales?.nombre || "";
        const encargadoLastName = data?.datosPersonales?.lastName || data?.datosPersonales?.last_name || "";
        const encargadoFullName = [encargadoFirstName, encargadoLastName].filter(Boolean).join(" ").trim();
        setEncargadoName(encargadoFullName);

        // Prefill parent/guardian info with encargado details
        const encargadoPhoneValue = data?.datosPersonales?.telefono ?? data?.telefono ?? data?.datosPersonales?.phone ?? "";
        const encargadoEmailValue = data?.email ?? data?.datosPersonales?.email ?? "";
        const encargadoAddressValue =
          data?.datosPersonales?.address ??
          data?.datosPersonales?.direccion ??
          "";

        setEncargadoPhone(encargadoPhoneValue);
        setEncargadoEmail(encargadoEmailValue);
        setEncargadoDireccion(encargadoAddressValue);

        setInitialEncargadoData({
          firstName: encargadoFirstName,
          lastName: encargadoLastName,
          telefono: encargadoPhoneValue,
          email: encargadoEmailValue,
        }); if (!parentName) setParentName(encargadoFullName);
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

  useEffect(() => {
    const loadGradosYSecciones = async () => {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      try {
        const [gradosRes, seccionesRes] = await Promise.all([
          fetch(`${api.baseUrl}/grados/all`, { headers }),
          fetch(`${api.baseUrl}/secciones/all`, { headers }),
        ]);

        if (!gradosRes.ok) throw new Error("Error cargando grados");
        if (!seccionesRes.ok) throw new Error("Error cargando secciones");

        const gradosData: Grado[] = await gradosRes.json();
        const seccionesData: Seccion[] = await seccionesRes.json();

        setGrados(gradosData || []);

        const currentYear = new Date().getFullYear().toString();
        setSecciones(
          (seccionesData || []).filter((s) => {
            if (!s.periodo || String(s.periodo).trim() === "") return true;
            return String(s.periodo).includes(currentYear);
          })
        );
      } catch (error) {
        console.error("Error al cargar grados o secciones", error);
      }
    };

    loadGradosYSecciones();
  }, []);

  useEffect(() => {
    if (!grade) {
      setAvailableSecciones([]);
      setSection("");
      return;
    }

    const filtered = secciones.filter(
      (s) =>
        String(s.gradoId) === grade ||
        String((s as any).grado?.id) === grade ||
        String((s as any).grado)?.toString?.() === grade
    );

    setAvailableSecciones(filtered);
    setSection("");
  }, [grade, secciones]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("");

    const updates: Promise<void>[] = [];
    let totalChanges = 0;

    // Actualiza datos del alumno si hubo cambios
    if (initialStudentData) {
      const [firstName, ...rest] = studentName.trim().split(" ");
      const lastName = rest.join(" ");
      const studentUpdate: any = {};

      if (firstName !== initialStudentData.firstName) {
        studentUpdate.firstName = firstName;
      }
      if (lastName !== initialStudentData.lastName) {
        studentUpdate.lastName = lastName;
      }
      if (dob !== initialStudentData.birthDate) {
        studentUpdate.birthDate = dob;
      }
      if (gender !== initialStudentData.genero) {
        studentUpdate.genero = gender;
      }
      if (address !== initialStudentData.address) {
        studentUpdate.address = address;
      }

      if (!newStudentMode && Object.keys(studentUpdate).length > 0 && alumnoId) {
        totalChanges += Object.keys(studentUpdate).length;
        studentUpdate.userId = alumnoId;
        updates.push(
          fetch(`${api.baseUrl}/dataUsers/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
            },
            body: JSON.stringify(studentUpdate),
          }).then(async (res) => {
            if (!res.ok) throw new Error("Error actualizando datos de alumno");
          })
        );
      }
    }

    // Actualiza datos del encargado si hubo cambios
    if (initialEncargadoData && session?.id) {
      const [firstName, ...rest] = encargadoName.trim().split(" ");
      const lastName = rest.join(" ");
      const encargadoUpdate: any = {};
      const encargadoDataUpdate: any = {};

      if (firstName !== initialEncargadoData.firstName) {
        encargadoDataUpdate.firstName = firstName;
      }
      if (lastName !== initialEncargadoData.lastName) {
        encargadoDataUpdate.lastName = lastName;
      }
      if (encargadoPhone !== initialEncargadoData.telefono) {
        encargadoDataUpdate.telefono = encargadoPhone;
      }
      if (encargadoEmail !== initialEncargadoData.email) {
        encargadoUpdate.email = encargadoEmail;
        encargadoDataUpdate.email = encargadoEmail;
      }

      if (Object.keys(encargadoUpdate).length > 0) {
        totalChanges += Object.keys(encargadoUpdate).length;
        updates.push(
          fetch(`${api.baseUrl}/users/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
            },
            body: JSON.stringify({ id: session.id, ...encargadoUpdate }),
          }).then(async (res) => {
            if (!res.ok) throw new Error("Error actualizando usuario encargado");
          })
        );
      }

      if (Object.keys(encargadoDataUpdate).length > 0) {
        // userId para el dataUser
        encargadoDataUpdate.userId = session.id;
        totalChanges += Object.keys(encargadoDataUpdate).length;
        updates.push(
          fetch(`${api.baseUrl}/dataUsers/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
            },
            body: JSON.stringify(encargadoDataUpdate),
          }).then(async (res) => {
            if (!res.ok) throw new Error("Error actualizando datos del encargado");
          })
        );
      }
    }

    // Para nuevo estudiante, crear registros nuevos
    if (newStudentMode) {
      if (!studentName.trim() || !studentLastName.trim()) {
        setFormMessage("Nombre y apellido del estudiante son requeridos.");
        return;
      }
      if (!grade.trim() || !section.trim()) {
        setFormMessage("Grado y sección son requeridos para completar la matrícula.");
        return;
      }

      try {
        // Creo user + profile
        const userPayload = {
          userName: `${studentName.trim()} ${studentLastName.trim()}`,
          pass: "Default123*",
          email: "",
          active: true,
          roleId: 1,
        };

        const userRes = await fetch(`${api.baseUrl}/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
          },
          body: JSON.stringify(userPayload),
        });

        if (!userRes.ok) {
          const err = await userRes.text();
          throw new Error(`Error creando usuario: ${userRes.status} ${err}`);
        }

        const createdUser = await userRes.json();
        const newUserId = createdUser?.id;
        if (!newUserId) throw new Error("No se obtuvo ID del usuario creado");

        const dataPayload = {
          userId: newUserId,
          firstName: studentName.trim(),
          lastName: studentLastName.trim(),
          birthDate: dob,
          genero: gender,
          address: address,
          telefono: studentPhone,
          gradoId: grade,
          seccionId: section,
        };

        const dataRes = await fetch(`${api.baseUrl}/dataUsers/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
          },
          body: JSON.stringify(dataPayload),
        });

        if (!dataRes.ok) {
          const err = await dataRes.text();
          throw new Error(`Error creando datos del estudiante: ${dataRes.status} ${err}`);
        }

        setFormMessage("Nuevo estudiante creado correctamente.");
        return;
      } catch (error: any) {
        console.error(error);
        setFormMessage(`Ocurrió un error al crear el estudiante: ${error.message || error}`);
        return;
      }
    }

    if (totalChanges === 0) {
      setFormMessage("No hay cambios para guardar.");
      return;
    }

    try {
      await Promise.all(updates);
      setFormMessage("Datos actualizados correctamente.");

      // Actualiza los valores iniciales
      setInitialStudentData((prev) =>
        prev
          ? {
            firstName: studentName.trim().split(" ")[0] || "",
            lastName: studentName.trim().split(" ").slice(1).join(" "),
            birthDate: dob,
            genero: gender,
            address,
          }
          : prev
      );

      setInitialEncargadoData((prev) =>
        prev
          ? {
            firstName: encargadoName.trim().split(" ")[0] || "",
            lastName: encargadoName.trim().split(" ").slice(1).join(" "),
            telefono: encargadoPhone,
            email: encargadoEmail,
          }
          : prev
      );
    } catch (error) {
      console.error(error);
      setFormMessage("Ocurrió un error al guardar los cambios.");
    }
  };

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
              Progress: <span className="text-primary">{progress}% Complete</span>
            </h3>
          </div>
          <div className="w-full bg-input-light dark:bg-input-dark rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
          {formMessage && (
            <div className="rounded-md border border-gray-300 bg-gray-100 p-3 text-sm text-gray-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              {formMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="student-name">
                Nombre
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
              <label className="block text-sm font-medium mb-1" htmlFor="student-name">
                Apellidos
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="student-lastname"
                placeholder="Enter student's lastname"
                type="text"
                value={studentLastName}
                onChange={(e) => setStudentLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="student-name">
                Telefono
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="student-name"
                placeholder="Enter student's phone number"
                type="text"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
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

          <h3 className="text-lg font-semibold">Informacion del Padre / Encargado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="parent-name">
                Nombre Completo
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="parent-name"
                placeholder="Ingrese el nombre completo del padre/encargado"
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="parent-contact">
                Numero de Contacto
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="parent-contact"
                placeholder="Ingrese el numero de contacto"
                type="tel"
                value={parentContact}
                onChange={(e) => setParentContact(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="student-name">
                Direccion
              </label>
              <input
                className="w-full bg-input-light dark:bg-input-dark border-transparent focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg px-4 py-3 transition"
                id="student-name"
                placeholder="Ingrese la direccion del padre/encargado"
                type="text"
                value={encargadoDireccion}
                onChange={(e) => setEncargadoDireccion(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-border-light dark:border-border-dark" />

          <h3 className="text-lg font-semibold">Informacion Academica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectableInput
              id="grade"
              label="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              options={[
                { value: "", label: "Select grade" },
                ...grados.map((g) => ({
                  value: String(g.id),
                  label: g.name,
                })),
              ]}
            />
            <SelectableInput
              id="section"
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              disabled={!grade || availableSecciones.length === 0}
              options={[
                { value: "", label: grade ? "Select section" : "Select grade first" },
                ...availableSecciones.map((s) => ({
                  value: String(s.id),
                  label: s.name || `Sección ${s.id}`,
                })),
              ]}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              className="font-bold py-3 px-6 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-all duration-300 flex items-center gap-2"
              type="submit"
              disabled={!grade || !section}
            >
              <span className="material-symbols-outlined">person_add</span>
              <span>Matricular Estudiante</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
