import React, { useState, useEffect } from "react";
import * as fs from 'fs';
import { useRouter } from "next/router";

// setp 1: Find the file corresponding to the slug
// setp 2: Populate them inside the page.
const Slug = (props) => {
  // console.log();
  const [blog, setblog] = useState(props.myBlog);
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <>
      <div className="section flex flex-col items-center md:w-5/6">
        <h1 className="text-3xl font-semibold mb-5">{blog && blog.title}</h1>
        {/* <p>{blog && blog.content}</p> */}
        {blog && <p dangerouslySetInnerHTML={createMarkup(blog.content)}></p>}
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'Learn-JavaScript-in-Easy-and-efficient-way' } },
      { params: { slug: 'Learn-MongoDB-in-Easy-and-efficient-way' } },
      { params: { slug: 'Learn-NextJS-in-Easy-and-efficient-way' } },
      { params: { slug: 'Learn-NodeJS-in-Easy-and-efficient-way' } },
      { params: { slug: 'Learn-ReactJS-in-Easy-and-efficient-way' } },
      { params: { slug: 'Learn-Tailwind-in-Easy-and-efficient-way' } },
    ],
    fallback: true // false or 'blocking'
  };
}


export async function getStaticProps(context) {
  const { slug } = context.params;//context.params ==> providing slug parameter
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
  return {
    props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
  }
}


export default Slug;
