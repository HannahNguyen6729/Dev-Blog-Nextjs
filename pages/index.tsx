import BlogPreview from "@/components/BlogPreview";
import {getBlogs} from "@/server/blog";
import {BlogPost} from "@/types/blog";
import {Inter} from "@next/font/google";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {useMemo, useState} from "react";

const inter = Inter({subsets: ["latin"]});

const Home: NextPage = ({
  blogData,
  tagList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);

  const handleClickTag = (tag: string, idx: number) => {
    //find all tags checked
    if (checkedTags.includes(tag)) {
      checkedTags.filter((checkedTag) => checkedTag !== tag);
      setCheckedTags(checkedTags.filter((checkedTag) => checkedTag !== tag));
    } else {
      setCheckedTags([...checkedTags, tag]);
    }
  };

  const filteredBlogData: BlogPost[] = useMemo(() => {
    return checkedTags.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return checkedTags.every((checkedTag) =>
            blog.tags.includes(checkedTag)
          );
        })
      : blogData;
  }, [blogData, checkedTags]);

  return (
    <>
      <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-300 font-poppins">
        <title>Home page</title>
        <section>
          <div className="mt-3 text-center">
            <h1 className="text-[3rem]">Welcome to Dev Blog</h1>
            <p>
              A fullstack blog made with Nextjs, TailwindCss, Github GraphQL
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center text-[1.5rem] mt-12">
          <div className="flex gap-3 mb-12">
            {tagList.map((tag: string, idx: number) => (
              <button
                onClick={() => handleClickTag(tag, idx)}
                key={idx}
                //logic of changing the color of the tag
                className={`${
                  checkedTags.includes(tag) ? "selectedLabel" : "label"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {filteredBlogData.map((blog: BlogPost) => (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getBlogs();
  //console.log("blogs", blogs);
  let tagList: string[] = [];
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      if (!tagList.includes(tag)) {
        tagList.push(tag);
      }
    });
  });
  // console.log("Tag list", tagList);
  return {
    props: {
      blogData: blogs,
      tagList,
    },
  };
};

//GIthub GraphQL
// get login viewer, avatarUrl
//get discussion id of blog discussion

// {
//   viewer {
//     login
//     avatarUrl
//   }
//   repository(name: "Dev-Blog-Nextjs", owner:"HannahNguyen6729") {
//     discussionCategories(first: 10) {
//             nodes {
//               id
//               name
//       }
//     }
//   }
// }
// data returned from Github GraphQL
// {
//   "data": {
//     "viewer": {
//       "login": "HannahNguyen6729",
//       "avatarUrl": "https://avatars.githubusercontent.com/u/81440768?u=0649d6d35311519e4131037cdd9098d22c0a856d&v=4"
//     },
//     "repository": {
//       "discussionCategories": {
//         "nodes": [
//           {
//             "id": "DIC_kwDOJAvoOM4CUXH9",
//             "name": "Announcements"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXKC",
//             "name": "Blog"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXH-",
//             "name": "General"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXIA",
//             "name": "Ideas"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXIC",
//             "name": "Polls"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXH_",
//             "name": "Q&A"
//           },
//           {
//             "id": "DIC_kwDOJAvoOM4CUXIB",
//             "name": "Show and tell"
//           }
//         ]
//       }
//     }
//   }

//QUERY TO GET DISCUSSION DETAILS
// query MyQuery {
//   repository(name: "Dev-Blog-Nextjs", owner: "HannahNguyen6729") {
//     id
//     discussions(first: 3, categoryId: "DIC_kwDOJAvoOM4CUXKC") {
//       edges {
//         node {
//           id
//           title
//           url
//           bodyHTML
//           bodyText
//           createdAt
//           lastEditedAt
//           author {
//             login
//             avatarUrl
//             url
//           }
//           labels(first: 10) {
//             nodes {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// }

//DATA RETURNED FROM DISCUSSIONS
// {
//   "data": {
//     "repository": {
//       "id": "R_kgDOJAvoOA",
//       "discussions": {
//         "edges": [
//           {
//             "node": {
//               "id": "D_kwDOJAvoOM4ASoOC",
//               "title": "Dev Portfolio Project Part 3 - About",
//               "url": "https://github.com/HannahNguyen6729/Dev-Blog-Nextjs/discussions/3",
//               "bodyHTML": "<div class=\"snippet-clipboard-content notranslate position-relative overflow-auto\" data-snippet-clipboard-copy-content=\"
//................................................................................................................................
//               "url": "https://github.com/HannahNguyen6729"
//             },
//             "labels": {
//               "nodes": [
//                 {
//                   "name": "start"
//                 },
//                 {
//                   "name": "2023"
//                 },
//                 {
//                   "name": "project"
//                 }
//               ]
//             }
//           }
//         }
//       ]
//     }
