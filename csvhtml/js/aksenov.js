


function runJmol(input){

var Info = {
  color: "#FFFFFF",
  height: 300,
  width: 300,
  script: "load $caffeine",
  use: "HTML5",
  j2sPath: "j2s",
  serverURL: "php/jsmol.php"
};

return Jmol.getApplet("myJmol", Info);
;
}




function runPyScript(input){
    var jqXHR = $.ajax({
        type: "POST",
        url: "/cgi-bin/read_calculation.py",
        async: false,
        data: { param: input }
    });

    return jqXHR.responseText;
}




















function postData(input) {
    $.ajax({
        // type: "GET",
        url: "./python_script2.py",
        data: { param: input },
        success: callbackFunc
    });
}



function callbackFunc(response) {
    // do something with the response
    console.log(response);
}
