import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | Kartik Sharma - Software Developer Portfolio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms of Service for Kartik Sharma's portfolio website. Read the terms and conditions for using our services."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Terms of Service for Kartik Sharma's portfolio website. Read the terms and conditions for using our services.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-terms-title">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                By accessing or using Kartik Sharma's portfolio website, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree with any of
                these terms, you are prohibited from using or accessing this site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Permission is granted to temporarily view the materials on this website for personal,
                non-commercial use only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                All content on this website, including but not limited to text, graphics, logos, images,
                and software, is the property of Kartik Sharma and is protected by copyright, trademark,
                and other intellectual property laws. You may not use, reproduce, or distribute any content
                from this website without express written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Submissions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                By submitting content through our contact form or other communication channels, you grant
                us the right to use, modify, and display that content for the purposes of responding to
                your inquiry and improving our services. You represent that you have the right to submit
                such content and that it does not violate any third-party rights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                The materials on this website are provided on an "as is" basis. Kartik Sharma makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties
                including, without limitation, implied warranties or conditions of merchantability, fitness
                for a particular purpose, or non-infringement of intellectual property or other violation of
                rights.
              </p>
              <p>
                Further, Kartik Sharma does not warrant or make any representations concerning the accuracy,
                likely results, or reliability of the use of the materials on its website or otherwise
                relating to such materials or on any sites linked to this site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                In no event shall Kartik Sharma or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on this website, even if Kartik
                Sharma or an authorized representative has been notified orally or in writing of the
                possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links to Third-Party Websites</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                This website may contain links to third-party websites. These links are provided for your
                convenience only. Kartik Sharma has no control over the content of third-party sites and
                accepts no responsibility for them or for any loss or damage that may arise from your use
                of them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Kartik Sharma may revise these Terms of Service at any time without notice. By using this
                website, you are agreeing to be bound by the current version of these Terms of Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of
                India, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                If you have any questions about these Terms of Service, please contact us through our
                contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
