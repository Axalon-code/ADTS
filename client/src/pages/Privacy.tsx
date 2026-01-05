import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ADTS - IT Consultancy</title>
        <meta name="description" content="ADTS Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with UK GDPR." />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-white/90 prose-li:text-white/90 prose-strong:text-white prose-a:text-primary">
          <p className="text-white/70 mb-6">Last updated: January 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p className="text-white/90 mb-4">
              ADTS ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our IT consultancy services, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
            <p className="text-white/90 mb-4">
              By using our website or services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Data Controller</h2>
            <p className="text-white/90 mb-4">
              ADTS is the data controller responsible for your personal data. If you have any questions about this Privacy Policy or our data practices, please contact us using the details provided at the end of this policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Information We Collect</h2>
            <p className="text-white/90 mb-4">We may collect and process the following categories of personal data:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-white">3.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 text-white/90 space-y-2 mb-4">
              <li><strong>Identity Data:</strong> Full name, job title, and company name</li>
              <li><strong>Contact Data:</strong> Email address, telephone number, and business address</li>
              <li><strong>Booking Data:</strong> Consultation requests, service preferences, scheduling information, and meeting notes</li>
              <li><strong>Communication Data:</strong> Content of emails, contact form submissions, and other correspondence</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 text-white">3.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-white/90 space-y-2 mb-4">
              <li><strong>Technical Data:</strong> IP address, browser type and version, device type, operating system, and time zone settings</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent on pages, and navigation patterns</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Lawful Basis for Processing</h2>
            <p className="text-white/90 mb-4">Under UK GDPR, we must have a lawful basis for processing your personal data. We rely on the following legal bases:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li><strong>Contract:</strong> Processing necessary for the performance of a contract with you or to take steps at your request before entering into a contract (e.g., providing IT consultancy services)</li>
              <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, such as improving our services, marketing, and fraud prevention, where these interests do not override your fundamental rights</li>
              <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal or regulatory obligations</li>
              <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities, such as receiving marketing communications</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. How We Use Your Information</h2>
            <p className="text-white/90 mb-4">We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>To provide, maintain, and deliver our IT consultancy services</li>
              <li>To respond to your enquiries and process consultation requests</li>
              <li>To schedule and manage appointments and bookings</li>
              <li>To send you service-related communications, updates, and administrative messages</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To comply with legal obligations and protect our legal rights</li>
              <li>To detect, prevent, and address technical issues or security threats</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Retention</h2>
            <p className="text-white/90 mb-4">
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
            </p>
            <p className="text-white/90 mb-4">
              The retention period depends on the context and purpose of processing:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li><strong>Client records:</strong> Retained for 6 years after the end of the business relationship for legal and tax purposes</li>
              <li><strong>Contact form submissions:</strong> Retained for 2 years unless a business relationship is established</li>
              <li><strong>Website analytics data:</strong> Retained for 26 months</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Data Sharing and Disclosure</h2>
            <p className="text-white/90 mb-4">We do not sell, trade, or rent your personal data to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business (e.g., hosting providers, email services), subject to appropriate data protection agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our clients or others</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">8. International Transfers</h2>
            <p className="text-white/90 mb-4">
              Your personal data may be transferred to and processed in countries outside the United Kingdom. When we transfer data internationally, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Transfers to countries with an adequacy decision from the UK Government</li>
              <li>Use of Standard Contractual Clauses approved by the UK Information Commissioner's Office (ICO)</li>
              <li>Other legally approved transfer mechanisms</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Data Security</h2>
            <p className="text-white/90 mb-4">
              We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Encryption of data in transit using SSL/TLS protocols</li>
              <li>Secure access controls and authentication mechanisms</li>
              <li>Regular security assessments and updates</li>
              <li>Staff training on data protection and security practices</li>
            </ul>
            <p className="text-white/90 mt-4">
              While we strive to protect your personal data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest practical standards.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Your Rights Under UK GDPR</h2>
            <p className="text-white/90 mb-4">Under UK GDPR, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li><strong>Right of Access:</strong> You have the right to request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> You have the right to request correction of inaccurate or incomplete personal data</li>
              <li><strong>Right to Erasure:</strong> You have the right to request deletion of your personal data in certain circumstances (also known as the "right to be forgotten")</li>
              <li><strong>Right to Restrict Processing:</strong> You have the right to request that we limit the processing of your personal data in certain circumstances</li>
              <li><strong>Right to Data Portability:</strong> You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit it to another controller</li>
              <li><strong>Right to Object:</strong> You have the right to object to processing based on legitimate interests or for direct marketing purposes</li>
              <li><strong>Rights Related to Automated Decision-Making:</strong> You have the right not to be subject to decisions based solely on automated processing, including profiling, that produce legal or similarly significant effects</li>
              <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you have the right to withdraw that consent at any time</li>
            </ul>
            <p className="text-white/90 mt-4">
              To exercise any of these rights, please contact us using the details provided below. We will respond to your request within one month of receipt. If your request is complex or we receive multiple requests, we may extend this period by a further two months, but we will inform you of any extension within the first month.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Cookies</h2>
            <p className="text-white/90 mb-4">
              Our website uses essential cookies to ensure proper functionality. We do not use tracking or advertising cookies. For more information about cookies, please refer to your browser's help documentation.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Changes to This Privacy Policy</h2>
            <p className="text-white/90 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post any updates on this page with a revised "Last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">13. Complaints</h2>
            <p className="text-white/90 mb-4">
              If you are not satisfied with how we handle your personal data or have concerns about our data protection practices, you have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority for data protection:
            </p>
            <p className="text-white/90 mb-4">
              Information Commissioner's Office<br />
              Wycliffe House, Water Lane<br />
              Wilmslow, Cheshire SK9 5AF<br />
              Telephone: 0303 123 1113<br />
              Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">14. Contact Us</h2>
            <p className="text-white/90 mb-4">
              If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have concerns about our data practices, please contact us at:
            </p>
            <p className="text-white/90">
              <strong>ADTS</strong><br />
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
