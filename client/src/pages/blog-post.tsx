import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <Card>
          {blogPost.coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={blogPost.coverImage}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <CardContent className="p-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time>
                {blogPost.publishedAt
                  ? new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Draft'}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                {blogPost.excerpt}
              </p>
              <div className="whitespace-pre-wrap">{blogPost.content}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
