
document.addEventListener("DOMContentLoaded", function () {
  // Find key elements in the original layout
  var prefixBox = document.querySelector(".inp-phone .prefix_box");
  var phoneInput = document.querySelector(".inp-phone input[type=\"text\"]");
  var passwordInput = null;
  var passwordInputs = document.querySelectorAll("input[type=\"password\"]");
  passwordInputs.forEach(function (inp) {
    if (inp.getAttribute("placeholder") && inp.getAttribute("placeholder").indexOf("8 characters") !== -1) {
      passwordInput = inp;
    }
  });
  if (!passwordInput && passwordInputs.length) {
    passwordInput = passwordInputs[0];
  }

  var loginButton = null;
  var btButtons = document.querySelectorAll(".bt.flex-center, .bt.flex-align");
  btButtons.forEach(function (btn) {
    if (btn.textContent && btn.textContent.trim() === "Log In") {
      loginButton = btn;
    }
  });

  if (!phoneInput || !passwordInput || !loginButton) {
    return;
  }

  // Build custom country modal
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

  var countries = [
    { name: "Slovenia", code: "+386" },
    { name: "Panama", code: "+507" },
    { name: "Syria", code: "+963" },
    { name: "Republic of Lebanon", code: "+961" },
    { name: "Cyprus", code: "+357" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "Qatar", code: "+974" },
    { name: "Kuwait", code: "+965" },
    { name: "Bahrain", code: "+973" },
    { name: "Jordan", code: "+962" },
    { name: "Iraq", code: "+964" },
    { name: "Turkey", code: "+90" },
    { name: "Egypt", code: "+20" },
    { name: "Morocco", code: "+212" },
    { name: "Algeria", code: "+213" },
    { name: "Tunisia", code: "+216" },
    { name: "Libya", code: "+218" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Spain", code: "+34" },
    { name: "Italy", code: "+39" },
    { name: "Canada", code: "+1" },
    { name: "Russia", code: "+7" },
    { name: "China", code: "+86" },
    { name: "Japan", code: "+81" },
    { name: "South Korea", code: "+82" },
    { name: "India", code: "+91" },
    { name: "Pakistan", code: "+92" },
    { name: "Afghanistan", code: "+93" }
  ];

  var commonlyUsedNames = [
    "Slovenia",
    "Panama",
    "Syria",
    "Republic of Lebanon",
    "Cyprus",
    "Saudi Arabia"
  ];

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
          // Update prefix box text only, keep original styles
          var txt = prefixBox ? prefixBox.childNodes[0] : null;
          if (txt && txt.nodeType === 3) {
            txt.nodeValue = " " + c.code + " ";
          } else if (prefixBox) {
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

  // Initial state
  validateForm();

  // Make login button behave
  loginButton.style.cursor = "pointer";
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    var phoneOk = phoneInput && phoneInput.value.trim().length > 0;
    var passOk = passwordInput && passwordInput.value.length >= 8;
    if (!phoneOk || !passOk) {
      return;
    }
    window.location.href = "https://planko32.github.io/My%20Assets.html";
  });
});
