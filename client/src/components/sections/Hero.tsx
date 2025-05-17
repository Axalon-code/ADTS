import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-inter font-bold text-4xl md:text-5xl mb-6 leading-tight">Expert IT Consultancy for Your Business</h1>
            <p className="text-xl mb-8">Specializing in Microsoft 365, Azure, and Enterprise Identity Management solutions tailored to your requirements.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={() => scrollToSection("services")} 
                variant="outline" 
                size="lg" 
                className="bg-white text-primary font-medium hover:bg-gray-100"
              >
                Explore Services
              </Button>
              <Button 
                onClick={() => scrollToSection("contact")} 
                size="lg" 
                className="bg-accent text-white font-medium hover:bg-blue-400"
              >
                Get in Touch
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
              alt="Modern IT infrastructure in an office environment" 
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
