export const discussionGrapQL = (discussionCategoryId: string | undefined) => {
  return `{
    repository(name: "Dev-Blog-Nextjs", owner: "HannahNguyen6729") {
      discussions(first: 10, categoryId: "${discussionCategoryId}") {
        nodes {
          title
          url
          number
          createdAt
          bodyHTML
          bodyText
          lastEditedAt
          author {
            login
            avatarUrl
            url
          }
          labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }`;
};

//single post
export const discussionDetailGgl = (postId: number | undefined) => {
  return `{
    repository(name: "Dev-Blog-Nextjs", owner: "HannahNguyen6729") {
      discussion( number: ${postId} ) { 
          title
          createdAt
          bodyHTML
          author {
            login
            avatarUrl
            url
          }
      }
    }
  }`;
};
