import axios from "axios";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/login`,
    {
      email,
      password,
    }
  );
  localStorage.setItem("token", data.token);
  return data;
};

export const register = async (values: object) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/create/user`,
    values
  );
  localStorage.setItem("token", data.token);
  return data;
};

export const logout = async () => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  localStorage.removeItem("token");
  return null;
};

export const loginBack = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/token/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  return { user: data, token };
};
