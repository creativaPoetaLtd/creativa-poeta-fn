import { authRequest, publicRequest } from "./client";

export type BlogLanguage = "fr" | "en" | "nl" | "kiny";
export type BlogStatus = "draft" | "published" | "archived";

export type SeoRebuildResult = {
  status: "queued" | "disabled" | "failed";
  message: string;
  providerStatus?: number;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  author?: { name?: string; email?: string };
  image?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  language?: BlogLanguage;
  translationKey?: string;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  status?: BlogStatus;
  publishedAt?: string;
  cta?: {
    label?: string;
    url?: string;
    type?: "service" | "affiliate" | "contact";
  };
  affiliateDisclosure?: boolean;
  generation?: {
    source: "manual" | "openai" | "template";
    batchId?: string;
    seed?: string;
    qualityScore?: number;
    qualityIssues?: string[];
    wordCount?: number;
    generatedAt?: string;
  };
  comments?: Array<{
    _id: string;
    name: string;
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt?: string;
};

export type RelatedBlogPost = Pick<
  BlogPost,
  | "_id"
  | "title"
  | "slug"
  | "excerpt"
  | "image"
  | "imageAlt"
  | "category"
  | "language"
  | "publishedAt"
  | "createdAt"
>;
export type BlogListResponse = {
  blogs: BlogPost[];
  categories: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export const CreateBlog = async (formData: FormData) =>
  authRequest<{ message: string; blog: BlogPost; seoRebuild?: SeoRebuildResult }>(
    {
      method: "POST",
      url: "/api/blogs",
      data: formData,
    },
    "Impossible de creer l'article."
  );

export const UpdateBlog = async (id: string, formData: FormData) =>
  authRequest<{ message: string; blog: BlogPost; seoRebuild?: SeoRebuildResult }>(
    {
      method: "PATCH",
      url: `/api/blogs/${id}`,
      data: formData,
    },
    "Impossible de modifier l'article."
  );

export const deleteBlog = async (id: string) =>
  authRequest<{ message: string; seoRebuild?: SeoRebuildResult }>(
    {
      method: "DELETE",
      url: `/api/blogs/${id}`,
    },
    "Impossible de supprimer l'article."
  );

export const rebuildBlogSeo = async () =>
  authRequest<{ seoRebuild: SeoRebuildResult }>(
    {
      method: "POST",
      url: "/api/blogs/admin/rebuild",
    },
    "Impossible de lancer la reconstruction SEO."
  );
export const fetchAdminBlogs = async () =>
  authRequest<{ blogs: BlogPost[] }>(
    {
      method: "GET",
      url: "/api/blogs/admin",
    },
    "Impossible de charger les articles."
  );

export type GenerateBlogBatchInput = {
  topic: string;
  keywords: string;
  audience: string;
  location: string;
  intent: "informational" | "commercial" | "comparison" | "local";
  language: BlogLanguage;
  category: string;
  count: number;
  ctaLabel: string;
  ctaUrl: string;
  ctaType: "service" | "affiliate" | "contact";
};

export const generateBlogBatch = async (data: GenerateBlogBatchInput) =>
  authRequest<{
    message: string;
    source: "openai" | "template";
    batchId: string;
    created: BlogPost[];
    skipped: Array<{ title: string; reason: string }>;
  }>(
    {
      method: "POST",
      url: "/api/blogs/admin/generate",
      data,
    },
    "Impossible de generer les brouillons."
  );
export const fetchBlogs = async (params?: {
  language?: BlogLanguage;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) =>
  publicRequest<BlogListResponse>(
    {
      method: "GET",
      url: "/api/blogs",
      params,
    },
    "Impossible de charger les articles."
  );

export const fetchSingleBlog = async (
  identifier: string,
  language?: BlogLanguage
) =>
  publicRequest<{
    blog: BlogPost;
    translations: Array<Pick<BlogPost, "title" | "slug" | "language">>;
    relatedArticles: RelatedBlogPost[];
  }>(
    {
      method: "GET",
      url: `/api/blogs/${encodeURIComponent(identifier)}`,
      params: { language },
    },
    "Article introuvable."
  );

export const addCommentToBlog = async (
  blogId: string,
  commentData: { name: string; email: string; text: string }
) =>
  publicRequest<{ message: string; totalComments: number }>(
    {
      method: "POST",
      url: `/api/blogs/${blogId}/comment`,
      data: commentData,
    },
    "Impossible d'ajouter le commentaire."
  );

export const getBlogComments = async (blogId: string) =>
  publicRequest<{
    comments: NonNullable<BlogPost["comments"]>;
    totalComments: number;
  }>(
    {
      method: "GET",
      url: `/api/blogs/${blogId}/comments`,
    },
    "Impossible de charger les commentaires."
  );