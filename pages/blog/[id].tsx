import BlogHeader from "@/components/BlogHeader";
import {getBlogDetail} from "@/server/blog";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import React from "react";
import parse from "html-react-parser";
import styles from "./id.module.css";

const SinglePost: NextPage = ({
  blogDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {createdAt, title, bodyHTML, author} = blogDetail;

  return (
    <section className="layout">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold">{title}</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader author={author} createdAt={createdAt} />
        </div>
        <div className={`${styles.html} flex flex-col`}>{parse(bodyHTML)}</div>
      </div>
    </section>
  );
};

export default SinglePost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // blogID =  context.params?.id || context.query.id);
  const id: string | string[] | undefined = context.params?.id;
  const newId = Number(id);
  const blogDetail = await getBlogDetail(newId);
  //   console.log("blogDetail", blogDetail);
  return {
    props: {
      blogDetail,
    },
  };
};
