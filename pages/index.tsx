import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main>
        <title>Home page</title>
        <section>
          <div className="mt-3 text-center">
            <h1 className="text-[3rem]">Welcome to Dev Blog</h1>
            <p>
              A fullstack blog made with Nextjs, TailwindCss, Github GraphQL
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
