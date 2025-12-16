import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ADTS - IT Consultancy</title>
        <meta name="description" content="ADTS Privacy Policy - Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-foreground/90 mb-4">
              ADTS ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our IT consultancy services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-foreground/90 mb-4">We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-6 text-foreground/90 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and company name when you submit our contact form or book a consultation.</li>
              <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
              <li><strong>Booking Information:</strong> Details about your consultation requests, including service preferences and scheduling information.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="text-foreground/90 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-foreground/90 space-y-2">
              <li>Provide and maintain our IT consultancy services</li>
              <li>Respond to your enquiries and schedule consultations</li>
              <li>Send you service-related communications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
            <p className="text-foreground/90 mb-4">
              We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
            <p className="text-foreground/90 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 text-foreground/90 space-y-2">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
            <p className="text-foreground/90 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-foreground/90">
              Email: <a href="mailto:AD@adtechservices.co.uk" className="text-primary hover:underline">AD@adtechservices.co.uk</a><br />
              Phone: +44 (0)7492 168197
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
