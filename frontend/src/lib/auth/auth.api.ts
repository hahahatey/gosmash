import { SignInRequest, SignInResponse, SignUpRequest } from "../dto/auth.dto";

export const signin = async (data: SignInRequest): Promise<SignInResponse> => {
  const res = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

   if (!res.ok) {
    const errorData = await res.json();
    // Передаём весь объект ошибки, чтобы можно было проверить errorCode
    throw errorData;
  }

  const response = await res.json();

  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken); // ← сохраняем
  return response;
};

export const signup = async (data: SignUpRequest) => {
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
}

export const logout = () =>
  fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });
