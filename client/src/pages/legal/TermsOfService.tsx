import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FaArrowLeft, FaPrint, FaFilePdf } from "react-icons/fa";

const TermsOfService = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-primary-100/70">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Appzila website (the "Service") operated by Appzila Inc. ("us", "we", or "our").
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2>1. Use of Service</h2>
            
            <p>
              The Appzila platform provides app development, web development, and related digital services. You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from:
            </p>
            
            <ul>
              <li>Using the service in any way that violates applicable laws or regulations</li>
              <li>Attempting to interfere with or disrupt the service or servers</li>
              <li>Impersonating another person or entity</li>
              <li>Engaging in any activity that could harm our infrastructure or other users</li>
            </ul>

            <h2>2. Intellectual Property</h2>
            
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Appzila Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Appzila Inc.
            </p>

            <h2>3. User Accounts</h2>
            
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2>4. Payment Terms</h2>
            
            <p>
              For any paid services, you agree to pay all fees associated with your use of the Service. Fees are non-refundable except as required by law or as explicitly stated in our refund policy.
            </p>
            
            <p>
              We reserve the right to change our prices at any time. We will provide you with reasonable notice of any such changes by posting the new prices on our website or by sending you an email.
            </p>

            <h2>5. Limitation of Liability</h2>
            
            <p>
              In no event shall Appzila Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <ul>
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>

            <h2>6. Termination</h2>
            
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us for account deletion.
            </p>

            <h2>7. Changes to Terms</h2>
            
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>

            <h2>8. Governing Law</h2>
            
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>

            <h2>9. Contact Us</h2>
            
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <p>
              Appzila Inc.<br />
              1234 Technology Drive<br />
              San Francisco, CA 94107<br />
              Email: legal@appzila.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-primary-100/60 mb-4">Need clarification on our terms?</p>
          <Link href="/contact">
            <Button className="bg-purple-600 hover:bg-purple-500">
              Contact Our Legal Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;