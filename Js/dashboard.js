function filterDepartments(dataRow)
{
  return dataRow.Department.includes($("#search").val());
}


// function filterDepartments(data)
// {
//   filteredData = []
//   for (let index = 0; index < data.length; index++) {
//     const dataRow = data[index];
//     if(dataRow["Department"].includes($("#search").val()))
//     {
//       filteredData.push(dataRow);
//     }
//   }
//   return filteredData;
// }
function getHTMLForDepartments(dataRow)
{
  const allDepartments = dataRow["department"];
  let htmlForDepartments = "";
  allDepartments.forEach(element => {
    htmlForDepartments += "<span class='Department'>"+element+"</span>"
  });
  return htmlForDepartments;
}


function loadTableAfterSearch(data)
{
  console.log($("#search").val());
  filteredData = data?.filter(filterDepartments);
  //filteredData = filterDepartments(data);
  console.log(filteredData);
  //loadTable(filteredData);
}
function searchDepartment()
{
  ajaxOperation("https://localhost:44366/api/Employee",'GET',loadTableAfterSearch);
}
function getDate(dateString)
{
  const date = dateString.split('T')[0];
  let monthNames =["Jan","Feb","Mar","Apr",
  "May","Jun","Jul","Aug",
  "Sep", "Oct","Nov","Dec"];
  const dateComponents = date.split('-')
  let day = dateComponents[2];
  let monthIndex = dateComponents[1];
  let monthName = monthNames[parseInt(monthIndex)-1];
  let year = dateComponents[0];
  return `${day} ${monthName} ${year}`; 
}
function loadTable(data)
{
  const tableDashboard = document.getElementById('dashboardTable1');
  for (let index = 0; index < data?.length; index++) {
     const dataRow = data[index];
     let dashboardTableBodyRow = document.createElement('tr')
     let name = document.createElement('td')
     name.innerText = dataRow["name"]
     let gender = document.createElement('td')
     gender.innerText = dataRow["gender"]=='m'?'Male':'Female'
     let salary = document.createElement('td')
     salary.innerHTML = '&#8377; ' + dataRow["salary"]
     let profileImage = document.createElement('td')
     profileImage.innerHTML = '<img src="../Assets/'+dataRow["profileImage"].replace(".jpg",".png")+'" width="45px" height="45px"></img>' 
     let startDate = document.createElement('td')
     startDate.innerText = getDate(dataRow["startDate"]);
     let department = document.createElement('td')
     department.innerHTML = getHTMLForDepartments(dataRow);
     let hiddenInput = document.createElement('input');
     
     let actions = document.createElement('td')
     actions.innerHTML = `<i class="material-icons icon" onclick="deleteRow(${dataRow["id"]})">delete</i><i class="material-icons icon" onclick='saveToLocalStorage(${JSON.stringify(dataRow)})'>edit</i>`
     
     dashboardTableBodyRow.append(profileImage,name,gender,department,salary,startDate,actions) 
     tableDashboard.append(dashboardTableBodyRow)
  }
}
function onPageLoad()
{
 ajaxOperation("https://localhost:44366/api/Employee",'GET',loadTable);
}
function ajaxOperation(url,HTTPVerb,callback)
{
  $.ajax({
    url: url,
    type: HTTPVerb,
    contentType: 'application/json; charset=utf-8',
    crossDomain: true,
    dataType: 'json',
    // xhrFields: {
    //   withCredentials: true
    // },
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin":"*"
     },
     success: function(result){
       if(HTTPVerb==='DELETE')
       {
          window.location.reload();
       }
     callback(result['data']);
     },
    error: function (xhr, status, error) {
        console.log(error);
    }
  });
}
function deleteRow(x)
{
  ajaxOperation("https://localhost:44366/api/Employee/Delete/"+x,'DELETE',loadTable);
}
onPageLoad()
function saveToLocalStorage(dataRow)
{
  localStorage.setItem("name",dataRow.name);
  localStorage.setItem("gender",dataRow.gender);
  localStorage.setItem("salary",dataRow.salary);
  localStorage.setItem("profileImage",dataRow.profileImage);
  localStorage.setItem("startDate",dataRow.startDate);
  localStorage.setItem("department",dataRow.department);
  localStorage.setItem("notes",dataRow.notes)
  localStorage.setItem("id",dataRow.id);
  window.location.href="addemp.html";
}
$(function(){
  $('#search').on('input',function(e){
    console.log($("#search").val());
    searchDepartment(); 
});
});