(function () {
  var params = new URLSearchParams(window.location.search);
  var tracked = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "utm_id",
    "fbclid",
    "gclid"
  ];

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view_lp_kaza_asset" });

  tracked.forEach(function (key) {
    var value = params.get(key) || sessionStorage.getItem(key) || "";
    if (value) {
      sessionStorage.setItem(key, value);
    }

    document.querySelectorAll('input[name="' + key + '"]').forEach(function (field) {
      field.value = value;
    });
  });

  document.querySelectorAll("[data-event]").forEach(function (element) {
    element.addEventListener("click", function () {
      window.dataLayer.push({
        event: "cta_click",
        cta_id: element.getAttribute("data-event")
      });
    });
  });

  var form = document.querySelector(".lead-form");
  var status = document.querySelector(".form-success");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var payload = {};

      formData.forEach(function (value, key) {
        payload[key] = value;
      });

      window.dataLayer.push({
        event: "lead_submit_attempt",
        lead_intent: "avaliacao_privada",
        empresa: payload.empresa || ""
      });

      if (status) {
        status.textContent = "Recebido. A equipe Kaza deve avaliar a aderencia inicial antes do contato.";
      }

      form.reset();
    });
  }
})();
