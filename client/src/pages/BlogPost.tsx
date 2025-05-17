import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPost() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-6 w-24 mr-4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto text-center p-8">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button>Return to Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format date for display
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
    : '';

  return (
    <>
      <Helmet>
        <title>{post.title} | ADTS IT Resources</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Navigation back to blog */}
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" className="px-0">
                  <i className="fas fa-arrow-left mr-2"></i> Back to Resources
                </Button>
              </Link>
            </div>
            
            {/* Post header */}
            <header className="mb-8">
              <h1 className="font-inter font-bold text-3xl md:text-4xl mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6">
                <span className="mr-4">By {post.author}</span>
                <span className="mr-4">{formattedDate}</span>
                <Badge className="mr-2">{post.category}</Badge>
              </div>
              
              {post.imageUrl && (
                <div 
                  className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg mb-8" 
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
              )}
              
              <p className="text-lg font-medium text-muted-foreground">{post.excerpt}</p>
            </header>
            
            {/* Post content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
              {/* Render formatted content - in a real app, you might use a markdown renderer */}
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="border-t pt-6 mt-10">
                <h3 className="text-sm font-medium mb-4">Related Topics:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to action */}
            <div className="bg-muted p-6 rounded-lg mt-10">
              <h3 className="font-semibold text-xl mb-2">Need help with {post.category}?</h3>
              <p className="mb-4">
                Contact me for personalized assistance with your {post.category.toLowerCase()} needs and IT requirements.
              </p>
              <Link href="/#contact">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}