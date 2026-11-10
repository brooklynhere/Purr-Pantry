document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form[directusform]");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formAction = form.getAttribute("action") || "/thank-you/";
      window.location.href = formAction;
    });
  });
});