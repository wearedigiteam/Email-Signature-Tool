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

            case "linkedin":
              el.querySelector("a").setAttribute("href", data[field]);
              el.style.display = data[field].length ? "inline" : "none";
              break;
              
            case "slogan":
              const sloganText = el.querySelector(".slogan-text");
              const sloganIcon = el.querySelector(".slogan-icon");
              
              switch (data[field]) {
                case "be-good":
                sloganText.innerHTML = "Be good.<br>Let others call you great.";
                sloganIcon.setAttribute("src", "https://uploads-ssl.webflow.com/5e8354b8b1c03c868cc5b417/63f92ec7c0c30973b36bf3d0_chevron_100x100.gif");
                break;
                
                case "more-heart":
                sloganText.innerHTML = "More heart.<br>Less ego.";
                sloganIcon.setAttribute("src", "https://uploads-ssl.webflow.com/5e8354b8b1c03c868cc5b417/63f92ed8536875536224d98e_Semicircle_100x100.gif");
                break;
                
                case "work-hard":
                sloganText.innerHTML = "Work hard.<br>Play nice.";
                sloganIcon.setAttribute("src", "https://uploads-ssl.webflow.com/5e8354b8b1c03c868cc5b417/63f92ed4ac3352132bfbfb68_Square_100x100.gif");
                break;
                
                case "fr-more-heart":
                sloganText.innerHTML = "Moins d'égos,<br>plus d'égaux.";
                sloganIcon.setAttribute("src", "https://uploads-ssl.webflow.com/5e8354b8b1c03c868cc5b417/63f92ed8536875536224d98e_Semicircle_100x100.gif");
                break;
                
                case "fr-work-hard":
                sloganText.innerHTML = "Le karma,<br>ça forge aussi la carrière.";
                sloganIcon.setAttribute("src", "https://uploads-ssl.webflow.com/5e8354b8b1c03c868cc5b417/63f92ed4ac3352132bfbfb68_Square_100x100.gif");
                break;
              }
              
              break;

            case "email":
              el.setAttribute("href", `mailto:${data[field]}`);
              el.innerText = data[field];
              break;

            case "phone":
            case "phone-alternate":
              const phoneVal = formatTelAttr(data[field]);

              el.setAttribute("href", phoneVal);

              document.querySelector(
                ".phone-value"
              ).innerHTML = formatPhoneNumber(data[field]);
              break;

            default:
              el.innerText = data[field];
          }
        }
      }
    }
  },
  false
);
