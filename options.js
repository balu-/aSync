//enable / disable inputelements in the valueArea
function enableDisableInputElements(enable){
  var ar = document.querySelectorAll("#valueArea input");
  if(ar != null){
    ar.forEach(function(element) {
      element.disabled=enable;
    });
  }
}

//save form settings to local storage
function saveForm(){
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      var stObj = {};
      
        if(element.type == "checkbox"){
           stObj["object_"+element.id] = element.checked;
        } else if(element.type == "text"){
          stObj["object_"+element.id] = element.value;
        } 
        console.log("Save: " + element.id +" - Value - " +  stObj["object_"+element.id]);
        browser.storage.local.set(stObj);
      
    });
  }
}

function enabledChanged() {
  if(document.querySelector("#isEnabled").checked){
    console.log("enabled");
    enableDisableInputElements(false);
  } else {
    console.log("disabled");
    enableDisableInputElements(true);
  }
}

function setupForm() {
  //add listener to enable disable input fields
  document.querySelector("#isEnabled").addEventListener("change", enabledChanged);

  //append change Listener to all input fields
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      element.addEventListener("change", saveForm);
    });
  }

  //load stored values
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      //get storage values
      var promis = browser.storage.local.get("object_"+element.id);
      promis.then(function(settingObj){ //got setting
        console.log("Got Settings " + JSON.stringify(settingObj));
        var fieldValue = settingObj['object_'+element.id]; //extract setting value
        if(fieldValue != null){ 
          //set value (corresponding to input type)
          if(element.type == "checkbox"){
              element.checked = fieldValue;
          } else if(element.type == "text"){
            element.value = fieldValue;
          } 
        }
        enabledChanged(); // refresh enabled status
      }, function(err) {
        // body...
        console.err("Could not get Setting " + element.id);
      });

    });
  }
}

document.addEventListener("DOMContentLoaded", setupForm);
//document.querySelector("form").addEventListener("submit", saveOptions);
