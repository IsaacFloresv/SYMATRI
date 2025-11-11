export const api = {
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 5000,
  token: localStorage.getItem("user") || null,
};



export async function fetchUsers() {
  try {
    const response = await fetch('/data/users.json');
    if (!response.ok) {
      handleErrors(response)
      throw new Error('Error al cargar los usuarios');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error en fetchUsers:', error);
    return [];
  }
}

function handleErrors(response: any) {
/*     response => response, 
    response => {*/
      if (
        response.status === 401 &&
        response.status === "Not valid token"
      ) {
        localStorage.removeItem("user");
        localStorage.getState().setUser(null);
      }
    //}
}