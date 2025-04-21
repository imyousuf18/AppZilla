import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CookiePolicy = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
          <CardDescription>Last Updated: April 5, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              Appzila ("we", "our", or "us") uses cookies and similar technologies on our website. 
              This Cookie Policy explains how we use cookies, how we share information with our 
              partners, and how you can manage your cookie preferences.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to 
              the website owners. Cookies help enhance your experience by:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Remembering your preferences and settings</li>
              <li>Enabling you to log in to your account</li>
              <li>Analyzing how you use our website to improve its functionality</li>
              <li>Personalizing content to your interests</li>
              <li>Providing secure browsing experience</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Types of Cookies We Use</h2>
            
            <h3 className="text-lg font-medium mt-4">3.1 Essential Cookies</h3>
            <p>
              These cookies are necessary for our website to function properly. They enable core 
              functionality such as security, network management, and account access. You cannot 
              opt out of these cookies as the website cannot function properly without them.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.2 Performance and Analytics Cookies</h3>
            <p>
              These cookies collect information about how visitors use our website, such as which 
              pages they visit most often and if they receive error messages. They help us improve 
              how our website works and measure the effectiveness of our advertising.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.3 Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make (such as your username, 
              language, or region) and provide enhanced, personalized features.
            </p>
            
            <h3 className="text-lg font-medium mt-4">3.4 Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements that are more relevant to you and 
              your interests. They are also used to limit the number of times you see an advertisement 
              and help measure the effectiveness of advertising campaigns.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. Third-Party Cookies</h2>
            <p>
              We may allow third parties to place cookies on your device when you visit our website. 
              These third parties include analytics services, advertising networks, and social media 
              platforms. The third-party cookies are governed by the respective privacy policies of 
              these third parties.
            </p>
            <p>
              We currently use cookies from the following third parties:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Google Analytics – for website analytics</li>
              <li>Google Ads – for advertising purposes</li>
              <li>Facebook – for social media integration and advertising</li>
              <li>LinkedIn – for social media integration and advertising</li>
              <li>Hotjar – for user behavior analytics</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Cookie Management</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Delete all cookies from your browser</li>
              <li>Block all cookies by activating the setting on your browser</li>
              <li>Block specific cookies</li>
              <li>Block third-party cookies</li>
            </ul>
            <p className="mt-2">
              Please note that if you choose to block or delete cookies, you may not be able to 
              access certain areas or features of our website, and some services may not function 
              properly.
            </p>
            <p className="mt-2">
              You can find information on how to manage cookies in your browser at:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" className="text-primary underline" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></li>
              <li>Firefox: <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-primary underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer</a></li>
              <li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies</a></li>
              <li>Edge: <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/microsoft-edge/delete-cookies</a></li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, 
              regulation, or our business practices. Any changes will be posted on this page with an 
              updated revision date. If we make significant changes, we will notify you through a 
              notice on our website or by email.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please 
              contact us at:
            </p>
            <div className="mt-2">
              <p><strong>Email:</strong> privacy@appzila.com</p>
              <p><strong>Address:</strong> 123 Tech Boulevard, Suite 500, San Francisco, CA 94105, USA</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePolicy;