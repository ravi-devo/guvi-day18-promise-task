const endpointsArray = [
  {
    name: "F1 formula racing",
    url: "https://ergast.com/api/f1/drivers.json?"
  },
  {
    name: "",
    url: ""
  },
  {
    name: "",
    url: ""
  }
];

for(let i = 0; i < endpointsArray.length; i++){
  fetchData(endpointsArray[i].name, endpointsArray[i].url);
}

async function fetchData(name, url){
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if(name == "F1 formula racing"){
      f1FormulaRacing(jsonData);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

function f1FormulaRacing(jsonData){
  const f1Drivers = jsonData.MRData.DriverTable.Drivers;
  let counter = 1;
  for (const {
          "url": biographyURL,
          "givenName": name,
          "familyName": lastName,
          "dateOfBirth": dOB,
          "nationality": nationality
        }
          of f1Drivers) {
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = `
          <td>${counter}</td>
          <td>${name}</td>
          <td>${lastName}</td>
          <td>${dOB}</td>
          <td>${nationality}</td>
          <td><a href="${biographyURL}" target="_blank">${name}'s biography</a></td>
          `;
          const classSelector = document.querySelector('.data-flow');
          classSelector.appendChild(tableRow);
          counter++;
        }
}