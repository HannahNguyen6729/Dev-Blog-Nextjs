import {BlogPost} from "@/types/blog";
import React from "react";
import BlogHeader from "./BlogHeader";

const BlogPreview: React.FC<BlogPost> = (props): JSX.Element => {
  const {title, bodyText, author, createdAt, tags} = props;
  const previewText = bodyText.substring(0, 150) + "...";
  return (
    <section>
      <BlogHeader author={author} createdAt={createdAt} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, idx) => (
          <p
            key={idx}
            className="bg-sky-600 px-2 mt-2 font-semi rounded-xl text-zinc-800"
          >
            {tag}
          </p>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
