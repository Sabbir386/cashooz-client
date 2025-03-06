import React from "react";
import { Link } from "react-router-dom";

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
            All earnings are in USD. $1.00 = 1000 CZ (Points). This Privacy
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
            Personal Data Collection and Usage
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Personal data, also known as personal information, refers to any
            details that can be used to identify an individual. This does not
            include anonymized data, such as "Anonymous Data," which is no
            longer linked to identifiable individuals. We collect and process
            personal data to operate our website effectively and provide our
            content and services to users. Typically, we process personal data
            only with the consent of website visitors.
          </p>
          <p className="text-gray-200 leading-relaxed">
            We gather, store, use, and transfer various types of personal data,
            which we categorize as follows:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>
              Identity Data: This includes information that can uniquely
              identify you, such as your first and last name, username,
              telephone number, gender, country of residence, and official
              identification documents like a driver's license, passport, state
              identification, visa, or similar government-issued IDs.
            </li>
            <li>
              Contact Data: This consists of details like your address, email
              address, and telephone numbers, which allow us to communicate with
              you.
            </li>
            <li>
              Special Categories Data: This refers to sensitive personal data,
              including information about your race, ethnicity, religious or
              philosophical beliefs, sexual life, sexual orientation, political
              views, health status, and biometric data.
            </li>
            <li>
              Transaction Data: This includes information about your financial
              transactions, such as payment methods, payouts, cash-outs,
              redemption methods, and gift card information for services
              provided on the website.
            </li>
            <li>
              Technical Data: This includes data about your internet protocol
              (IP) address, browser type and version, device identification,
              operating system, time zone settings, location, and other
              technical details about the device and software you use to access
              our website.
            </li>
            <li>
              Profile Data: This includes usernames, passwords, selfies,
              interests, preferences, feedback, and information gathered from
              research and survey responses that help us tailor our services.
            </li>
            <li>
              Research and Survey Responses Data: This includes information
              collected through surveys or research efforts aimed at improving
              user experience and enhancing our website. While this data may be
              linked to you, it is processed in a pseudonymous manner, meaning
              it is not directly identifiable.
            </li>
            <li>
              Usage Data: This data provides insights into how you interact with
              our website, including the content you view or click on, as well
              as diagnostic and troubleshooting information related to your
              activities.
            </li>
            <li>
              Marketing and Communications Data: This includes your preferences
              regarding marketing communications from us or third parties (e.g.,
              via platforms like Facebook, Google Analytics, or Microsoft
              Clarity). It also includes your communication preferences, which
              help us tailor our outreach efforts. <br /> Additionally, we
              collect Aggregated Data, which refers to statistical or
              demographic data derived from personal information. While
              Aggregated Data may come from your personal information, it cannot
              be used to identify you and is not classified as personal data
              under privacy laws. <br />
              Overall, we collect and process your personal information to
              enhance your experience on our website, improve our services, and
              communicate with you more effectively. We ensure that this data is
              managed in compliance with privacy laws and regulations.
            </li>
          </ul>
        </section>
        <section className="mt-8">
          <div className="">
            <div className="shadow-lg rounded-2xl p-6 ">
              <div>
                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Data You Provide to Us
                  </h2>
                  <p className="text-white mt-2">
                    We collect data directly from you when you interact with us,
                    such as during communications regarding our services. For
                    example, if you reach out for technical support, we collect
                    the information you provide.
                  </p>
                </section>

                <section className="mb-6">
                  <p className="text-white mt-2">
                    We also use third-party tools to help facilitate, operate,
                    and manage our website. These third-party services, which
                    include tools that use cookies and other tracking
                    technologies, collect data when you interact with our site.
                    These tools are managed by external parties, and we are not
                    responsible for the specific data they capture or how they
                    use and protect that data.
                  </p>
                  <p className="text-white mt-2">
                    When utilizing our Services, we and our third-party service
                    providers may gather information from you through automated
                    methods, including cookies, web beacons, and web server
                    logs. By engaging with the Services, you agree to the use of
                    cookies, beacons, and similar technologies in your browser
                    and within emails, as outlined in this Privacy Policy. The
                    data collected through these means encompasses your IP
                    address, browser specifications, gyroscopic position,
                    service strength, data provider, device identifiers and
                    characteristics, country code or approximate location,
                    operating system version, language preferences, referring
                    URLs, and details regarding your usage of our Services, such
                    as the duration (in seconds) of music playback, metadata
                    (including genre, artist, album, title, description, and
                    tags), and media type.
                  </p>
                  <p className="text-white mt-2">
                    We may utilize this information for various purposes, such
                    as ensuring the proper functioning of the Services, creating
                    an account on your behalf if you have not formally
                    registered, analyzing your listening habits and preferences
                    to deliver personalized content, assessing the number of
                    users visiting specific pages or engaging with messages or
                    newsletters, and preventing fraudulent activities. We
                    collaborate with analytics providers like Google Analytics,
                    which employs cookies and similar technologies to collect
                    and analyze data regarding the use of the Services and to
                    report on activities and trends. This service may also
                    gather information about your interactions with other
                    websites, applications, and online resources. For more
                    information on Google’s practices, please visit
                    https://www.google.com/policies/privacy/partners/, and you
                    can opt out by downloading the Google Analytics opt-out
                    browser add-on available at
                    https://tools.google.com/dlpage/gaoptout.
                  </p>
                  <p className="text-white mt-2">
                    Additionally, third parties that promote goods or services
                    on the Service (collectively referred to as “Advertisers”)
                    may also employ cookies or other technologies to monitor
                    your usage of the Service. Advertisers may further utilize
                    cookies to track your online activities across various
                    websites over time to deliver interest-based advertising.
                  </p>
                  <p className="text-white mt-2">
                    The data we collect is stored on servers located in
                    Amsterdam, Netherlands, ensuring that your information is
                    managed and stored securely.
                  </p>
                  <p className="text-white mt-2">
                    We ensure that cookies and tracking technologies are only
                    activated once you provide your consent. This consent is
                    tracked when you click “Accept” on our Privacy Center. By
                    consenting, you allow us and our third-party service
                    providers to collect and process data through these tools.
                  </p>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Usage of Collected Data
                  </h2>
                  <ul className="list-disc list-inside text-white mt-2">
                    <li>Ensuring the proper functioning of the Services.</li>
                    <li>Creating an account on your behalf.</li>
                    <li>
                      Analyzing your listening habits for personalized content.
                    </li>
                    <li>
                      Tracking user engagement with newsletters and messages.
                    </li>
                    <li>Preventing fraudulent activities.</li>
                  </ul>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Third-Party Analytics
                  </h2>
                  <p className="text-white mt-2">
                    We use Google Analytics to track and analyze website usage
                    trends. More information on their data policies can be found
                    <Link
                      href="https://www.google.com/policies/privacy/partners/"
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      here
                    </Link>
                    . You can opt out via
                    <Link
                      href="https://tools.google.com/dlpage/gaoptout"
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      this link
                    </Link>
                    .
                  </p>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Advertising and Tracking
                  </h2>
                  <p className="text-white mt-2">
                    Advertisers may use cookies to track your usage across
                    various websites and deliver interest-based ads.
                  </p>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Data Storage
                  </h2>
                  <p className="text-white mt-2">
                    Your data is securely stored on servers in Amsterdam,
                    Netherlands.
                  </p>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Consent</h2>
                  <p className="text-white mt-2">
                    Cookies and tracking technologies are only activated after
                    you provide consent by clicking “Accept.”
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
            Location Data
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We may gather information regarding your real-time geo-location
            through our tracking software and Features to offer location-aware
            services, provided that you have requested or consented to such
            services. This information is utilized to deliver content,
            advertising, or other services that rely on your location. In
            instances where you have opted for location-aware services, we may
            also collect this data in conjunction with an identifier linked to
            your device, allowing us to recognize your mobile browser or device
            upon your return to our tracking software. This data is classified
            as Personal Data in numerous jurisdictions. Additionally, with your
            request or consent, we may share your location information with
            advertisers, merchants, and third-party partners involved in surveys
            and other activities, to present you with reward opportunities,
            assist in locating participating stores or partners, and for various
            research, analytics, and marketing purposes. You have the ability to
            provide or withdraw your consent for us to access your location data
            at any time by modifying the settings on your mobile device.
            Furthermore, you can cease all location data collection by
            uninstalling all tracking mobile applications, following the
            standard uninstallation procedures for your device.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
          How We Use Your Personal Information
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
          We collect and use your personal information for various purposes related to the operation of our services, including but not limited to the following:
          </p>
          <ul>
            <li></li>
          </ul>
        
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
