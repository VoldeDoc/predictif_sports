import LandingPageLayout from "@/components/Layout/LandingPageLayout";

export default function Privacy() {
    return (
        <LandingPageLayout>
            <div className="container mx-auto px-4 py-36 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-sm mb-8">Effective Date: 28 March 2025</p>
                
                <p className="mb-6">
                    Welcome to Predictif Sports. Your privacy is important to us, and we are committed to protecting your personal information. 
                    This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website (predictif.sports) and use our services.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information:</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">a. Personal Information</h3>
                <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Account login credentials</li>
                    <li>Payment information (if applicable)</li>
                    <li>Other details you provide when using our services</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">b. Non-Personal Information</h3>
                <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>Browser type and version</li>
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>Operating system</li>
                    <li>Usage data (e.g., pages visited, time spent on site)</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">c. Cookies & Tracking Technologies</h3>
                <p className="mb-6">
                    We use cookies and similar technologies to improve your experience, track website analytics, and enhance our services. 
                    You can manage cookie preferences through your browser settings.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="mb-3">We use collected information for:</p>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>Providing and improving our sports prediction services</li>
                    <li>Enhancing user experience</li>
                    <li>Communicating with you (e.g., customer support, updates, promotional offers)</li>
                    <li>Analyzing site traffic and user behavior</li>
                    <li>Ensuring website security and fraud prevention</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Share Your Information</h2>
                <p className="mb-3">
                    We do not sell, rent, or trade your personal information. However, we may share data with:
                </p>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>Service providers (e.g., hosting, analytics, payment processing)</li>
                    <li>Legal authorities if required by law or to protect our rights</li>
                    <li>Business partners for collaborative services (only with your consent)</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                <p className="mb-6">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, 
                    disclosure, or misuse. However, no method of transmission over the internet is 100% secure, and we encourage 
                    users to take precautions when sharing sensitive information.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights & Choices</h2>
                <p className="mb-3">
                    Depending on your location, you may have rights under data protection laws, including:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>Accessing, updating, or deleting your personal data</li>
                    <li>Opting out of marketing communications</li>
                    <li>Managing cookie preferences</li>
                    <li>Withdrawing consent for data processing (where applicable)</li>
                </ul>
                <p className="mb-6">
                    To exercise your rights, contact us at <a href="mailto:support@predictifsports.com" className="text-blue-600 hover:underline">support@predictifsports.com</a>
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Links</h2>
                <p className="mb-6">
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices 
                    and encourage users to review their policies.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
                <p className="mb-6">
                    We may update this policy from time to time. Changes will be posted on this page with an updated "Effective Date." 
                    Continued use of our website after changes signifies acceptance of the revised policy.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
                <p className="mb-6">
                    For questions or concerns about this Privacy Policy, please contact us at:
                    <br />
                    📧 Email: <a href="mailto:support@predictifsports.com" className="text-blue-600 hover:underline">support@predictifsports.com</a>
                </p>
            </div>
        </LandingPageLayout>
    );
}