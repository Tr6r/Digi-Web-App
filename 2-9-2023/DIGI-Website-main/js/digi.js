const URL = "https://digi27.azurewebsites.net/api/healthies";
var replace_email;
var count;
var validate = true;
var Hour;
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxyxxx-4xxx-yxxxxxx'.replace(/[xy]/g, function(c) {
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
function printmsg()
{
    var date = new Date();
    var month =date.getFullYear()+ "-" +(date.getMonth()+1) +"-" +(date.getDate());
    var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    var UID = generateUUID();
    Hour_nose();
    checkValidate();
    searchByEmail();
    setTimeout(() => {
    
    if(validate)
    {
        var newHuman = {
            UID: UID,
            Email: replace_email,
            Nation: document.getElementById("optNation").value,
            Language:document.getElementById("optLanguage").value,
            Hour_nose: Hour,
            Pass: document.getElementById("txtPassword").value,
            UID_Main_Account: null,
            Is_Beneficiary_Account: null,
            Status: "chua kich hoat",
            Purchase_Date: "2023-2-8 15:1:07",
            Date:  month +" "+time,
            Users: [],
            User1: null
        }
        addNew(newHuman);
    }
}
      , 800);
};
function Hour_nose()
{
    if(document.getElementById("optNation").value === "Vietnam")
    {
        Hour = "7";
    }
    else if(document.getElementById("optNation").value === "Singapore")
    {
        Hour = "8";
    }else if(document.getElementById("optNation").value === "Korea")
    {
        Hour = "9";
    }else if(document.getElementById("optNation").value === "Hong Kong")
    {
        Hour = "8";
    }
    else if(document.getElementById("optNation").value === "Thailand")
    {
        Hour = "7";
    }
}
function checkValidate() {
    var emailID = document.getElementById("txtEmail").value;
        atpos = emailID.indexOf("@");
         dotpos = emailID.lastIndexOf(".");
        //  var keyword = document.getElementById("txtEmail").value;
        //  let checkEmail = searchByEmail();
         const usr_input = document.getElementById("captcha-form").value;
    setTimeout(() => {
        if(document.getElementById("txtEmail").value == "")
    {
        alert("chua nhap email");
        validate =  false;
    }
    else if (atpos < 1 || ( dotpos - atpos < 2 )) {
        alert("Please enter correct email ID")
        validate =  false;
     }
     else if(count == 1)
     {
        alert("email bi trung");
        validate =  false;
     }
    else if(document.getElementById("txtPassword").value == "")
    {
        alert("chua nhap pass");
        validate =  false;
    }
    else if(document.getElementById("txtConfirmPassword").value == "")
    {
        alert("chua nhap confrom pass");
        validate =  false;
    }
    else if(document.getElementById("txtPassword").value != document.getElementById("txtConfirmPassword").value)
    {
        alert("Sai confrom pass");
        validate =  false;
    }
    else if(usr_input != captcha.innerHTML)
    {
        validate =  false;
        alert("Sai capcha");
        generate();
        document.getElementById("captcha-form").value = '';
    }
    else
    {
        validate = true;
    }
      }, 800);
    
}
function addNew(newHuman) {
    axios.post(URL , newHuman).then((response) =>{
        var result = response.data;
        if(result){
            alert('Tạo thành công');
            generate();
            clearTextboxes();
            window.location.href = "../html/index.html ";
        }else
        {
            alert('SORRY BABY !');
        }   
    });
}
function clearTextboxes()
{
    document.getElementById("txtEmail").value = '';
    document.getElementById("txtPassword").value = '';
    document.getElementById("txtConfirmPassword").value = '';
    document.getElementById("captcha-form").value = '';
}
function searchByEmail() {
    replace_email = document.getElementById("txtEmail").value.replace('.',',');
    count = 0;
    axios.get(URL + "/SearchByEmail/"+replace_email).then((response) =>{
        var healthies = response.data;
        for(var human of healthies )
        {
            if(human.Email != null)
            {
                count = count + 1;
            }
        }
    });
}
