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
        <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-white/70 mb-6">Last updated: January 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Agreement to Terms</h2>
            <p className="text-white/90 mb-4">
              By accessing our website or using our IT consultancy services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, please do not use our services.
            </p>
            <p className="text-white/90 mb-4">
              These Terms of Service constitute a legally binding agreement between you and ADTS. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting on this website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Definitions</h2>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li><strong>"ADTS", "we", "us", or "our"</strong> refers to ADTS IT Consultancy</li>
              <li><strong>"Client", "you", or "your"</strong> refers to the individual or organisation using our services</li>
              <li><strong>"Services"</strong> refers to all IT consultancy services provided by ADTS</li>
              <li><strong>"Website"</strong> refers to the ADTS website and all associated pages</li>
              <li><strong>"Agreement"</strong> refers to these Terms of Service and any separate service agreements</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Services</h2>
            <p className="text-white/90 mb-4">
              ADTS provides professional IT consultancy services specialising in Microsoft technologies, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Microsoft Azure cloud consulting, implementation, and optimisation</li>
              <li>Microsoft Entra ID (formerly Azure AD) identity and access management</li>
              <li>Microsoft 365 administration, configuration, and optimisation</li>
              <li>Microsoft Exchange Online and on-premises configuration</li>
              <li>Microsoft Intune device management and compliance</li>
              <li>SharePoint Online and OneDrive implementation</li>
              <li>Licensing consultation and optimisation</li>
              <li>Robotic Process Automation (RPA) development</li>
              <li>General IT support and troubleshooting</li>
            </ul>
            <p className="text-white/90 mt-4">
              The specific scope of services will be agreed upon in writing before work commences. Any changes to the agreed scope may result in additional charges.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Engagement and Consultations</h2>
            <p className="text-white/90 mb-4">
              When engaging our services or booking a consultation:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>You agree to provide accurate and complete contact and business information</li>
              <li>Consultations are subject to availability and confirmation</li>
              <li>You must have the authority to engage our services on behalf of your organisation</li>
              <li>You are responsible for providing necessary access, credentials, and information required to deliver the services</li>
              <li>You must ensure that any access provided complies with your organisation's policies and applicable laws</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Cancellation and Rescheduling</h2>
            <p className="text-white/90 mb-4">
              The following cancellation and rescheduling policies apply:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Cancellations must be made at least 24 hours in advance of the scheduled consultation</li>
              <li>Cancellations made with less than 24 hours notice may be subject to a cancellation fee</li>
              <li>Rescheduling requests are subject to availability</li>
              <li>Repeated no-shows or late cancellations may result in advance payment requirements for future bookings</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Payment Terms</h2>
            <p className="text-white/90 mb-4">
              The following payment terms apply to all services:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Fees for services will be agreed upon in writing before work commences</li>
              <li>All prices are quoted in British Pounds Sterling (GBP)</li>
              <li>Prices are exclusive of VAT unless otherwise stated</li>
              <li>Invoices are payable within 14 days of the invoice date unless otherwise agreed</li>
              <li>Late payments may incur interest at the statutory rate</li>
              <li>We reserve the right to suspend services if payments are overdue</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Client Responsibilities</h2>
            <p className="text-white/90 mb-4">
              As a client, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Providing timely and accurate information necessary for the delivery of services</li>
              <li>Ensuring appropriate backups are in place before any work is undertaken</li>
              <li>Obtaining necessary permissions and licences for any software or systems we work on</li>
              <li>Reviewing and approving work within reasonable timeframes</li>
              <li>Communicating any concerns or issues promptly</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Intellectual Property</h2>
            <p className="text-white/90 mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property of ADTS and protected by intellectual property laws. You may not reproduce, distribute, modify, or use any content without our express written permission.
            </p>
            <p className="text-white/90 mb-4">
              Any deliverables created specifically for you as part of our services will be owned by you upon full payment, unless otherwise agreed in writing. We retain the right to use general knowledge, skills, and experience gained during the engagement.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Confidentiality</h2>
            <p className="text-white/90 mb-4">
              We treat all client information as confidential and will:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Not disclose your confidential information to third parties without your consent</li>
              <li>Use appropriate security measures to protect your information</li>
              <li>Only use your information for the purposes of providing our services</li>
              <li>Return or destroy confidential information upon request or termination of services</li>
            </ul>
            <p className="text-white/90 mt-4">
              This confidentiality obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Warranties and Disclaimers</h2>
            <p className="text-white/90 mb-4">
              We warrant that our services will be provided with reasonable skill and care in accordance with industry standards. However:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>We do not guarantee that our services will be uninterrupted or error-free</li>
              <li>We do not warrant compatibility with all third-party systems or software</li>
              <li>Information provided on this website is for general purposes and may not be suitable for your specific circumstances</li>
              <li>We are not responsible for any third-party products, services, or licensing</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Limitation of Liability</h2>
            <p className="text-white/90 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>ADTS shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
              <li>ADTS shall not be liable for loss of profits, data, business, or goodwill</li>
              <li>Our total liability for any claim shall not exceed the total fees paid for the specific services giving rise to the claim</li>
              <li>These limitations apply regardless of the theory of liability (contract, tort, or otherwise)</li>
            </ul>
            <p className="text-white/90 mt-4">
              Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Indemnification</h2>
            <p className="text-white/90 mb-4">
              You agree to indemnify and hold ADTS harmless from any claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Your breach of these Terms of Service</li>
              <li>Your violation of any applicable laws or regulations</li>
              <li>Any third-party claims related to your use of our services</li>
              <li>Any inaccurate or incomplete information you provide</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">13. Termination</h2>
            <p className="text-white/90 mb-4">
              Either party may terminate the engagement:
            </p>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Upon written notice if the other party breaches these terms and fails to remedy the breach within 14 days</li>
              <li>Immediately if the other party becomes insolvent or enters administration</li>
              <li>By mutual written agreement</li>
            </ul>
            <p className="text-white/90 mt-4">
              Upon termination, you must pay for all services provided up to the termination date. Provisions regarding confidentiality, intellectual property, and limitation of liability shall survive termination.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">14. Force Majeure</h2>
            <p className="text-white/90 mb-4">
              Neither party shall be liable for any failure or delay in performing their obligations due to circumstances beyond their reasonable control, including but not limited to natural disasters, war, terrorism, strikes, government actions, power failures, or internet outages.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">15. Governing Law and Jurisdiction</h2>
            <p className="text-white/90 mb-4">
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">16. Severability</h2>
            <p className="text-white/90 mb-4">
              If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">17. Entire Agreement</h2>
            <p className="text-white/90 mb-4">
              These Terms of Service, together with any separate service agreements, constitute the entire agreement between you and ADTS regarding the subject matter hereof and supersede all prior agreements, understandings, and communications.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">18. Contact Us</h2>
            <p className="text-white/90 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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
