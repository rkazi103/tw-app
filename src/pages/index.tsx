import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { fetchTweets } from "../lib/data";
import { Tweet } from "../types";

type HomeProps = {
  tweets: Tweet[];
};

const Home: NextPage<HomeProps> = ({ tweets }) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter Clone</title>
        <meta
          name="description"
          content="A clone of Twitter FOR EDUCATIONAL PURPOSES!!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
  const tweets = await fetchTweets();

  return { props: { tweets } };
};
