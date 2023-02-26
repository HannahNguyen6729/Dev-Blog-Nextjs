import {getBlogDetail} from "@/server/blog";
import {GetServerSideProps, NextPage} from "next";
import React from "react";

const SinglePost: NextPage = () => {
  return <div> blog post </div>;
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
