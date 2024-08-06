document.addEventListener("DOMContentLoaded", () => {
  // this method is used to run after DomContentloaded(html loaded) it is not necessary if we write
  // <script src="index.js"></script> at bottom of the body
  console.log("scripts.js is loaded and running");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(event);
      const chatId = button.dataset.chatId;

      const confirmation = confirm(
        "Are you sure you want to delete this chat?"
      );
      if (confirmation) {
        const form = document.createElement("form");
        form.method = "post";
        form.action = `/chats/${chatId}?_method=DELETE`;

        document.body.appendChild(form);
        form.submit();
      }
    });
  });
});
