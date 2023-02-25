export interface BlogPost {
  id?: number;
  url?: string;
  discussionUrl?: string;
  title: string;
  html?: string;
  bodyText: string;
  tags: string[];
  createdAt: string;
  lastEdited?: string | null;
  author: {name: string; url: string; avatar: string};
}
