var settings;

//save form settings to local storage
function saveForm(){
  /* get values from dom*/
  var inputElement = document.querySelector("#settings_host");
  if(inputElement != null)
    settings.setHost(inputElement.value);
  var inputElement = document.querySelector("#settings_user");
  if(inputElement != null)
    settings.setUser(inputElement.value);
  var inputElement = document.querySelector("#settings_pw");
  if(inputElement != null)
    settings.setPw(inputElement.value);
}

function setupForm() {
  //append change Listener to all input fields
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      element.addEventListener("change", saveForm);
    });
  }

  //load stored values
  settings = new settingsClass();
  settings.loadSettings().then(function(res){
      console.log("settings loaded");
      console.log(settings);
      //set values to dom
      var inputElement = document.querySelector("#settings_host");
      if(inputElement != null)
        inputElement.value = settings.host;
      var inputElement = document.querySelector("#settings_user");
      if(inputElement != null)
        inputElement.value = settings.user;
      var inputElement = document.querySelector("#settings_pw");
      if(inputElement != null)
        inputElement.value = settings.pw;
      });
}

document.addEventListener("DOMContentLoaded", setupForm);
//document.querySelector("form").addEventListener("submit", saveOptions);
