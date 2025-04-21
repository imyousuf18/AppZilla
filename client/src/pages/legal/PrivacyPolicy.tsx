import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FaArrowLeft, FaPrint, FaFilePdf, FaShieldAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  const lastUpdated = "April 1, 2025";

  const printPage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-primary-900 text-primary-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="flex items-center">
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={printPage}>
              <FaPrint className="mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert("PDF downloaded")}>
              <FaFilePdf className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="bg-primary-800 border border-primary-700 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-2xl text-purple-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-primary-100/70">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p>
              At Appzila, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share your information when you use our website, products, and services.
            </p>
            
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>

            <h2>1. Information Collection and Use</h2>
            
            <p>
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
            </p>
            
            <ul>
              <li>Your name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address and location information</li>
              <li>Company information</li>
            </ul>
            
            <p>
              We collect this information for the purpose of providing the Service, identifying and communicating with you, responding to your requests/inquiries, and improving our services.
            </p>

            <h2>2. Log Data</h2>
            
            <p>
              We collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>

            <h2>3. Cookies</h2>
            
            <p>
              Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
            </p>
            
            <p>
              We use "cookies" to collect information and improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
            </p>
            
            <p>
              Types of cookies we use:
            </p>
            
            <ul>
              <li>Essential cookies: necessary for the basic function of the website.</li>
              <li>Functionality cookies: recognize you when you return to our website.</li>
              <li>Analytical/performance cookies: allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
              <li>Targeting cookies: record your visit to our website, the pages you have visited, and the links you have followed.</li>
            </ul>

            <h2>4. Service Providers</h2>
            
            <p>
              We may employ third-party companies and individuals due to the following reasons:
            </p>
            
            <ul>
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>
            
            <p>
              These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2>5. Security</h2>
            
            <p>
              The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            
            <p>
              We implement a variety of security measures to maintain the safety of your personal information, including:
            </p>
            
            <ul>
              <li>Secure SSL encryption for all data transmission</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication procedures</li>
              <li>Data minimization practices</li>
            </ul>

            <h2>6. International Transfer</h2>
            
            <p>
              Your information, including Personal Information, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
            </p>
            
            <p>
              If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including Personal Information, to the United States and process it there.
            </p>
            
            <p>
              Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </p>

            <h2>7. Your Data Protection Rights</h2>
            
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            
            <ul>
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>

            <h2>8. Changes to This Privacy Policy</h2>
            
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
            </p>
            
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2>9. Contact Us</h2>
            
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            
            <p>
              Appzila Inc.<br />
              1234 Technology Drive<br />
              San Francisco, CA 94107<br />
              Email: privacy@appzila.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-primary-100/60 mb-4">Have questions about your privacy?</p>
          <Link href="/contact">
            <Button className="bg-purple-600 hover:bg-purple-500">
              Contact Our Privacy Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;