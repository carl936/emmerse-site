(() => {
  const form = document.getElementById("quoteForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  const preset = new URLSearchParams(window.location.search).get("service");
  const serviceSelect = form.elements.namedItem("service");
  if (preset && serviceSelect instanceof HTMLSelectElement) {
    const match = Array.from(serviceSelect.options).find(option => option.value.toLowerCase() === preset.toLowerCase());
    if (match) serviceSelect.value = match.value;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const suburb = String(data.get("suburb") || "").trim();
    const service = String(data.get("service") || "Electrical work").trim();
    const description = String(data.get("description") || "").trim();
    const subject = `Free quote request: ${service}${suburb ? ` - ${suburb}` : ""}`;
    const body = [
      "Hi Jack,",
      "",
      "I would like to request a free quote.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Suburb: ${suburb}`,
      `Service: ${service}`,
      "",
      "Job details:",
      description,
      "",
      "Thanks"
    ].join("\n");

    if (status) status.textContent = "Opening your email app with the quote details filled in.";
    window.location.href = `mailto:jack@emmerse.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
