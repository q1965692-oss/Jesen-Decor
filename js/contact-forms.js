/* Shared contact forms: name + valid email required; message optional. Submit stays disabled until valid. */

(function () {
  var CONTACT_KEY = "jensen_contacts_v1";

  function contactGetAll() {
    var t = localStorage.getItem(CONTACT_KEY);
    if (!t) return [];
    try {
      return JSON.parse(t);
    } catch (e) {
      return [];
    }
  }

  function contactSaveAll(list) {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(list));
  }

  function isValidEmail(s) {
    if (!s || typeof s !== "string") return false;
    var t = s.trim();
    if (!t) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
  }

  function setEmailError(emailEl, show) {
    if (!emailEl) return;
    emailEl.classList.toggle("is-invalid", show);
  }

  function refreshSubmit(nameEl, emailEl, submitBtn) {
    var nameOk = nameEl.value.trim().length > 0;
    var emailOk = isValidEmail(emailEl.value);
    submitBtn.disabled = !(nameOk && emailOk);
    if (emailEl.value.trim() === "") {
      setEmailError(emailEl, false);
    }
  }

  function wireForm(opts) {
    var form = document.getElementById(opts.formId);
    if (!form) return;
    var nameEl = document.getElementById(opts.nameId);
    var emailEl = document.getElementById(opts.emailId);
    var msgEl = document.getElementById(opts.msgId);
    var submitBtn = document.getElementById(opts.submitId);
    if (!nameEl || !emailEl || !submitBtn) return;

    function onEmailBlur() {
      var v = emailEl.value.trim();
      if (v === "") {
        setEmailError(emailEl, false);
        return;
      }
      setEmailError(emailEl, !isValidEmail(v));
    }

    nameEl.addEventListener("input", function () {
      refreshSubmit(nameEl, emailEl, submitBtn);
    });
    emailEl.addEventListener("input", function () {
      refreshSubmit(nameEl, emailEl, submitBtn);
    });
    emailEl.addEventListener("blur", onEmailBlur);
    refreshSubmit(nameEl, emailEl, submitBtn);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!nameEl.value.trim() || !isValidEmail(emailEl.value)) {
        setEmailError(emailEl, emailEl.value.trim() !== "" && !isValidEmail(emailEl.value));
        return;
      }
      var list = contactGetAll();
      var entry = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        message: msgEl ? msgEl.value : "",
        date: new Date().toLocaleString(),
      };
      if (opts.pageTag) entry.page = opts.pageTag;
      list.push(entry);
      contactSaveAll(list);
      form.reset();
      setEmailError(emailEl, false);
      refreshSubmit(nameEl, emailEl, submitBtn);
      if (opts.modalId) {
        var modalEl = document.getElementById(opts.modalId);
        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
          window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireForm({
      formId: "homeContactForm",
      nameId: "homeName",
      emailId: "homeEmail",
      msgId: "homeMsg",
      submitId: "homeContactSubmit",
      pageTag: "index.html",
      modalId: "homeMsgSavedModal",
    });
    wireForm({
      formId: "contactForm",
      nameId: "cName",
      emailId: "cEmail",
      msgId: "cMsg",
      submitId: "contactSubmit",
      modalId: "msgSavedModal",
    });

    var btnGeo = document.getElementById("btnGeo");
    if (btnGeo) {
      btnGeo.addEventListener("click", function () {
        var out = document.getElementById("geoOut");
        if (!navigator.geolocation) {
          if (out) out.textContent = "Geolocation not supported.";
          return;
        }
        if (out) out.textContent = "Locating...";
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            if (out)
              out.textContent =
                "Lat: " + pos.coords.latitude.toFixed(4) + ", Lng: " + pos.coords.longitude.toFixed(4);
          },
          function () {
            if (out) out.textContent = "Could not read location (permission or error).";
          }
        );
      });
    }
  });
})();
