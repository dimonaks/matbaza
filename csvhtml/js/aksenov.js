


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






function loadJmol(input){
    var jqXHR = $.ajax({
        type: "POST",
        url: "/cgi-bin/write_xyz.py",
        async: false,
        data: { param: input }
    });

    return jqXHR.responseText;
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






function qs(key) {
  //decoding URL
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    // alert(window.location.href);
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    // alert(vars);
    return vars[key];
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
