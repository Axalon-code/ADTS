import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Quote, Star } from "lucide-react";

export default function Clients() {
  return (
    <>
      <Helmet>
        <title>Clients & Case Studies | ADTS - IT Consultancy</title>
        <meta name="description" content="Discover how ADTS has helped businesses transform their IT infrastructure with Microsoft 365, Azure, and identity management solutions." />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Clients & Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses. See how we've helped organisations transform their IT infrastructure.
            </p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Client Testimonials</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              What our clients say about working with ADTS
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[250px] text-center">
                <Quote className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground italic">Testimonial coming soon</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-muted-foreground/30" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[250px] text-center">
                <Quote className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground italic">Testimonial coming soon</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-muted-foreground/30" />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[250px] text-center">
                <Quote className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground italic">Testimonial coming soon</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-muted-foreground/30" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Case Studies</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Detailed examples of successful IT transformations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-card border-dashed border-2 border-muted-foreground/30">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Building2 className="w-16 h-16 text-muted-foreground/40 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">Case Study Coming Soon</h3>
                  <p className="text-muted-foreground/70">
                    We're documenting our successful projects to share with you.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-dashed border-2 border-muted-foreground/30">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Building2 className="w-16 h-16 text-muted-foreground/40 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">Case Study Coming Soon</h3>
                  <p className="text-muted-foreground/70">
                    We're documenting our successful projects to share with you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Want to Be Featured?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            If you're a satisfied client and would like to share your experience, we'd love to hear from you.
          </p>
          <a 
            href="mailto:AD@adtechservices.co.uk?subject=Client Testimonial" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            data-testid="link-contact-testimonial"
          >
            Share Your Story
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
