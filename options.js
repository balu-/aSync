//enable / disable inputelements in the valueArea
function changeForm(enable){
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
    changeForm(false);
  } else {
    console.log("disabled");
    changeForm(true);
  }
}


function restoreOptions() {

  document.querySelector("#isEnabled").addEventListener("change", enabledChanged);

  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      element.addEventListener("change", saveForm);
    });
  }

  //load values
  var ar = document.querySelectorAll("input");
  if(ar != null){
    ar.forEach(function(element) {
      console.log("ID:" + element.id);
      var promis = browser.storage.local.get("object_"+element.id);

      promis.then(function(settingObj){
        //got
        console.log("Got Settings " + JSON.stringify(settingObj));

        var fieldValue = settingObj['object_'+element.id];
        if(fieldValue != null){  

          if(element.type == "checkbox"){
            if(fieldValue){ // fieldValue = true
              element.checked = true;
            } 
          } else if(element.type == "text"){
            element.value = fieldValue;
          } 
            console.log("Loaded value " + fieldValue );
        }

        enabledChanged(); // refresh enabled status

      }, function(err) {
        // body...
        console.err("Could not get Setting " + element.id);
      });

    });
  }
}


document.addEventListener("DOMContentLoaded", restoreOptions);
//document.querySelector("form").addEventListener("submit", saveOptions);
