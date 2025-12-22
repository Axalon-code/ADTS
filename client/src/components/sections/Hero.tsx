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
      <div className="container-responsive py-12 sm:py-16 md:py-20 3xl:py-28 4xl:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 3xl:gap-16 4xl:gap-20 items-center">
          <div>
            <h1 className="font-inter font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl 4xl:text-7xl mb-4 sm:mb-6 3xl:mb-8 leading-tight">Expert IT Consultancy for Your Business</h1>
            <p className="text-base sm:text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl mb-6 sm:mb-8 3xl:mb-10">Specializing in Microsoft 365, Azure, and Enterprise Identity Management solutions tailored to your requirements.</p>
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
              className="rounded-xl shadow-lg 3xl:rounded-2xl 4xl:rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
