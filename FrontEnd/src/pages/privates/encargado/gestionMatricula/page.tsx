import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStorage } from "@/hooks/useAuthStorage";

export default function GestionMatricula() {
  const navigate = useNavigate();
  const session = useAuthStorage((s) => s.user);

  const [form, setForm] = useState({
    studentName: "",
    dob: "",
    gender: "",
    address: "",
    parentName: "",
    parentContact: "",
    parentEmail: "",
    grade: "",
    section: "",
  });

  const [grades, setGrades] = useState<string[]>([]);
  const [sections, setSections] = useState<
    { id: string; grade: string; name: string }[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const showDOB = !!form.studentName;
  const showGenderAddress = !!form.dob;
  const showParentInfo = !!(form.gender || form.address);
  const showParentContact = !!form.parentName;
  const showParentEmail = !!form.parentContact;
  const showAcademic = !!form.parentEmail;

  const totalFields = 9;
  const completedFields =
    [
      form.studentName,
      form.dob,
      form.gender,
      form.address,
      form.parentName,
      form.parentContact,
      form.parentEmail,
      form.grade,
      form.section,
    ].filter(Boolean).length;
  const progress = Math.round((completedFields / totalFields) * 100);

  useEffect(() => {
    async function loadData() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const [gRes, sRes] = await Promise.all([
          fetch(`${api.baseUrl}/grados/all`, { headers }),
          fetch(`${api.baseUrl}/secciones/all`, { headers }),
        ]);
        if (gRes.ok) {
          const arr = await gRes.json();
          setGrades(arr.map((g: any) => g.name || g.grade || ""));
        }
        if (sRes.ok) {
          const arr = await sRes.json();
          const opts = arr.map((s: any) => ({
            id: s.id?.toString() || "",
            grade: s.grade || "",
            name: s.name || "",
          }));
          setSections(opts);
        }
      } catch (err) {
        console.error("error loading grades/sections", err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (form.grade && form.section) {
      const valid = sections.some(
        (o) => o.grade === form.grade && o.id === form.section
      );
      if (!valid) {
        setForm((p) => ({ ...p, section: "" }));
      }
    }
  }, [form.grade, form.section, sections]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const userRes = await fetch(`${api.baseUrl}/users/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email: form.parentEmail || "",
          userName: form.studentName.replace(/\s+/g, "."),
          pass: "",
        }),
      });
      if (!userRes.ok) throw new Error("failed creating user");
      const newUser = await userRes.json();
      const studentId = newUser.id || newUser.insertId || newUser[0]?.id;
      await fetch(`${api.baseUrl}/dataUsers/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          userId: studentId,
          firstName: form.studentName,
          lastName: "",
          address: form.address,
          telefono: form.parentContact,
          birthDate: form.dob,
          gender: form.gender,
        }),
      });
      if (form.section) {
        await fetch(`${api.baseUrl}/seccionAlumnos/create`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            alumnoId: studentId,
            seccionId: form.section,
            periodo: form.grade,
          }),
        });
      }
      if (session?.id) {
        await fetch(`${api.baseUrl}/encargadoAlumnos/create`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            alumnoId: studentId,
            encargadoId: session.id,
          }),
        });
      }
      setMessage("Alumno inscrito correctamente");
      setTimeout(() => navigate(-1 as any), 1500);
    } catch (err) {
      console.error("error submitting matricula", err);
      setMessage("Hubo un error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-grow p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            New Student Enrollment
          </h2>
          <p className="text-subtle-light dark:text-subtle-dark mt-1">
            Fill out the form below to enroll a new student.
          </p>
        </div>
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}
        <div className="mb-6 bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Progress: <span className="text-primary">{progress}% Complete</span>
            </h3>
          </div>
          <div className="w-full bg-input-light dark:bg-input-dark rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <form
          className="bg-card-light dark:bg-card-dark p-6 sm:p-8 rounded-lg shadow-sm space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Student Name
              </label>
              <Input
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter student's full name"
              />
            </div>
            {showDOB && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <Input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {showGenderAddress && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender
                </label>
                <Select value={form.gender} onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter student's address"
                />
              </div>
            </div>
          )}

          {showParentInfo && (
            <>
              {!showParentContact && (
                <hr className="border-border-light dark:border-border-dark" />
              )}
              <h3 className="text-lg font-semibold">
                Parent / Guardian Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    name="parentName"
                    value={form.parentName}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter parent/guardian's name"
                  />
                </div>
                {showParentContact && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contact Number
                    </label>
                    <Input
                      name="parentContact"
                      value={form.parentContact}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter contact number"
                      type="tel"
                    />
                  </div>
                )}
              </div>
              {showParentEmail && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    name="parentEmail"
                    value={form.parentEmail}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter email address"
                    type="email"
                  />
                </div>
              )}
            </>
          )}

          {showAcademic && (
            <>
              <hr className="border-border-light dark:border-border-dark" />
              <h3 className="text-lg font-semibold">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Grade</label>
                  <Select value={form.grade} onValueChange={(v) => setForm((p) => ({ ...p, grade: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Section</label>
                  <Select value={form.section} onValueChange={(v) => setForm((p) => ({ ...p, section: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections
                        .filter((s) => !form.grade || s.grade === form.grade)
                        .map((s) => (
                          <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              <span className="material-symbols-outlined">person_add</span>
              <span>Enroll Student</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
