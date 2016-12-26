function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    ip: document.querySelector("#ip").value
  });
}


//enable / disable inputelements in the valueArea
function changeForm(enable){
  var ar = document.querySelectorAll("#valueArea input");
  if(ar != null){
    ar.forEach(function(element) {
      element.disabled=enable;
    });
  }
}

function enabledChanged(e) {
  if(document.querySelector("#isEnabled").checked){
    console.log("enabled");
    changeForm(false);
  } else {
    console.log("disabled");
    changeForm(true);
  }
}


function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#ip").value = result.color || "0.0.0.0";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  //var getting = browser.storage.local.get("ip");
  //getting.then(setCurrentChoice, onError);

  document.querySelector("#isEnabled").addEventListener("change", enabledChanged);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
