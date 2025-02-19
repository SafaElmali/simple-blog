import { z } from "zod";

const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must be less than 100 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters"),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Cover image URL is required"),
  tags: z
    .array(z.string().min(2, "Each tag must be at least 2 characters"))
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
  status: z.enum(["draft", "published"], {
    required_error: "Status is required",
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export { postFormSchema, type PostFormValues };
