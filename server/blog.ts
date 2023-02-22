// call query function and get data from github graphql

import {discussionGrapQL} from "./graphql";

const API_URL = "https://api.github.com/graphql";

//function to get blogs from github api
export const getBlogs = async () => {
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
  const blogs = await result.data.repository.discussions.edges;
  return blogs;
};
