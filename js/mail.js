(function () {
  emailjs.init("to9PlFrMMimgruuH0");
  // emailjs.init("BnRoAjGd5ec2E2VQn");
})();

// Get IP Address
async function getIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org");
    const ip = await response.text();
    console.log(`IP: ${ip}`);
    return ip;
  } catch (error) {
    console.log(error);
    return null; // or throw error if you want to handle it differently
  }
}

// Form Submit
const handleFormSubmit = async (
  formId,
  nameField,
  emailField,
  phoneField,
  privacyField
) => {
  const templateParams = {
    user_name: document.getElementById(nameField).value,
    user_email: document.getElementById(emailField).value,
    contact_number: document.getElementById(phoneField).value,
    privacy_check: document.getElementById(privacyField).value,
    ip_address: await getIpAddress(),

    // to_email: "harsh.autowebbed@gmail.com",
    to_email: "parksydedigitalmedia@gmail.com",
    company_name: "Platinum Parksyde",
  };

  window.Anarock.submitLead({
    api_key: "97548e3de8f0d07c", // get your api/auth key from support team
    env: "production",
    host: "anarock.com",
    channel_name: "LandingPage",
    campaign_id: "LP_Platinum_Parksyde",
    name: templateParams.user_name,
    email: templateParams.user_email,
    purpose: "buy",
    country_code: "in",
    phone: templateParams.contact_number, // valid 10-digits phone number
    source: "sms",
    subSource: "sms-december-campaign",
    onLeadSuccessCallback(leadID, data) {
      console.log("lead captured with ID:", leadID);
    },
    onLeadFailureCallback(errorMessage) {
      console.log(errorMessage);
    },
  });

  // Send Form
  emailjs.send("contact_service", "contact_form", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      // alert("Message Sent Final");
      document.getElementById(formId).reset();
      if (response.status === 200) {
        window.location.href = "thank-you.html";
      }
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Message Not Sent");
    }
  );
};

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      handleFormSubmit(
        "contact-form",
        "user_name",
        "user_email",
        "contact_number",
        "privacy_check"
      );
    });

  document
    .getElementById("contact-form-modal")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      handleFormSubmit(
        "contact-form-modal",
        "user_name_modal",
        "user_email_modal",
        "contact_number_modal",
        "privacy_check_modal"
      );
    });
};
