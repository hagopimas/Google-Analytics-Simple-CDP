<script>
  (function () {
  
      function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      var domain = 
      document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.example.com;path=/"; 
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    // searches all input elements on the page with an id that starts with "_guid_" and writes the provided value
    function populateFormFields(value) {

      var inputs = document.getElementsByTagName("input"), item;
      for (var i = 0, len = inputs.length; i < len; i++) { 
        item = inputs[i];
        if (item.name && item.name.indexOf("ruid") == 0) {
          for (var j = 0, len = document.getElementsByName(item.name).length; j < len; j++ ){
            document.getElementsByName(item.name)[j].value = value;
          }
        }
      }
    }
    // if cookie "ruid" does not exist, generate and write
    if (!getCookie("ruid") || getCookie("ruid") == "") {
      var ruidCookie = "";
      var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var length = 10;
      for (var i = length; i > 0; --i) ruidCookie += chars[Math.floor(Math.random() * chars.length)];
      // set "ruid" cookie with our alpha-numeric value. expires in 182 days, or ~6 months
      setCookie("ruid", ruidCookie, 182);
      // set the "ruid" cookie value to the form field upon initial creation. this is an edge case for when a user first lands on the page
      populateFormFields(ruidCookie);
    } else if (getCookie("ruid")) {
      // set the "ruid" cookie value to the form field.
      populateFormFields(getCookie("ruid"));
    }

  })();
</script>