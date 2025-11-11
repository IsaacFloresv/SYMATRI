//import { useAuthStorage } from "@/hooks/useAuthStorage";
import { fetchUsers } from "@/lib/api.ts";
import type { loginData } from "@/schemas/authSchema.ts";
import {useAuth} from "../hooks/useAuth"


type LoginResponse = {
  email: string;
  password: string;
}

export async function validateLogin(loginData: loginData) {
  
  const users = await fetchUsers();
  const user = users.find(
    (u:LoginResponse) => u.email === loginData.email_user && u.password === loginData.password_user
  );
  return user || null;
}

//export async function login(email, password) {}

type GetMeResponse = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
}


export async function getMe(user:string) {  
  const data  = await fetchUsers();
  const resp = data.find((u:GetMeResponse) => u.email === user);
  return resp;
}

export function logout() {
  useAuth().onLogout();
}