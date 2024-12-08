export const getBlogs = async () => {
  const res = await fetch(`http://localhost:1337/api/blog`, {
    next: { revalidate: 600 },
  });
  const data = await res.json();
  return data.blogs;
};

export const getBlogSlug = async (slug: string) => {
  const res = await fetch(`http://localhost:1337/api/blog/${slug}`, {
    next: { revalidate: 600 },
  });
  const data = await res.json();
  return data.blog;
};
