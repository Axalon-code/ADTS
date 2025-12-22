import { Button } from "@/components/ui/button";

export default function CallToAction() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-20 3xl:py-24 4xl:py-28 hero-gradient text-white">
      <div className="container-responsive text-center">
        <h2 className="font-inter font-bold text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl mb-6 3xl:mb-8">Ready to Optimize Your IT Infrastructure?</h2>
        <p className="text-xl 3xl:text-2xl 4xl:text-3xl mb-10 3xl:mb-12 max-w-3xl 3xl:max-w-4xl mx-auto">
          Contact me today to discuss how I can help tailor Microsoft solutions to meet your specific business requirements.
        </p>
        <Button 
          onClick={() => scrollToSection("contact")}
          variant="outline"
          size="lg"
          className="bg-white text-primary font-medium hover:bg-gray-100 transition-colors"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
}
