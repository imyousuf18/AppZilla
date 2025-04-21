import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, AlertTriangle, CheckCircle2, Server } from 'lucide-react';

const Security = () => {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-3xl font-bold">Security Practices</CardTitle>
          </div>
          <CardDescription>Last Updated: April 5, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              1. Our Security Commitment
            </h2>
            <p>
              At Appzila, security is not just a feature—it's the foundation of everything we build. 
              We understand that our clients trust us with their valuable data and intellectual property. 
              We take this responsibility seriously and have implemented comprehensive security measures 
              to protect your information and applications.
            </p>
            <p className="mt-2">
              This document outlines our approach to security and the measures we have in place to 
              protect your data throughout the application development lifecycle.
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. Infrastructure Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-primary-800/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  Secure Hosting
                </h3>
                <p className="text-sm mt-2">
                  We use enterprise-grade cloud services that comply with industry standards 
                  for security and reliability. Our infrastructure is protected by advanced 
                  firewalls, intrusion detection systems, and continuous monitoring.
                </p>
              </div>
              <div className="bg-primary-800/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Data Encryption
                </h3>
                <p className="text-sm mt-2">
                  All data is encrypted both at rest and in transit using industry-standard 
                  encryption protocols (AES-256, TLS 1.3). We implement strong encryption 
                  key management practices to protect sensitive information.
                </p>
              </div>
              <div className="bg-primary-800/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Redundancy & Backup
                </h3>
                <p className="text-sm mt-2">
                  Our systems are designed with redundancy to ensure high availability. 
                  We perform regular automated backups with strict retention policies 
                  and disaster recovery procedures.
                </p>
              </div>
              <div className="bg-primary-800/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  Vulnerability Management
                </h3>
                <p className="text-sm mt-2">
                  We conduct regular vulnerability assessments and penetration testing 
                  to identify and address potential security weaknesses before they can 
                  be exploited.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Application Security</h2>
            <p>
              Security is built into our development process from the ground up. We follow 
              secure coding practices and implement multiple layers of protection:
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="bg-primary-800/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Secure Development Lifecycle</h3>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Security requirements gathering at project initiation</li>
                  <li>Threat modeling to identify potential vulnerabilities</li>
                  <li>Secure coding guidelines and training for all developers</li>
                  <li>Regular code reviews with security focus</li>
                  <li>Automated static and dynamic security testing</li>
                  <li>Third-party dependency security scanning</li>
                </ul>
              </div>
              
              <div className="bg-primary-800/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Authentication & Access Control</h3>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Multi-factor authentication (MFA) implementation</li>
                  <li>Role-based access control (RBAC) with least privilege principle</li>
                  <li>Secure password policies and storage (using strong hashing algorithms)</li>
                  <li>Session management with secure token handling</li>
                  <li>API authentication with secure token generation</li>
                </ul>
              </div>
              
              <div className="bg-primary-800/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Data Protection</h3>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Input validation and output encoding to prevent injection attacks</li>
                  <li>Protection against common web vulnerabilities (XSS, CSRF, etc.)</li>
                  <li>Data minimization practices</li>
                  <li>Secure data deletion procedures</li>
                  <li>Regular security audits of database configurations</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. Compliance & Certifications</h2>
            <p>
              We maintain compliance with relevant security standards and regulations:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="border border-primary-700 rounded-lg p-4">
                <h3 className="font-medium">ISO/IEC 27001</h3>
                <p className="text-sm mt-1">Information Security Management</p>
              </div>
              <div className="border border-primary-700 rounded-lg p-4">
                <h3 className="font-medium">GDPR</h3>
                <p className="text-sm mt-1">European Data Protection Regulation</p>
              </div>
              <div className="border border-primary-700 rounded-lg p-4">
                <h3 className="font-medium">CCPA</h3>
                <p className="text-sm mt-1">California Consumer Privacy Act</p>
              </div>
              <div className="border border-primary-700 rounded-lg p-4">
                <h3 className="font-medium">SOC 2 Type II</h3>
                <p className="text-sm mt-1">Service Organization Control</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Security Team & Processes</h2>
            
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium">Dedicated Security Team</h3>
                <p className="mt-1">
                  Our security team consists of certified professionals who continuously monitor 
                  and improve our security posture. They work closely with development teams to 
                  ensure security is integrated throughout the application lifecycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Incident Response</h3>
                <p className="mt-1">
                  We have a well-defined incident response plan that includes:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>24/7 monitoring and alerting systems</li>
                  <li>Documented response procedures for different types of incidents</li>
                  <li>Regular incident response drills and tabletop exercises</li>
                  <li>Post-incident analysis and improvement process</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Vendor Security Assessment</h3>
                <p className="mt-1">
                  We carefully assess the security practices of all third-party vendors and 
                  service providers we work with to ensure they meet our security standards.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. Client Security Assurance</h2>
            
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium">Security Documentation</h3>
                <p className="mt-1">
                  We provide detailed security documentation for all applications we develop, 
                  including architecture diagrams, security controls implemented, and recommended 
                  secure configurations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Security Review</h3>
                <p className="mt-1">
                  Before application delivery, we conduct a comprehensive security review 
                  to ensure all security requirements have been met and that the application 
                  is free from common vulnerabilities.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Ongoing Support</h3>
                <p className="mt-1">
                  Our security team remains available to address any security concerns 
                  that may arise after application delivery and to provide guidance on 
                  security best practices.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">7. Reporting Security Concerns</h2>
            <p>
              We encourage responsible disclosure of any security vulnerabilities you may discover. 
              If you believe you've found a security issue in one of our applications or systems, 
              please contact us immediately at:
            </p>
            <div className="mt-2 p-4 bg-primary-800/30 rounded-lg">
              <p className="font-medium">Security Team Contact:</p>
              <p className="mt-1">Email: security@appzila.com</p>
              <p>Emergency Hotline: +1 (555) 987-6543</p>
            </div>
            <p className="mt-4 text-sm">
              We commit to acknowledging your report within 24 hours and will work diligently 
              to investigate and address any valid security concerns.
            </p>
          </div>
          
          <Separator />
          
          <div className="bg-primary-800/20 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Our Security Promise</h2>
            <p className="text-center">
              At Appzila, we view security as an ongoing process, not a one-time effort. 
              We continuously improve our security practices to adapt to evolving threats 
              and technologies. When you partner with us, you can be confident that security 
              is at the heart of everything we do.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;