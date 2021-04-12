function resetForm()
{
  localStorage.clear();
  document.getElementById('empRegistration').reset();
}
function validateName(){
  var namePattern = /[A-Z][a-z]+/;
  var result = ($("#inputName").val()).match(namePattern);
  if(result)
  {
    return true;
  }
  return false;
}
function ajaxOperation(data,url,HTTPVerb){
  $.ajax({
    url: url,
    type: HTTPVerb,
    contentType: 'application/json; charset=utf-8',
    //dataType: 'json',
    crossDomain: true,
    dataType: 'json',
    // xhrFields: {
    //   withCredentials: true
    // },
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*"
    },
    data: JSON.stringify(data),
    success: function (result) {
        window.location.href = "dashboard.html";
        console.log(result);
    },
    error: function (xhr, status, error) {
        console.log(error);
    }
  });
}
function validate(data)
{
    dataValidated = true;
    if(!validateName())
    {
      $(function(){
        $("#inputName").addClass("invalidInput");
        $(".error").show();
      });
      dataValidated = false;
    }
    if(!data["profileImage"]){
      $(function(){
        $('input[name=Profile]').addClass("invalidInput");
      });
      dataValidated = false;
    }
    
    if(!data["gender"]){
      $(function(){
        $('input[name=Gender]').addClass("invalidInput");
      });
      dataValidated = false;
    }
    if(data["department"].length==0){
      $(function(){
        $('input[name=Dept]').addClass("invalidInput");
      });
      dataValidated = false;
    }
    if(!data["salary"])
    {
      $('#Salary').addClass("invalidInput");
      dataValidated = false;
    }
    if(!$('#Day').val())
    {
      $('#Day').addClass("invalidInput");
      dataValidated = false;
    }
    
    if(!$('#Month').val())
    {
      $('#Month').addClass("invalidInput");
      dataValidated = false;
    }
    
    if(!$('#Year').val())
    {
      $('#Year').addClass("invalidInput");
      dataValidated = false;
    }
    if(!data['notes'])
    {
      $('#txtAreaNotes').addClass("invalidInput");
      dataValidated = false;
    }
    return dataValidated;
  }
function addData()
{
  var profiles = document.getElementsByName('Profile');
  var profileName;
  for(var i = 0; i < profiles.length; i++){
      if(profiles[i].checked){
          profileName = profiles[i].value;
      }
  }
  var genderInfo = document.getElementsByName('Gender');
  var gender;
  for(var i = 0; i < genderInfo.length; i++){
      if(genderInfo[i].checked){
          gender = genderInfo[i].value;
      }
  }
  departments = [];
  departmentsChecked = document.getElementsByName('Dept');
  for (var i = 0; i < departmentsChecked.length; i++) {
    if (departmentsChecked[i].checked) {
      departments.push(departmentsChecked[i].value);
    }
  }
  salary = document.getElementById('Salary').value
  startDate = document.getElementById('Year').value+'-'+document.getElementById('Month').value+'-'+document.getElementById('Day').value
  startDate = new Date(startDate);
  let data = {
    "name":document.getElementById('inputName').value,
    "gender":gender,
    "salary":parseInt(salary),
    "notes":document.getElementById('txtAreaNotes').value,
    "profileImage":profileName,
    "startDate":startDate,
    "department":departments
  }
  
  dataValidated=validate(data);
  if(dataValidated)
  { 
    if(localStorage.getItem("id"))
    {
      data["id"]=parseInt(localStorage.getItem('id'));
      ajaxOperation(data,"https://localhost:44366/api/Employee/Update",'PUT');
      localStorage.clear();
    }
    else
    {
      ajaxOperation(data,"https://localhost:44366/api/Employee/Register",'POST');
    }
    return true;
  }
  return false;
}
function LoadLocalStorageData()
{
  $("#inputName").val(localStorage.getItem("name"));
  $("#"+localStorage.getItem("profileImage").replace(".png","")).prop("checked", true);
  const gender = localStorage.getItem("gender")==='m'?'male':'female';
  $('#'+gender).prop("checked",true);
  const departments = localStorage.getItem("department").split(',');
  departments.forEach(department => {
    $('#'+department).prop("checked",true);
  });
  $('#Salary').val(localStorage.getItem("salary"));
  const fulldate = localStorage.getItem("startDate");
  const onlyDate = fulldate.split('T')[0];
  const dateElements = onlyDate.split('-');
  $('#Day').val(dateElements[2]);
  $('#Month').val(dateElements[1]);
  $('#Year').val(dateElements[0]);
  $('#txtAreaNotes').val(localStorage.getItem("notes"));
}

function submitForm()
{ 
  addData();
  // success= addData();
  // if(success)
  // {
  // window.location.href = "dashboard.html";
  // }
}

$(function(){
  if(localStorage.getItem("id"))
  {
    LoadLocalStorageData();
  }
  $("#inputName").mouseleave(function(){
    if(validateName())
    {
    $("#inputName").removeClass("invalidInput");
    $(".error").hide();
    }
  });
  $("#Day").mouseleave(function(){
    if($('#Day').val())
    {
      $('#Day').removeClass("invalidInput");
    }
  });
  $("#Month").mouseleave(function(){
    if($('#Month').val())
    {
      $('#Month').removeClass("invalidInput");
    }
  });
  $("#Year").mouseleave(function(){
    if($('#Year').val())
    {
      $('#Year').removeClass("invalidInput");
    }
  });
  $("#Salary").mouseleave(function(){
    if($('#Salary').val())
    {
      $('#Salary').removeClass("invalidInput");
    }
  });
  $("#txtAreaNotes").mouseleave(function(){
    if($('#txtAreaNotes').val())
    {
      $('#txtAreaNotes').removeClass("invalidInput");
    }
  });
  $("input[name=Dept]").mouseleave(function(){
    if($('input[name=Dept]:checked').val())
    {
      $('input[name=Dept]').removeClass("invalidInput");
    }
  });
  $("input[name=Gender]").mouseleave(function(){
    if($('input[name=Gender]:checked').val())
    {
      $('input[name=Gender]').removeClass("invalidInput");
    }
  });
  $("input[name=Profile]").mouseleave(function(){
    if($('input[name=Profile]:checked').val())
    {
      $('input[name=Profile]').removeClass("invalidInput");
    }
  });
});
