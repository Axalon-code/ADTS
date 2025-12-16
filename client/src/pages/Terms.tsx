import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | ADTS - IT Consultancy</title>
        <meta name="description" content="ADTS Terms of Service - Read our terms and conditions for using our IT consultancy services." />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="text-foreground/90 mb-4">
              By accessing our website or using our IT consultancy services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Services</h2>
            <p className="text-foreground/90 mb-4">
              ADTS provides IT consultancy services specialising in Microsoft technologies, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-foreground/90 space-y-2">
              <li>Microsoft Azure consulting and implementation</li>
              <li>Microsoft Entra (Azure AD) identity and access management</li>
              <li>Microsoft 365 administration and optimisation</li>
              <li>Microsoft Exchange configuration</li>
              <li>Licensing consultation</li>
              <li>Rewst RPA automation</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Booking and Consultations</h2>
            <p className="text-foreground/90 mb-4">
              When booking a consultation through our website:
            </p>
            <ul className="list-disc pl-6 text-foreground/90 space-y-2">
              <li>You agree to provide accurate contact information</li>
              <li>Consultations are subject to availability</li>
              <li>Cancellations should be made at least 24 hours in advance</li>
              <li>Hourly rates are as displayed at the time of booking</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment Terms</h2>
            <p className="text-foreground/90 mb-4">
              Services are billed at the hourly rate specified at the time of booking. Payment terms will be agreed upon prior to commencing work. All prices are in GBP and exclusive of VAT where applicable.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
            <p className="text-foreground/90 mb-4">
              All content on this website, including text, graphics, logos, and software, is the property of ADTS and protected by intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
            <p className="text-foreground/90 mb-4">
              ADTS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Confidentiality</h2>
            <p className="text-foreground/90 mb-4">
              We treat all client information as confidential. We will not disclose your business information to third parties without your consent, except as required by law.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Governing Law</h2>
            <p className="text-foreground/90 mb-4">
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact Us</h2>
            <p className="text-foreground/90 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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
