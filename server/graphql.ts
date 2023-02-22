export const discussionGrapQL = (discussionCategoryId: string | undefined) => {
  return ` {
        repository(name: "Dev-Blog-Nextjs", owner: "HannahNguyen6729") {
          id
          discussions(first: 3, categoryId: "${discussionCategoryId}") {
            edges {
              node {
                id
                title
                url
                bodyHTML
                bodyText
                createdAt
                lastEditedAt
                author {
                  login
                  avatarUrl
                  url
                }
                labels(first: 10) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }`;
};
