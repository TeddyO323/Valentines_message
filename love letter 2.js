$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var btn_save = $("#saveMessage");
  var generatedLink = $("#generatedLink");

  envelope.click(function () {
      open();
  });
  btn_open.click(function () {
      open();
  });
  btn_reset.click(function () {
      close();
  });

  btn_save.click(function () {
      var userName = $("#userName").val() || "Secret Admirer";
      var crushName = $("#crushName").val() || "Crush";
      var message = $("#message").val();

      // Update the letter content
      $("#toCrush").text(crushName);
      $("#dearCrush").text(crushName);
      $("#messageContent").text(message);

      // Encode the message data into a URL-friendly format
      var data = {
          user: userName,
          crush: crushName,
          msg: message
      };
      var encodedData = btoa(JSON.stringify(data)); // Base64 encode the data
      var link = window.location.href.split("?")[0] + "?data=" + encodedData;

      // Display the generated link
      generatedLink.html(`<a href="${link}" target="_blank">${link}</a>`);
  });

  // Check if the URL contains message data
  var urlParams = new URLSearchParams(window.location.search);
  var encodedData = urlParams.get('data');
  if (encodedData) {
      try {
          var data = JSON.parse(atob(encodedData)); // Decode the data
          $("#toCrush").text(data.crush);
          $("#dearCrush").text(data.crush);
          $("#messageContent").text(data.msg);
          open();
      } catch (e) {
          console.error("Invalid message data in URL.");
      }
  }

  function open() {
      envelope.addClass("open").removeClass("close");
  }
  function close() {
      envelope.addClass("close").removeClass("open");
  }
});