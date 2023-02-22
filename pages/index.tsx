import {getBlogs} from "@/server/blog";
import {Inter} from "@next/font/google";
import {GetServerSideProps} from "next";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
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
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getBlogs();
  console.log("blogs", blogs);
  return {
    props: {},
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
