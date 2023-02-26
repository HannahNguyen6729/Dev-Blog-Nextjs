// call query function and get data from github graphql

import {BlogDetail, BlogPost} from "@/types/blog";
import {discussionDetailGgl, discussionGrapQL} from "./graphql";

const API_URL = "https://api.github.com/graphql";

//function to get blogs from github api
export const getBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: discussionGrapQL(process.env.DISCUSSION_CATEGORY_ID),
    }),
  });

  const result = await response.json();
  const blogs = await result.data.repository.discussions.nodes;
  const posts = blogs.map((blog: any): BlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = blog;
    const url = `/blog/${id}`;
    const authorUrl = author.url;
    const authorName = author.login;
    const authorAvatar = author.avatarUrl;
    const tags: string[] = labels.nodes.map(
      (label: {name: string}) => label.name
    );

    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: {name: authorName, url: authorUrl, avatar: authorAvatar},
    };
    return post;
  });

  return posts;
};

// tags: [ 'start', '2023', 'project' ],
// author: {
//   name: 'HannahNguyen6729',
//   url: 'https://github.com/HannahNguyen6729',
//   avatar: 'https://avatars.githubusercontent.com/u/81440768?u=0649d6d35311519e4131037cdd9098d22c0a856d&v=4'
// }

//get a single blog post
export const getBlogDetail = async (blogId: number): Promise<BlogDetail> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: discussionDetailGgl(blogId),
    }),
  });

  const result = await response.json();
  let discussion = await result.data.repository.discussion;

  const {author, createdAt, title, bodyHTML} = discussion;

  const detail = {
    author: {url: author.url, name: author.login, avatar: author.avatarUrl},
    createdAt,
    title,
    bodyHTML,
  };
  return detail;
};
