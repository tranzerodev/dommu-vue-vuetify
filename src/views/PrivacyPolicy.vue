<template>
  <div class="about">
    <!--   <p class="privacy-policy">{{siteName()}}'s Privacy Policy</p> -->

    <h1>Privacy policy</h1>

    <p class="privacy-policy">
      Domun.co.uk is a website which, amongst other things, compares mortgage
      products that may be available to you depending upon your circumstances.
    </p>

    <p class="privacy-policy">
      Domun is a trading name of Firmview Associates Limited.
    </p>

    <p class="privacy-policy">
      Firmview Associates Limited will be the data controller for the data that
      you provide us or we collect in relation to the provision of our services
      to you. Firmview Associates Limited is committed to protecting and
      respecting your privacy. Please read this Privacy policy and Cookies
      Policy carefully. You must not use our website or our services if you do
      not accept this Privacy and Cookie Policy or our Terms and Conditions.
      These policies set out our view and practices regarding your personal data
      and how we collect, process and treat it.
    </p>

    <p class="privacy-policy">
      By visiting
      <a href="https://www.domun.co.uk">www.domun.co.uk</a> and using our apps
      and services you are accepting and consenting to the practices described.
    </p>

    <p class="privacy-policy">
      Any data held is subject to the General Data Protection Regulation (GDPR).
      The data controller of your information is Firmview Associates Limited of
      19 Chancel Way, Charlton Kings, Cheltenham, Gloucestershire, GL53 7RR. Our
      data controller registration number is Z914038X. You can check our
      registration on the Data Protection Public Register by visiting
      <a href="https://www.ico.org.uk/esdwebpages/search"
        >https://www.ico.org.uk/esdwebpages/search</a
      >.
    </p>

    <p class="privacy-policy">
      References in this Privacy policy and on our website to "we”, "our” or
      "us” are references to Firmview Associates Limited. References to "you”
      and "your” means each natural or legal person who uses our website or the
      associated services. References to our website below include references to
      our apps.
    </p>
    <h2 class="privacy-policy">1. Personal information we collect</h2>

    <p class="privacy-policy">
      <i>We collect and process information which:</i>
    </p>

    <ul>
      <li>
        <i>
          you give to us when you register with us, such as your name and email
          address.
        </i>
      </li>
      <li>
        <i>
          you give to us when you introduce yourself to a provider, such as your
          contact number.
        </i>
      </li>
      <li>
        <i>
          we collect about you based on your use of our website or from your
          mobile device if you are using our app.
        </i>
      </li>
      <li>
        <i>
          we receive from other sources, such as third parties who give us
          information about you.
        </i>
      </li>
      <li>
        <i>is collected from cookies (see Cookies Policy below).</i>
      </li>
    </ul>

    <p class="privacy-policy">
      We may collect and process the following data about you:
    </p>

    <p class="privacy-policy">
      <b>Information you give us</b>. You may give us information about you when
      you use our services or by communicating with us.
    </p>

    <p class="privacy-policy">The information you give us may include:</p>

    <ul>
      <li>Full name.</li>
      <li>Email address.</li>
      <li>Phone number.</li>
      <li>Address.</li>
      <li>Property valuation and details.</li>
      <li>Mortgage details.</li>
    </ul>

    <p class="privacy-policy">
      Information we collect about you based on your use of our website or apps.
      Each time you visit our website or use our app we may automatically
      collect the following information:
    </p>

    <ul>
      <li>
        technical information, your Internet protocol (IP) address, login
        details, operating system and browser type.
      </li>

      <li>
        information about your visit, including the full Uniform Resource
        Locators (URL) clickstream to, through and from our website (including
        date and time); products you viewed or searched for; page response
        times, download errors, length of visits to certain pages, page
        interaction information (such as scrolling, clicks, and mouse-overs),
        and methods used to browse away from the page.
      </li>
    </ul>

    <p class="privacy-policy">
      <b>Information we receive from other sources</b>. We work closely with
      third parties (including, for example, business partners, service
      providers, analytics providers, search information providers) and may
      receive information from them.
    </p>

    <p class="privacy-policy">
      Information collected from cookies. We and our service providers collect
      information about your use of our website from cookies. For more
      information on cookies, please read our Cookies Policy.
    </p>

    <p class="privacy-policy">
      We may monitor or record communication between you and us.
    </p>

    <h2 class="privacy-policy">2. How we use your personal information</h2>

    <p class="privacy-policy">
      <i>We may use your personal information:</i>
    </p>

    <ul>
      <li>
        to enable you to access and use the services including:
        <ul>
          <li>managing, running and administering your account.</li>

          <li>
            verifying your email address as part of our sign-up process.
          </li>

          <li>
            passing it to our partners and service providers, including
            companies whose products or services are included on our site.
          </li>

          <li>
            to make your experience on our website easier, we may use your
            personal information to pre-populate fields.
          </li>
        </ul>
      </li>

      <li>
        to communicate with you:
        <ul>
          <li>
            sending you a confirmation email to confirm your introduction to a
            provider has been successful and so that you have a record of it.
          </li>
        </ul>
      </li>

      <li>
        for research, such as analysing market trends:
        <ul>
          <li>
            we may use the data relating to your quotes, your home valuation,
            your personal information and information about the policies to
            carry out research and analysis activities to help us review and
            improve our website.
          </li>
        </ul>
      </li>
    </ul>

    <h2 class="privacy-policy">
      3. Who we may share your personal information with
    </h2>

    <p class="privacy-policy">
      When you use our services, we may share your personal information with our
      service providers, partners, advertisers and Fraud Prevention Agencies.
      These third parties act on our instructions and are processors of your
      information. We may share your information with the following
      subprocessors:
    </p>

    <template>
      <v-flex xs12 sm6 class="mx-auto">
        <v-data-table
          :headers="shareWithTableHeaders"
          :items="shareWithTableRows"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.entityname }}</td>
            <td class="text-xs-center">{{ props.item.activities }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </template>
    <p class="privacy-policy">
      We may also share your information with selected third parties including:
    </p>

    <ul>
      <li>
        Fraud Prevention Agencies, to prevent crime and trace those responsible.
      </li>

      <li>
        Service providers, in order to display mortgage products on our website
        we will share your property and mortgage information with our partner
        who aggregate mortgage products. In order to display your home valuation
        on our website, we will share your address and property details with our
        Automated Valuation Model (AVM) provider.
      </li>

      <li>
        Mortgage providers, with your consent, we will share your personal
        details with Financial Conduct Authority (FCA) regulated mortgage
        advisor, Fluent Mortgages.
      </li>

      <li>
        if we sell or buy any business or assets, in which case we may disclose
        your personal data to the prospective seller or buyer of such business
        or assets (or the buyer or seller's advisers).
      </li>
      <li>
        if we or part or all of our assets are acquired by a third party, in
        which case personal data held by us about our customers will be one of
        the transferred assets.
      </li>
    </ul>

    <h2 class="privacy-policy">
      4. What is the legal basis for us using this information?
    </h2>

    <p class="privacy-policy">
      We will only collect and use your personal information in accordance with
      data protection laws. If you have any questions about the lawful bases
      upon which we collect and use your personal data, please email
      <a href="mailto:privacy@domun.co.uk">privacy@domun.co.uk</a>.
    </p>

    <p class="privacy-policy">
      <b>Performance of a contract</b>. In order to provide you with our
      services and manage your account we will: (i) access information required
      to provide you with the relevant service from our third party partners.
      (ii) manage, run and administer your account.
    </p>

    <p class="privacy-policy">
      <b>Consent</b>. We will only send you certain marketing emails if you have
      agreed to receive this information. We will always seek your consent to
      process certain types of your personal information where we are legally
      required to do so.
    </p>

    <p class="privacy-policy">
      <b>Legitimate interests</b>. We may use and process some of your personal
      information where we have sensible and legitimate business grounds to do
      so.
    </p>

    <h2 class="privacy-policy">5. How we protect your information</h2>

    <p class="privacy-policy">
      <i>
        We take the security of your data very seriously and use strict
        procedures to protect it </i
      >. Whenever we transfer personal data outside of the UK/ European Economic
      Area, we ensure that appropriate safeguards are in place to protect the
      data.
    </p>

    <p class="privacy-policy">
      All information you provide to us is stored on our secure servers.
    </p>

    <p class="privacy-policy">
      We do our best to protect your personal data, but we cannot guarantee the
      security of your data transmitted to our website; any transmission is at
      your own risk. Once we have received your information, we will use strict
      procedures and security features to try to prevent unauthorised access,
      loss or damage. In addition, we limit access to your personal data to
      those employees, agents, contractors and other third parties who have a
      business need to know. They will only process your personal data on our
      instructions and they are subject to a duty of confidentiality.
    </p>

    <p class="privacy-policy">
      We have put in place procedures to deal with any suspected personal data
      breach and will notify you and any applicable regulator of a breach where
      we are legally required to do so.
    </p>

    <p class="privacy-policy">
      Where possible, we try to only process your information within the UK and
      European Economic Area (EEA). If we or our service providers transfer
      personal data outside of the UK or EEA, we always require that appropriate
      safeguards are in place to protect the information when it is processed.
    </p>

    <h2 class="privacy-policy">6. How long we keep your information for</h2>
    <p class="privacy-policy">
      We will only hold your personal information on our systems for the period
      necessary to fulfil the purposes outlined in this Privacy Policy or until
      you request it is deleted (unless a longer retention period is required or
      permitted by law).
    </p>

    <p class="privacy-policy">
      Generally, you can expect us to keep your personal information while you
      still have an active account. How long we keep your information will
      depend on the purpose for which we use it. While you are a customer of
      ours, we will only retain your information for as long as is necessary for
      those purposes.
    </p>

    <p class="privacy-policy">
      If, having registered for any of our Services, you do not use them for a
      reasonable time (which may vary depending on the Service(s) you've
      registered for) we may contact you to ensure you're still happy to receive
      communications from us.
    </p>

    <p class="privacy-policy">
      If one of our partners processes your data in order to provide you with a
      quote they will be acting as data controller but they should only hold
      that data for so long as is reasonable in relation to providing you with
      that quote.
    </p>

    <p class="privacy-policy">
      If you purchase a product then the service provider will keep your
      personal information in accordance with their own retention periods and so
      you should check their own privacy policy for further information.
    </p>

    <p class="privacy-policy">
      If you delete or ask us to delete your account, we may continue to use
      anonymised data (which does not identify individual users) which is
      aggregated with anonymised data of other users. We use this aggregated
      anonymised data for data analysis, profiling and research purposes, for
      example to gain insights about our users. We may also keep your email
      address to ensure that you no longer receive any communications from us as
      well as your name, date of birth and latest address for fraud prevention
      purposes and for the exercise or defence of a legal claim.
    </p>

    <h2 class="privacy-policy">7. Links to and from third party websites</h2>

    <p class="privacy-policy">
      If you follow a link to or from our website to a third party website,
      please be aware that these websites have their own privacy and cookie
      policies. We do not accept responsibility or liability for these policies.
    </p>

    <h2 class="privacy-policy">8. Your rights</h2>

    <p class="privacy-policy">
      <i>
        You can exercise specific rights with regards to the data that we hold
        about you.
      </i>
    </p>

    <p class="privacy-policy">
      We will provide you with the necessary tools and contact details to be
      able to exercise your statutory rights regarding the information that we
      hold about you. You will be able to:
    </p>

    <ul>
      <li>
        Correct your data: you will usually be able to amend any information
        that we hold about you that is inaccurate or incomplete through the
        settings in your account.
      </li>

      <li>
        Request access to your data: you can ask for access to the personal data
        that we hold about you so that you can check that we are using your
        information in accordance with data protection law.
      </li>

      <li>
        Erase your data: you can ask us to fully or partially delete your
        personal data where there is no compelling reason for us to keep using
        it, although we may not be able to continue to provide our services. We
        may keep your email address to make sure the restriction is respected in
        future. We also have the right to continue using your information if
        such usage is necessary for compliance with our legal obligations.
      </li>

      <li>
        Download your data or send it to another controller: you can obtain a
        copy of the data you provided us in a machine-readable format. In
        addition, where certain conditions apply, you have the right to have
        such information transferred directly to a third party.
      </li>

      <li>
        Object to the use of your data: you can ask that we no longer use your
        personal data where that use is based on a legitimate interest.
      </li>

      <li>
        Restrict the use of your data: You have the right to ‘block' or suppress
        further use of your information in certain circumstances (for example,
        where you think the information we are using about you is inaccurate,
        whilst we verify its accuracy). When usage is restricted, we can still
        store your information, but may not use it further.
      </li>

      <li>
        Right to withdraw consent: If you have given your consent for us to use
        your information, you have the right to withdraw your consent at any
        time. This can be done by contacting our Data Protection Officer.
      </li>
    </ul>

    <p class="privacy-policy">
      For the exercise of any of your rights, you can contact us at
      <a href="mailto:privacy@domun.co.uk">privacy@domun.co.uk</a>.
    </p>

    <h2 class="privacy-policy">9. Changes we make to our Privacy policy</h2>

    <p class="privacy-policy">
      Our Privacy policy was last updated on the 9th December 2019.
    </p>
    <p class="privacy-policy">
      Any changes we may make to our Privacy policy in the future will be posted
      on this page and, where we decide it is appropriate, notified to you by
      email. We will update the Privacy policy to reflect our service offering.
      Please check back frequently to see any updates or changes to our Privacy
      notice.
    </p>

    <h2 class="privacy-policy">10. Contact us</h2>

    <p class="privacy-policy">
      Questions, comments, complaints or requests regarding this Privacy policy
      are welcomed at:
      <a href="mailto:privacy@domun.co.uk">privacy@domun.co.uk</a>.
    </p>

    <p class="privacy-policy">
      If you have any concerns about the information we hold, please contact our
      Data Protection Officer via the above method.
    </p>

    <h2 class="privacy-policy">
      11. Your right to lodge a complaint with the ICO
    </h2>

    <p class="privacy-policy">
      If you are not satisfied with our response to any complaints you raise
      with us or you believe our processing of your information does not comply
      with the data protection law, we suggest you contact our Data Protection
      Officer. You also have the right to lodge a complaint with the Information
      Commissioner's Office ("ICO”). You can contact the ICO by writing to them
      at: Information Commissioner's Office Client Services Team, Wycliffe
      House, Water Lane, Wilmslow, SK9 5AF or by visiting their website for
      further information at
      <a href="https://ico.org.uk/make-a-complaint/"
        >https://ico.org.uk/make-a-complaint/</a
      >.
    </p>

    <h1>Cookies policy</h1>

    <p class="privacy-policy">
      Domun uses cookies for a variety of purposes which can help improve your
      experience on our website.
    </p>

    <p class="privacy-policy">
      By using our website you agree that this Cookies policy, together with our
      Privacy policy and Terms and conditions, applies to that use.
    </p>

    <p class="privacy-policy">
      We are committed to protecting you and any information (anonymous or
      otherwise) that we collect about you online. This section tells you about
      how and why we use cookies, and how this allows us to improve our service.
    </p>

    <p class="privacy-policy">
      If you wish to use our website but would like us not to set cookies in
      your browser, you can disable or remove the cookies. How to do this is
      explained below. Please note that disabling or removing the cookies we or
      our 3rd party service providers set may impact the functionality and
      security of our website and our ability to provide our services to you.
    </p>

    <p class="privacy-policy">
      We reserve the right to make changes to our Cookies policy. Any changes we
      may make to our Cookies policy in the future will be posted on this page.
      Please check back frequently to see any updates or changes to our Cookies
      Policy. Your continued use of our website is taken as your agreement to
      any such changes.
    </p>

    <h2 class="privacy-policy">1. What are cookies?</h2>

    <p class="privacy-policy">
      Cookies are small computer files which are downloaded to your computer's
      hard drive when you visit a website. Your web browser then sends these
      cookies to our website or application on each subsequent visit. We and our
      3rd party service providers use both session and persistent cookies.
    </p>

    <ul>
      <li>
        Session cookies only last for the duration of your visit and are deleted
        when you leave the site.
      </li>

      <li>
        Persistent cookies remain on your device after you've left a site. They
        are then activated each time you visit the website. They are stored by
        the browser and remain valid until their expiry date (unless the user
        deletes them).
      </li>
    </ul>

    <p class="privacy-policy">
      We mainly use session cookies. For example, they help us to ensure the
      security of your session and can also keep you signed in to your Domun
      account while you move between pages.
    </p>

    <p class="privacy-policy">
      Amongst other things, the information we obtain about you through the use
      of cookies help us to:
    </p>

    <ul>
      <li>understand your browsing habits.</li>
      <li>
        understand the number of visitors so we can gather data about web
        traffic.
      </li>
      <li>monitor which pages you find useful and which you do not.</li>
      <li>to test new content and evaluate its effectiveness.</li>
      <li>
        to remember if you've been informed of our Cookies policy and Privacy
        policy and Terms and conditions before.
      </li>
      <li>
        to improve our website's usability and keep our services easy to use and
        up to date.
      </li>
    </ul>

    <h2 class="privacy-policy">2. Specific cookies we use</h2>

    <p class="privacy-policy">
      <i>
        Below is a full list of cookies that we use together with a description
        of what they are used for, and whether they are provided by us or a 3rd
        party provider. More information about 3rd party cookies can be found on
        the providers' website.
      </i>
    </p>
    <template>
      <v-flex>
        <v-data-table
          :headers="specificCookiesTableHeaders"
          :items="specificCookiesTableRows"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.cookie }}</td>
            <td class="text-xs-center">{{ props.item.cookieType }}</td>
            <td class="text-xs-center">{{ props.item.summary }}</td>
            <td class="text-xs-center">{{ props.item.persistentSession }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </template>

    <h2 class="privacy-policy">3. Managing your cookies</h2>

    <p class="privacy-policy">
      You can use your browser settings to accept or refuse cookies and delete
      existing cookies. If you have disabled cookies in your browser parts of
      our website may not function properly.
    </p>

    <p class="privacy-policy">
      If you have concerns based around the cookies we use, then we recommend
      you refuse or delete those cookies. If you wish to enable or disable
      cookies, please see the following pages:
    </p>

    <ul>
      <li>
        <a
          href="https://support.google.com/chrome/answer/95647?hl=en&p=cpn_cookies"
          >https://support.google.com/chrome/answer/95647?hl=en&amp;p=cpn_cookies</a
        >
      </li>
      <li>
        <a
          href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
          >https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences</a
        >
      </li>
      <li>
        <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
          >https://support.apple.com/en-gb/guide/safari/sfri11471/mac</a
        >
      </li>
    </ul>

    <h2 class="privacy-policy">4. Further information</h2>
    <p class="privacy-policy">
      If you require further information on cookies, visit
      <a href="http://www.aboutcookies.org">http;//www.aboutcookies.org</a>
      and/or
      <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org</a
      >.
    </p>

    <h2 class="privacy-policy">5. Contact us</h2>

    <p class="privacy-policy">
      Questions about our cookies or this Cookies policy are welcome at
      <a href="mailto:privacy@domun.co.uk">privacy@domun.co.uk</a>.
    </p>
  </div>
</template>

<style>
p.privacy-policy {
  margin-top: 15px;
}
h2.privacy-policy {
  margin-top: 15px;
}
td.privacy-policy {
  padding: 8px;
}
.v-datatable th {
  font-weight: 600 !important;
  color: #333 !important;
}
</style>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", false);
  },
  data() {
    return {
      shareWithTableHeaders: [
        {
          text: "Entity Name",
          align: "center",
          sortable: false,
          value: "entityname"
        },
        {
          text: "Activities",
          align: "center",
          sortable: false,
          value: "activities"
        }
      ],
      shareWithTableRows: [
        {
          entityname: "Digital Ocean",
          activities: "Cloud Service Provider"
        }
      ],
      specificCookiesTableHeaders: [
        {
          text: "Cookie",
          align: "center",
          sortable: false,
          value: "cookie"
        },
        {
          text: "Cookie type",
          align: "center",
          sortable: false,
          value: "cookieType"
        },
        {
          text: "Summary",
          align: "center",
          sortable: false,
          value: "summary"
        },
        {
          text: "Persistent / session",
          align: "center",
          sortable: false,
          value: "persistentSession"
        },
        {
          text: "Description",
          align: "center",
          sortable: false,
          value: "description"
        }
      ],
      specificCookiesTableRows: [
        {
          cookie: "3rd party provider",
          cookieType: "__utma",
          summary: "Google Analytics",
          persistentSession: "Persistent",
          description:
            "This cookie is part of Google Analytics and helps us improve your experience by anonymously tracking how users interact with our Site. It is specifically used to track the number of visits to our Site."
        }
      ]
    };
  },
  head: {
    title: {
      inner: "Privacy and Cookies Policy",
      separator: "|",
      complement: "Domun"
    },
    meta: [
      {
        name: "description",
        content:
          "Please read our Privacy and Cookies Policy carefully. You must not use our website or our services if you do not accept this Privacy and Cookie Policy or our Terms and Conditions. These policies set out our view and practices regarding your personal data and how we collect, process and treat it."
      },
      {
        name: "og:title",
        content: "Privacy and Cookies Policy | Domun"
      },
      {
        name: "twitter:title",
        content: "Privacy and Cookies Policy | Domun"
      },
      {
        name: "og:description",
        content:
          "Please read our Privacy and Cookies Policy carefully. You must not use our website or our services if you do not accept this Privacy and Cookie Policy or our Terms and Conditions. These policies set out our view and practices regarding your personal data and how we collect, process and treat it."
      },
      {
        name: "twitter:description",
        content:
          "Please read our Privacy and Cookies Policy carefully. You must not use our website or our services if you do not accept this Privacy and Cookie Policy or our Terms and Conditions. These policies set out our view and practices regarding your personal data and how we collect, process and treat it."
      }
    ]
  }
};
</script>
<style scoped lang="scss">
.about {
  background: #f5f5f5;
  text-align: left;
  padding: 80px;
  @media screen and (max-width: 600px) {
    padding: 80px 10px;
    font-size: 10px;
  }
}
</style>
