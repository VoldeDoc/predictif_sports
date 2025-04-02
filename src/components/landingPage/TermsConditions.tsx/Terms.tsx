import LandingPageLayout from "@/components/Layout/LandingPageLayout";

export default function Terms() {
    return (
        <LandingPageLayout>
            <div className="container mx-auto px-4 py-36 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
                <p className="text-sm mb-8">Effective Date: 28 March 2025</p>
                
                <p className="mb-6">
                    Welcome to Predictif Sports! These Terms and Conditions govern your use of our website (predictif.sports) and services. 
                    By accessing or using our website, you agree to comply with these terms. If you do not agree, please do not use our services.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Definitions</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>"Predictif Sports" refers to our website and services.</li>
                    <li>"User" or "You" refers to any person accessing our website or services.</li>
                    <li>"Services" refers to our sports predictions, insights, and related features.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
                <p className="mb-3">By using our website, you confirm that:</p>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>You are at least 18 years old or have parental/guardian consent.</li>
                    <li>You have the legal capacity to enter into this agreement.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Services</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>Our predictions and insights are for informational and entertainment purposes only and should not be considered betting advice.</li>
                    <li>You agree not to misuse, copy, distribute, or exploit our content for commercial purposes without written permission.</li>
                    <li>You must not use our website for any illegal or unauthorized activities.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Account Registration & Security</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>You may need to create an account to access certain features.</li>
                    <li>You are responsible for maintaining the confidentiality of your login details.</li>
                    <li>We reserve the right to suspend or terminate accounts found to be in violation of these terms.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>All content on Predictif Sports (text, images, software, trademarks, etc.) is our intellectual property or licensed to us.</li>
                    <li>You may not reproduce, modify, or distribute any content without prior written consent.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimer of Warranties</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>Our website and services are provided "as is" without warranties of any kind.</li>
                    <li>We do not guarantee the accuracy, reliability, or outcome of any predictions.</li>
                    <li>We are not responsible for any financial losses resulting from reliance on our services.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
                <ul className="list-disc pl-8 mb-6 space-y-2">
                    <li>Predictif Sports shall not be liable for any direct, indirect, or consequential damages arising from the use of our website.</li>
                    <li>We do not accept liability for technical issues, data loss, or third-party actions beyond our control.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links</h2>
                <p className="mb-6">
                    Our website may contain links to third-party websites. We are not responsible for their content or practices.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
                <p className="mb-6">
                    We reserve the right to suspend or terminate access to our website or services at any time, without notice, 
                    if we believe you have violated these terms.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
                <p className="mb-6">
                    We may update these Terms and Conditions at any time. Continued use of our services after changes are posted 
                    means you accept the revised terms.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
                <p className="mb-6">
                    These Terms and Conditions are governed by the laws of England. Any disputes shall be resolved in the 
                    applicable courts of that jurisdiction.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
                <p className="mb-6">
                    For questions or concerns regarding these Terms and Conditions, please contact us:
                    <br />
                    Email: <a href="mailto:support@predictifsports.com" className="text-blue-600 hover:underline">support@predictifsports.com</a>
                </p>
            </div>
        </LandingPageLayout>
    );
}