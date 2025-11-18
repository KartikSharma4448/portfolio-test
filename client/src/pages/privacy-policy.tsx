import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Kartik Sharma - Software Developer Portfolio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy Policy for Kartik Sharma's portfolio website. Learn how we collect, use, and protect your personal information."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Privacy Policy for Kartik Sharma's portfolio website. Learn how we collect, use, and protect your personal information.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-privacy-title">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Welcome to Kartik Sharma's portfolio website. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website. Please read this
                privacy policy carefully.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Personal Data</h3>
              <p>
                When you use our contact form, we collect personally identifiable information that you
                voluntarily provide to us, including:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Message content</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device,
                including:
              </p>
              <ul>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent on pages</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you updates and communications you have requested</li>
                <li>Improve our website and user experience</li>
                <li>Monitor and analyze website usage and trends</li>
                <li>Prevent fraudulent transactions and monitor against theft</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclosure of Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to
                third parties without your consent, except:
              </p>
              <ul>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights or property</li>
                <li>To prevent or investigate possible wrongdoing</li>
                <li>With your explicit consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                We use administrative, technical, and physical security measures to protect your personal
                information. While we have taken reasonable steps to secure the personal information you
                provide to us, please be aware that no security measures are perfect or impenetrable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                We may use cookies and similar tracking technologies to access or store information. You can
                instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                If you have any questions about this Privacy Policy, please contact us through our contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
