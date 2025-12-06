
document.addEventListener("DOMContentLoaded", function () {
  var countryButton = document.getElementById("countryButton");
  var countryLabel = document.getElementById("countryLabel");
  var modalBackdrop = document.getElementById("countryModal");
  var modalClose = document.getElementById("modalClose");
  var searchInput = document.getElementById("countrySearch");
  var countryList = document.getElementById("countryList");
  var phoneInput = document.getElementById("phoneInput");
  var passwordInput = document.getElementById("passwordInput");
  var loginButton = document.getElementById("loginButton");
  var rememberBox = document.getElementById("rememberBox");
  var rememberCheckbox = document.getElementById("rememberCheckbox");
  var eyeToggle = document.getElementById("eyeToggle");

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

  function openModal() {
    modalBackdrop.classList.add("visible");
    searchInput.value = "";
    renderCountryList("");
    searchInput.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("visible");
  }

  function renderCountryList(filter) {
    var term = filter.trim().toLowerCase();
    countryList.innerHTML = "";

    var commonlyUsed = ["Slovenia", "Panama", "Syria", "Republic of Lebanon", "Cyprus", "Saudi Arabia"];
    var commonItems = countries.filter(function (c) { return commonlyUsed.indexOf(c.name) !== -1; });
    var allItems = countries;

    function addGroup(label, items) {
      if (!items.length) return;
      var groupLabel = document.createElement("div");
      groupLabel.className = "country-group-label";
      groupLabel.textContent = label;
      countryList.appendChild(groupLabel);

      items.forEach(function (c) {
        if (term && !(c.name.toLowerCase().includes(term) || c.code.indexOf(term) !== -1)) {
          return;
        }
        var li = document.createElement("div");
        li.className = "country-item";
        li.dataset.code = c.code;
        li.dataset.name = c.name;

        var left = document.createElement("div");
        left.className = "country-name";
        var flag = document.createElement("div");
        flag.className = "country-flag";
        var nameSpan = document.createElement("span");
        nameSpan.textContent = c.name;
        left.appendChild(flag);
        left.appendChild(nameSpan);

        var right = document.createElement("div");
        var codeSpan = document.createElement("span");
        codeSpan.className = "country-code";
        codeSpan.textContent = c.code;
        right.appendChild(codeSpan);

        li.appendChild(left);
        li.appendChild(right);

        li.addEventListener("click", function () {
          countryLabel.textContent = c.code;
          closeModal();
          validateForm();
        });

        countryList.appendChild(li);
      });
    }

    addGroup("Commonly used countries", commonItems);
    addGroup("All countries", allItems);
  }

  function validateForm() {
    var phoneValid = phoneInput.value.trim().length > 0;
    var passwordValid = passwordInput.value.length >= 8;
    if (phoneValid && passwordValid) {
      loginButton.disabled = false;
      loginButton.classList.remove("disabled");
    } else {
      loginButton.disabled = true;
      loginButton.classList.add("disabled");
    }
  }

  function toggleRemember() {
    var checked = rememberBox.classList.toggle("checkbox-checked");
    if (checked) {
      rememberCheckbox.textContent = "✓";
    } else {
      rememberCheckbox.textContent = "";
    }
  }

  function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeToggle.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      eyeToggle.textContent = "👁";
    }
  }

  if (countryButton) {
    countryButton.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderCountryList(searchInput.value);
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", validateForm);
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", validateForm);
  }

  if (rememberBox) {
    rememberBox.addEventListener("click", function (e) {
      e.preventDefault();
      toggleRemember();
    });
  }

  if (eyeToggle) {
    eyeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      togglePasswordVisibility();
    });
  }

  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginButton.disabled) {
        return;
      }
      window.location.href = "https://planko32.github.io/My%20Assets.html";
    });
  }

  renderCountryList("");
  validateForm();
});
