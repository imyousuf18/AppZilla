import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GDPR = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">GDPR Compliance</CardTitle>
          <CardDescription>Last Updated: April 5, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              At Appzila, we are committed to protecting the privacy and rights of our users and clients. 
              This GDPR Compliance Statement explains how we comply with the General Data Protection 
              Regulation (GDPR), which is applicable to EU residents.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. Who We Are</h2>
            <p>
              Appzila is a premium app development company that provides custom software solutions for 
              businesses and individuals. We are both a data controller and a data processor under the GDPR:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>As a data controller, we determine why and how your personal data is processed when you visit our website or use our services.</li>
              <li>As a data processor, we process personal data on behalf of our clients according to their instructions.</li>
            </ul>
            <p className="mt-2">
              Our contact information:
            </p>
            <div className="mt-2">
              <p><strong>Address:</strong> 123 Tech Boulevard, Suite 500, San Francisco, CA 94105, USA</p>
              <p><strong>Data Protection Officer:</strong> dpo@appzila.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Your Rights Under GDPR</h2>
            <p>
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.1 Right to Access</h3>
            <p>
              You have the right to request a copy of your personal data that we hold.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.2 Right to Rectification</h3>
            <p>
              You have the right to request that we correct any inaccurate or incomplete personal data.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.3 Right to Erasure (Right to be Forgotten)</h3>
            <p>
              You have the right to request the deletion of your personal data in certain circumstances.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.4 Right to Restriction of Processing</h3>
            <p>
              You have the right to request that we restrict the processing of your personal data in certain circumstances.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.5 Right to Data Portability</h3>
            <p>
              You have the right to receive your personal data in a structured, commonly used, 
              and machine-readable format.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.6 Right to Object</h3>
            <p>
              You have the right to object to the processing of your personal data in certain circumstances.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.7 Right to Not be Subject to Automated Decision-Making</h3>
            <p>
              You have the right not to be subject to a decision based solely on automated processing, 
              including profiling, which produces legal effects concerning you or significantly affects you.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. How We Process Your Data</h2>
            
            <h3 className="text-lg font-medium mt-4">4.1 Data Collection</h3>
            <p>
              We collect personal data directly from you when you:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Visit our website or use our services</li>
              <li>Create an account or profile</li>
              <li>Contact us for inquiries or support</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Apply for a job with us</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">4.2 Types of Data We Process</h3>
            <p>
              Depending on your interaction with us, we may process the following types of personal data:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Identification and contact information (name, email, phone number, address)</li>
              <li>Account and profile data</li>
              <li>Communication and correspondence data</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Usage data (how you use our website and services)</li>
              <li>Marketing and communication preferences</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">4.3 Legal Basis for Processing</h3>
            <p>
              We process your personal data on the following legal bases:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Contract:</strong> Processing is necessary for the performance of a contract with you</li>
              <li><strong>Consent:</strong> You have given consent for specific purposes</li>
              <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests</li>
              <li><strong>Legal Obligation:</strong> Processing is necessary to comply with legal obligations</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">4.4 Data Retention</h3>
            <p>
              We retain your personal data only for as long as necessary for the purposes for which 
              it was collected, including to satisfy legal, accounting, or reporting requirements.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to ensure the security 
              of your personal data, including:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Encryption of personal data</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication procedures</li>
              <li>Data backup and recovery procedures</li>
              <li>Staff training on data protection</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. International Data Transfers</h2>
            <p>
              As a global company, we may transfer your personal data to countries outside the European 
              Economic Area (EEA). When we do, we ensure that appropriate safeguards are in place to 
              protect your data, such as:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Binding Corporate Rules</li>
              <li>Adequacy decisions by the European Commission</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">7. Data Breach Notification</h2>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your rights 
              and freedoms, we will notify the relevant supervisory authority without undue delay and, 
              where feasible, within 72 hours of becoming aware of the breach. If the breach is likely 
              to result in a high risk to your rights and freedoms, we will also notify you directly.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">8. Data Protection Impact Assessment</h2>
            <p>
              We conduct Data Protection Impact Assessments (DPIAs) for any high-risk processing 
              activities to identify and minimize data protection risks.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">9. Exercising Your Rights</h2>
            <p>
              To exercise any of your rights under the GDPR, please contact our Data Protection Officer at dpo@appzila.com. 
              We will respond to your request within one month. This period may be extended by two further 
              months where necessary, taking into account the complexity and number of requests.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">10. Complaints</h2>
            <p>
              If you are not satisfied with our response or believe that we are not processing your 
              personal data in accordance with the law, you have the right to lodge a complaint with 
              a supervisory authority in the EU member state of your habitual residence, place of work, 
              or place of the alleged infringement.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">11. Changes to This Statement</h2>
            <p>
              We may update this GDPR Compliance Statement from time to time. Any changes will be 
              posted on this page with an updated revision date.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">12. Contact Us</h2>
            <p>
              If you have any questions about our GDPR compliance or how we handle your personal data, 
              please contact us at:
            </p>
            <div className="mt-2">
              <p><strong>Data Protection Officer:</strong> dpo@appzila.com</p>
              <p><strong>Address:</strong> 123 Tech Boulevard, Suite 500, San Francisco, CA 94105, USA</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDPR;