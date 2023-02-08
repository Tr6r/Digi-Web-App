// const { text } = require("express");

const URL = "https://digi27.azurewebsites.net/api/healthies";

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxx-xxx-4xxx-yxxx-xx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function btnSignup_Click()
{
    let validate = checkValidate();
    if(validate)
    {
        var date = new Date();
        var month =date.getFullYear()+ "-" +(date.getMonth()+1) +"-" +(date.getDate());
        var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        var UID = generateUUID();
        var id = UID;
        var test1 = "0";
        var test2 = "n";
        var test3 = "da kich hoat" ;
        var newHuman = {
            UID: id,
            Name: document.getElementById("txtName").value,
            Email: document.getElementById("txtEmail").value,
            Pass: document.getElementById("txtPassword").value,
            Phone:document.getElementById("txtPhone").value,
            Number_Of_Beneficiary_Account: test1,
            UID_Beneficiary_Account: test1,
            Is_Beneficiary_Account: test2,
            Status: test3,
            Date: "2001-12-05T00:00:00",//month+time,
            Is_Admin: test2     
        }
        alert(generateUUID());
        addNew(newHuman);
        
    }
    else
    {
        alert("hehe");
    }

};

function checkValidate() {
    var emailID = document.getElementById("txtEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
         var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
         var phoneno_check = document.getElementById("txtPhone").value;
        // var nameno = /^[A-Za-z\s]+$/;
        var nameno_check = document.getElementById("txtName").value;

    if(document.getElementById("txtName").value == "") {
        alert("chua nhap ten");
        return false;
    }
    //else if(!nameno.test(nameno_check))
    // {
    //     alert("nhap sai dinh dang ten");
    //     return false;
    // }
    else if(document.getElementById("txtPhone").value == "")
    {
        alert("chua nhap ddt");
        return false;
    }
    else if(!phoneno.test(phoneno_check))
        {
            alert("nhap sai dinh dang ddt");
            return false;
        }
    else if(document.getElementById("txtEmail").value == "")
    {
        alert("chua nhap email");
        return false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        alert("Please enter correct email ID")
        return false;
     }
    else if(document.getElementById("txtPassword").value == "")
    {
        alert("chua nhap pass");
        return false;
    }
    else if(document.getElementById("txtConfirmPassword").value == "")
    {
        alert("chua nhap confrom pass");
        return false;
    }
    else if(document.getElementById("txtPassword").value != document.getElementById("txtConfirmPassword").value)
    {
        alert("Sai confrom pass");
        return false;
    }
    else return true;
}


function addNew(newHuman) {
    axios.post(URL , newHuman).then((response) =>{
        var result = response.data;
        if(result){
            alert('thnahfcopn');
        }else
        {
            alert('SORRY BABY !');
        }   
    });
}