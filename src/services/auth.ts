/* eslint-disable */
import { v4 as uuid } from "uuid";
// eh uma biblioteca que gera um token universal
// is a lib that genarates a universal token

type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    // aqui retornamos o token e as infos do usuarios que nao sao sensiveis e serao uteis pra renderizar
    // here we return the token and the non-sensible user infos

    token: uuid(),
    user: {
      name: "Caio Oliveira",
      email: "caio@gmail.com",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1426194645193736197/q99cuZX4_400x400.jpg",
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: "Caio Oliveira",
      email: "caio@gmail.com",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1426194645193736197/q99cuZX4_400x400.jpg",
    },
  };
}
