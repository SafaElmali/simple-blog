import slugify from "slugify";

export const buildSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
};
