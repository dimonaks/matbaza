/*
NAME
    aksenov.js

SYNOPSIS


DESCRIPTION

Small functions interfacing JS and python scrips

REQUIRE
        JSmol, python scripts write_xyz.py, read_calculation.py in cgi-bin folder 

AUTHOR
        Aksyonov Dmitry, Skoltech, Moscow
*/


function runJmol(input){
//Show web-applet of JSmol
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
    //Run python script write_xyz.py
    var jqXHR = $.ajax({
        type: "POST",
        url: "/cgi-bin/write_xyz.py",
        async: false,
        data: { param: input }
    });

    return jqXHR.responseText;
}



function runPyScript(input){
    //Run python script read_calculation.py
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
    //Some test function 
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
