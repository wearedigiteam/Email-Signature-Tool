function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]})&#65279; ${match[2]}&#65279;-&#65279;${match[3]}`;
  }
  return phoneNumberString;
}

function formatTelAttr(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `tel:1-${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumberString;
}

window.addEventListener(
  "message",
  event => {
    // console.log(event.origin);

    if (event.data) {
      const data = JSON.parse(event.data);

      for (let field in data) {
        const el = document.querySelector(`.${field}`);

        if (el) {
          switch (field) {
            case "office":
              if (data[field] !== "" && data[field] !== "None") {
                el.innerHTML = data[field];
              } else {
                el.innerHTML = "";
              }
              break;

            case "corporate":
              if (data[field] === "Workplace awards") {
                el.innerHTML = workplaceAwards;
              } else if (data[field] === "Technical certifications") {
                el.innerHTML = technicalCertifications;
              } else {
                el.innerHTML = "";
              }
              break;

            case "linkedin":
              el.querySelector("a").setAttribute("href", data[field]);
              el.style.display = data[field].length ? "inline" : "none";
              break;

            case "email":
              el.setAttribute("href", `mailto:${data[field]}`);
              el.innerText = data[field];
              break;

            case "phone":
              const phoneVal = formatTelAttr(data[field]);
              const extensionVal = document
                .querySelector(".extension")
                ?.innerHTML.replace(/\D/g, "");

              el.setAttribute("href", phoneVal);

              if (extensionVal) {
                el.setAttribute(
                  "href",
                  `${el.getAttribute("href")},${extensionVal}`
                );
              }

              document.querySelector(
                ".phone-value"
              ).innerHTML = formatPhoneNumber(data[field]);
              break;

            case "extension":
              const extPhoneVal = document.querySelector(".phone");
              const extensionValue = data[field].replace(/\D/g, "");
              const phoneAndExtension = extPhoneVal
                .getAttribute("href")
                .split(",");

              // Create new or overwrite existing extension value
              phoneAndExtension[1] = extensionValue;
              extPhoneVal.setAttribute("href", phoneAndExtension.join(","));

              if (extensionValue) {
                el.innerHTML = `&#160;x${data[field].replace(/\D/g, "")}`;
              } else {
                el.innerHTML = "";
              }

              break;

            default:
              el.innerText = data[field];
          }

          // Show/hide custom messages field based on available content
          const cm = document.querySelector("#custom-messages");
          const cm_corp = document.querySelector("#custom-message_corporate");
          const cm_pers = document.querySelector("#custom-message_personal");

          if (cm_corp && cm_pers) {
            const cm_corp_val = cm_corp.querySelector(".corporate").innerHTML;
            const cm_pers_val = cm_pers.querySelector(".message").innerText;

            cm_corp.style.display = cm_corp_val.length ? "table-row" : "none";
            cm_pers.style.display = cm_pers_val.length ? "table-row" : "none";
            cm.style.borderTopColor =
              cm_corp_val.length || cm_pers_val.length
                ? "#B3B5B8"
                : "transparent";
          }
        }
      }
    }

    // Do we trust the sender of this message?  (might be
    // different from what we originally opened, for example).
    if (event.origin !== "http://example.com") return;

    // event.source is popup
    // event.data is "hi there yourself!  the secret response is: rheeeeet!"
  },
  false
);
