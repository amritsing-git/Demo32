document.addEventListener("DOMContentLoaded", function () {

  // ==========================
  // MOBILE NAVIGATION
  // ==========================

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {

    toggle.addEventListener("click", function () {

      const isOpen = nav.classList.toggle("open");

      toggle.classList.toggle("active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    });

    nav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        nav.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");

      });

    });

    document.addEventListener("click", function (event) {

      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {

        nav.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");

      }

    });

  }


  // ==========================
  // CUSTOM BOX BUILDER
  // ==========================

  const sizeInputs = document.querySelectorAll('input[name="boxSize"]');
  const chocolateInputs = document.querySelectorAll('input[name="chocolate"]');
  const extraInputs = document.querySelectorAll('input[name="extra"]');

  const summarySize = document.getElementById("summarySize");
  const summaryChocolate = document.getElementById("summaryChocolate");
  const summaryExtras = document.getElementById("summaryExtras");

  const note = document.getElementById("customNote");
  const sendButton = document.getElementById("sendCustomOrder");


  function getCheckedValues(inputs) {

    return Array.from(inputs)
      .filter(function (input) {
        return input.checked;
      })
      .map(function (input) {
        return input.value;
      });

  }


  function updateSummary() {

    if (!summarySize) return;

    const selectedSize = document.querySelector('input[name="boxSize"]:checked');

    summarySize.textContent = selectedSize
      ? selectedSize.value
      : "À choisir";


    const chocolates = getCheckedValues(chocolateInputs);

    summaryChocolate.textContent = chocolates.length
      ? chocolates.join(", ")
      : "À choisir";


    const extras = getCheckedValues(extraInputs);

    summaryExtras.textContent = extras.length
      ? extras.join(", ")
      : "Aucun";

  }


  sizeInputs.forEach(function (input) {
    input.addEventListener("change", updateSummary);
  });


  chocolateInputs.forEach(function (input) {
    input.addEventListener("change", updateSummary);
  });


  extraInputs.forEach(function (input) {
    input.addEventListener("change", updateSummary);
  });


  if (sendButton) {

    sendButton.addEventListener("click", async function () {

      const selectedSize = document.querySelector('input[name="boxSize"]:checked');

      const chocolates = getCheckedValues(chocolateInputs);
      const extras = getCheckedValues(extraInputs);

      const customMessage = note ? note.value.trim() : "";

      const request = 
`Bonjour Boîte à Fraises ! 🍓

J'aimerais discuter de la personnalisation de ma boîte.

Format : ${selectedSize ? selectedSize.value : "Non choisi"}

Chocolats : ${chocolates.length ? chocolates.join(", ") : "Non choisis"}

Extras : ${extras.length ? extras.join(", ") : "Aucun"}

Mon idée :
${customMessage || "Pas de note supplémentaire"}

Pourriez-vous me confirmer le prix et la disponibilité ? Merci ♡`;


      try {

        await navigator.clipboard.writeText(request);

        alert(
          "Votre demande a été copiée ! 🍓 " +
          "Collez-la dans votre conversation Instagram avec Boîte à Fraises."
        );

      } catch (error) {

        window.prompt(
          "Copiez votre demande et envoyez-la sur Instagram :",
          request
        );

      }

      window.open(
        "https://www.instagram.com/boiteafraises/",
        "_blank"
      );

    });

  }


  updateSummary();

});