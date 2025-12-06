
document.addEventListener("DOMContentLoaded", function () {
  var prefixBox = document.querySelector(".inp-phone .prefix_box");
  var phoneInput = document.querySelector(".inp-phone input[type=\"text\"]");
  var passwordInput = null;
  var passwordInputs = document.querySelectorAll("input[type=\"password\"]");
  passwordInputs.forEach(function (inp) {
    if (!passwordInput) passwordInput = inp;
    var ph = inp.getAttribute("placeholder") || "";
    if (ph.toLowerCase().indexOf("8") !== -1 && ph.toLowerCase().indexOf("character") !== -1) {
      passwordInput = inp;
    }
  });

  var loginButton = null;
  var btButtons = document.querySelectorAll(".bt.flex-center, .bt.flex-align, .bt.flex-box");
  btButtons.forEach(function (btn) {
    if (!loginButton && btn.textContent && btn.textContent.trim() === "Log In") {
      loginButton = btn;
    }
  });

  if (!phoneInput || !passwordInput || !loginButton || !prefixBox) {
    return;
  }

  var countries = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Brazil", code: "+55" },
    { name: "Bulgaria", code: "+359" },
    { name: "Canada", code: "+1" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Costa Rica", code: "+506" },
    { name: "Croatia", code: "+385" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Dominican Republic", code: "+1-809" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Estonia", code: "+372" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Greece", code: "+30" },
    { name: "Guatemala", code: "+502" },
    { name: "Honduras", code: "+504" },
    { name: "Hong Kong", code: "+852" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kuwait", code: "+965" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Libya", code: "+218" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Malaysia", code: "+60" },
    { name: "Malta", code: "+356" },
    { name: "Mexico", code: "+52" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Montenegro", code: "+382" },
    { name: "Morocco", code: "+212" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "New Zealand", code: "+64" },
    { name: "Nigeria", code: "+234" },
    { name: "North Macedonia", code: "+389" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Panama", code: "+507" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Serbia", code: "+381" },
    { name: "Singapore", code: "+65" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Thailand", code: "+66" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Yemen", code: "+967" }
  ];

  var commonlyUsedNames = [
    "Slovenia",
    "Panama",
    "Syria",
    "Lebanon",
    "Cyprus",
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Jordan",
    "Iraq",
    "Turkey",
    "Egypt",
    "Morocco"
  ];

  var backdrop = document.createElement("div");
  backdrop.className = "custom-country-backdrop";
  backdrop.innerHTML = [
    '<div class="custom-country-sheet">',
    '  <div class="custom-country-header">',
    '    <div>Select area code</div>',
    '    <button type="button" class="custom-country-close">✕</button>',
    "  </div>",
    '  <div class="custom-country-search">',
    '    <input type="text" placeholder="Please search for the international dialing code" />',
    "  </div>",
    '  <ul class="custom-country-list"></ul>',
    "</div>"
  ].join("");
  document.body.appendChild(backdrop);

  var closeBtn = backdrop.querySelector(".custom-country-close");
  var searchInput = backdrop.querySelector(".custom-country-search input");
  var listEl = backdrop.querySelector(".custom-country-list");

  function openModal() {
    backdrop.classList.add("visible");
    searchInput.value = "";
    renderList("");
    searchInput.focus();
  }

  function closeModal() {
    backdrop.classList.remove("visible");
  }

  function renderList(filter) {
    var term = (filter || "").trim().toLowerCase();
    listEl.innerHTML = "";

    function addGroup(label, items) {
      if (!items.length) return;
      var groupLabel = document.createElement("li");
      groupLabel.className = "custom-country-group";
      groupLabel.textContent = label;
      listEl.appendChild(groupLabel);

      items.forEach(function (c) {
        if (term && !(c.name.toLowerCase().indexOf(term) !== -1 || c.code.indexOf(term) !== -1)) {
          return;
        }
        var li = document.createElement("li");
        li.className = "custom-country-item";

        var left = document.createElement("div");
        left.className = "custom-country-name";
        var flag = document.createElement("div");
        flag.className = "custom-country-flag";
        var nameSpan = document.createElement("span");
        nameSpan.textContent = c.name;
        left.appendChild(flag);
        left.appendChild(nameSpan);

        var right = document.createElement("div");
        var codeSpan = document.createElement("span");
        codeSpan.className = "custom-country-code";
        codeSpan.textContent = c.code;
        right.appendChild(codeSpan);

        li.appendChild(left);
        li.appendChild(right);

        li.addEventListener("click", function () {
          var textNode = null;
          for (var i = 0; i < prefixBox.childNodes.length; i++) {
            if (prefixBox.childNodes[i].nodeType === 3) {
              textNode = prefixBox.childNodes[i];
              break;
            }
          }
          if (textNode) {
            textNode.nodeValue = " " + c.code + " ";
          } else {
            prefixBox.textContent = " " + c.code + " ";
          }
          closeModal();
          validateForm();
        });

        listEl.appendChild(li);
      });
    }

    var common = countries.filter(function (c) {
      return commonlyUsedNames.indexOf(c.name) !== -1;
    });
    addGroup("Commonly used countries", common);
    addGroup("All countries", countries);
  }

  if (prefixBox) {
    prefixBox.style.cursor = "pointer";
    prefixBox.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) {
      closeModal();
    }
  });
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
  });
  searchInput.addEventListener("input", function () {
    renderList(searchInput.value);
  });

  function validateForm() {
    var phoneOk = phoneInput && phoneInput.value.trim().length > 0;
    var passOk = passwordInput && passwordInput.value.length >= 8;
    if (phoneOk && passOk) {
      loginButton.classList.remove("custom-login-disabled");
    } else {
      loginButton.classList.add("custom-login-disabled");
    }
  }

  phoneInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);
  validateForm();

  loginButton.style.cursor = "pointer";
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    var phoneOk = phoneInput && phoneInput.value.trim().length > 0;
    var passLen = passwordInput ? passwordInput.value.length : 0;
    var passOk = passLen >= 8;

    if (!phoneOk) {
      alert("Please enter your phone number.");
      return;
    }
    if (!passOk) {
      alert("Password must be at least 8 characters.");
      return;
    }
    window.location.href = "https://planko32.github.io/My%20Assets.html";
  });
});
