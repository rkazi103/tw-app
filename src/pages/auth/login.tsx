/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import type { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";

type LoginProps = {
  providers: object;
};

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="A clone of Twitter FOR EDUCATIONAL PURPOSES!!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src="/images/twitter.png" alt="Spotify Logo" className="mb-5 w-52" />
      <p className="font-bold">
        This is NOT THE REAL APP!! It is built to show of my web development
        skills 😊
      </p>

      {providers &&
        Object.values(providers).map((provider: Provider) => (
          <div key={provider.name}>
            <button
              className="mt-3 rounded-full bg-twitter p-5 text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              // onClick={() => console.log("i")}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
