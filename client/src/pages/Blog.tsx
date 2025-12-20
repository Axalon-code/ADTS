import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Define the blog post type based on our schema
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  author: string;
  imageUrl?: string;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch all blog posts
  const { data: allPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // Filter posts by category if a category is selected
  const filteredPosts = selectedCategory
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;
  
  // Get unique categories from all posts
  const categories = [...new Set(allPosts.map(post => post.category))];

  return (
    <>
      <Helmet>
        <title>IT Resources & Tips | ADTS</title>
        <meta name="description" content="Explore our collection of IT resources, tips, and best practices for Microsoft 365, Azure, and Entra IAM to optimize your IT infrastructure." />
      </Helmet>
      
      <Header />
      
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-inter font-bold text-3xl md:text-4xl mb-4">IT Resources & Tips</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the latest IT resources, tips, and best practices for Microsoft technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with categories */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-xl mb-4">Categories</h2>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Topics
                    </Button>
                    
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Blog posts grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                // Loading skeleton
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-0">
                        <div className="h-48 bg-muted rounded-t-lg"></div>
                        <div className="p-6">
                          <Skeleton className="h-6 w-2/3 mb-2" />
                          <Skeleton className="h-4 w-1/3 mb-4" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-4" />
                          <div className="flex justify-between items-center">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedCategory
                      ? `No posts available in the "${selectedCategory}" category.`
                      : "No blog posts available yet."}
                  </p>
                  {selectedCategory && (
                    <Button onClick={() => setSelectedCategory(null)}>
                      View all posts
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
    : '';
    
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {post.imageUrl && (
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.imageUrl})` }}></div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
          </div>
          
          <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <Link href={`/blog/${post.slug}`}>
              <Button className="text-[hsl(var(--service-link-color))] bg-transparent hover:text-[hsl(var(--service-link-hover))] transition-colors px-0">
                Read More <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex space-x-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{post.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}