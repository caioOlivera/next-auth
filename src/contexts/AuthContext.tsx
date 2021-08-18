/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies"; //cookies with nextjs integration
import Router from "next/router";

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    // aqui eh o lugar correto pra enviar os dados de login para a api e receber de volta o token para autenticar
    // here is the place to send the data to the api and receive back a auth token
    // fecth or axios
    const { token, user } = await signInRequest({
      email,
      password,
    });
    // cookies para armazenar token pois o next usa ssr e nao consegue acessar o local storage
    // cookies to keep the token cause next uses ssr and cant acess local storage
    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    // aqui a gente encapsulou o contexto dentro de um component para o contexto n poder ter seu value acessado pelo app
    // here we encapsulated the context inside a component to prevent having its value being acessed at the app file
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
