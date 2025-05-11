"use client";

import React from "react";
import LegalPageLayout from "@/components/legal/legal-page-layout";

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Learn how we use cookies and similar technologies on our platform."
      lastUpdated="January 1, 2024"
    >
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Cookie Policy explains how FoundersFrame (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit our website or use our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
      </section>

      <section className="mt-8">
        <h2>2. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
        </p>
        <p className="mt-4">
          Cookies allow a website to recognize your device and remember if you&apos;ve been to the website before. Cookies can also be used to remember your preferences, analyze how you use the website, and deliver personalized content and advertisements.
        </p>
      </section>

      <section className="mt-8">
        <h2>3. Types of Cookies We Use</h2>
        <p>
          We use different types of cookies for various reasons:
        </p>

        <h3 className="mt-4 text-lg font-semibold">3.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and account authentication. The website cannot function properly without these cookies.
        </p>

        <h3 className="mt-4 text-lg font-semibold">3.2 Preference Cookies</h3>
        <p>
          These cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in. They help to personalize your experience on our platform.
        </p>

        <h3 className="mt-4 text-lg font-semibold">3.3 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They provide insights into metrics such as number of visitors, bounce rate, traffic source, and other valuable data that helps us improve our platform.
        </p>

        <h3 className="mt-4 text-lg font-semibold">3.4 Marketing Cookies</h3>
        <p>
          These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
        </p>

        <h3 className="mt-4 text-lg font-semibold">3.5 Social Media Cookies</h3>
        <p>
          These cookies are set by social media services that we have added to the site to enable you to share our content with your friends and networks. They are capable of tracking your browser across other sites and building up a profile of your interests.
        </p>
      </section>

      <section className="mt-8">
        <h2>4. Specific Cookies We Use</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-4 border-b text-left">Cookie Name</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Purpose</th>
                <th className="py-2 px-4 border-b text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">session_id</td>
                <td className="py-2 px-4 border-b">Essential</td>
                <td className="py-2 px-4 border-b">Maintains your session state</td>
                <td className="py-2 px-4 border-b">Session</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">auth_token</td>
                <td className="py-2 px-4 border-b">Essential</td>
                <td className="py-2 px-4 border-b">Authenticates logged-in users</td>
                <td className="py-2 px-4 border-b">30 days</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">theme_preference</td>
                <td className="py-2 px-4 border-b">Preference</td>
                <td className="py-2 px-4 border-b">Remembers your theme preference (light/dark)</td>
                <td className="py-2 px-4 border-b">1 year</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">_ga</td>
                <td className="py-2 px-4 border-b">Analytics</td>
                <td className="py-2 px-4 border-b">Google Analytics - Distinguishes users</td>
                <td className="py-2 px-4 border-b">2 years</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">_gid</td>
                <td className="py-2 px-4 border-b">Analytics</td>
                <td className="py-2 px-4 border-b">Google Analytics - Distinguishes users</td>
                <td className="py-2 px-4 border-b">24 hours</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">_fbp</td>
                <td className="py-2 px-4 border-b">Marketing</td>
                <td className="py-2 px-4 border-b">Facebook Pixel - Identifies browsers for ad delivery</td>
                <td className="py-2 px-4 border-b">3 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2>5. Other Tracking Technologies</h2>
        <p>
          In addition to cookies, we may use other similar technologies:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Web Beacons:</strong> Small graphic images (also known as &quot;pixel tags&quot; or &quot;clear GIFs&quot;) that may be included on our sites and services that typically work in conjunction with cookies to identify our users and user behavior.</li>
          <li><strong>Local Storage:</strong> We may use local storage technologies (such as HTML5 localStorage) to store your preferences or display content based on what you view on our site to personalize your visit.</li>
          <li><strong>JavaScript:</strong> We may use JavaScript to enhance website functionality and tailor the site to your preferences.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>6. Managing Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
        </p>
        <p className="mt-4">
          Here&apos;s how to manage cookies in major browsers:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>7. Cookie Consent</h2>
        <p>
          When you first visit our website, you will be shown a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the &quot;Cookie Settings&quot; link in the footer of our website.
        </p>
      </section>

      <section className="mt-8">
        <h2>8. Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the &quot;Last Updated&quot; date.
        </p>
        <p className="mt-4">
          You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
        </p>
      </section>

      <section className="mt-8">
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> privacy@foundersframe.com<br />
          <strong>Address:</strong> 123 Innovation Way, San Francisco, CA 94107
        </p>
      </section>
    </LegalPageLayout>
  );
}
