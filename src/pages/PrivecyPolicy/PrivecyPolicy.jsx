import React from "react";

function PrivecyPolicy() {
  return (
    <div className="bg-secondaryColor text-white py-10 px-6 md:px-20 mt-5">
      <div className="max-w-4xl mx-auto bg-primaryColor text-gray-800 rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-buttonBackground">
          Privacy & Policy
        </h1>
        <p className="text-sm md:text-base text-white">
          Last modified: Feb 01 2021
        </p>

        <section className="mt-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
            Privacy Policy
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your privacy is essential to us at Cashooz. This Privacy Policy aims
            to clarify how we collect, utilize, process, share, and protect your
            Personal Information obtained through our websites. Our policy to
            respect your privacy regarding any information we may collect while
            operating our website. Additionally, it outlines your rights and
            options regarding your Personal Information and provides information
            on how to reach us with any inquiries or concerns.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            The terms "Cashooz," "we," and "us" refer to Cashooz, along with our
            affiliates and subsidiaries. By utilizing our Services, you consent
            to the processing of your Personal Information as detailed in this
            Privacy Policy. We are dedicated to safeguarding your privacy and
            ensuring the protection of personally identifiable information that
            you may provide through the Website.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            All earnings are in USD. $1.00 = 100 CZ (Points). This Privacy
            Policy has been established to clarify the types of information that
            may be collected on our Website, the manner in which we utilize this
            information, and the circumstances under which we may share it with
            third parties. This Privacy Policy is exclusively applicable to
            information collected via the Website and does not extend to
            information obtained from other sources. Together with the Terms and
            Conditions available on our Website, this Privacy Policy outlines
            the fundamental rules and policies that govern your use of our
            Website.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Depending on your activities while visiting our Website, you may be
            required to consent to additional terms and conditions. Furthermore,
            your engagement with the Service is also governed by our Terms and
            conditions.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
            Information Regarding Personal Data We Collect
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            For the purposes of this Privacy Policy, "Personal Information"
            refers to any information that relates to an identified or
            identifiable individual. We collect Personal Information about you
            from various sources, as outlined below.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Where applicable, we will indicate whether providing certain
            Personal Information is mandatory, the reasons for its collection,
            and the potential consequences if you choose not to provide it. If
            you do not provide the required Personal Information when requested,
            you may not be able to fully access or benefit from our Service,
            especially if the information is necessary to deliver the Service or
            if we are legally obligated to collect it.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Types of Personal Information we collect include:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Email Address</li>
            <li>First Name and Last Name</li>
            <li>
              Address (including State, Province, ZIP/Postal Code, and City)
            </li>
            <li>Location Information</li>
            <li>IP Address</li>
            <li>Device Fingerprints</li>
            <li>Payment Information</li>
          </ul>
          <p className="text-gray-400 leading-relaxed">
            For a detailed list of the types of data collected and their
            purposes, please refer to the full privacy policy available on our
            website.
          </p>
        </section>
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
            Payment Information
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            When you reach the minimum payout threshold in your total wallet
            earnings, you will be required to verify your identity before
            receiving payment. This verification process is required only once.
            Any ID documents you upload will be immediately deleted from our
            servers once your identity is verified.
          </p>
          <p className="font-bold text-gray-400">
            To complete your ID verification, you must provide at least two out
            of the following three options:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-2">
            <li>
              {" "}
              Take a photo of yourself holding a piece of paper with the word
              "Cashooz" written on it, with your face clearly visible.
            </li>
            <li>
              Upload a government-issued ID (e.g., Driver's License, Passport,
              or Student ID).
            </li>
            <li>
              Provide a link to your personal Facebook profile (it must be
              publicly viewable and not set to private).
            </li>
          </ul>
          <p className="text-gray-400 mb-2">
            If you prefer not to provide ID documents, you can contact support
            to request an alternative verification method. In some cases, we may
            offer SMS verification, where a code is sent to your mobile phone.
          </p>
          <p className="text-gray-400 mb-2">
            We may also collect Personal Information that you provide to us
            during communications about our services, such as technical support
            inquiries. Additionally, we may need to use your Personal
            Information for audits or to comply with our legal obligations under
            applicable laws.
          </p>
          <p className="text-gray-400 mb-2">
            For details on your rights regarding your Personal Information,
            please refer to the "What Are Your Rights as the Owner of the
            Personal Information" section below.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
            Contact Us
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            If you have any questions or concerns about our privacy practices or
            this policy, you can contact us using the methods below:
          </p>
          <p className="text-gray-400 leading-relaxed">
            - Contact Form:{" "}
            <a
              href="https://cashooz.com/contact"
              className="text-blue-500 underline"
            >
              Click here to contact
            </a>
            <br />- Website:{" "}
            <a
              href="http://www.cashooz.com"
              className="text-blue-500 underline"
            >
              cashooz.com
            </a>
            <br />- Write a letter: Attn: Privacy Team, Cashooz.com, 3340
            Copperhead Road, Glastonbury, CT 06033
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivecyPolicy;
