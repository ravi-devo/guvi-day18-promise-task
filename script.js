const endpointsArray = [
  {
    name: "F1 formula racing",
    url: "https://ergast.com/api/f1/drivers.json?"
  },
  {
    name: "Indian mutual funds",
    url: "https://api.mfapi.in/mf"
  },
  {
    name: "",
    url: ""
  }
];

for (let i = 0; i < endpointsArray.length; i++) {
  fetchData(endpointsArray[i].name, endpointsArray[i].url);
}

async function fetchData(name, url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if (name == "F1 formula racing") {
      f1FormulaRacing(jsonData);
    } else if (name == "Indian mutual funds") {
      indianMutualFundDetails(jsonData);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

function f1FormulaRacing(jsonData) {
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

function indianMutualFundDetails(jsonData) {
  const mutualFundDetails = jsonData;
  let counter = 1;
  for (const {
    "schemeCode": schemeCode,
    "schemeName": schemeName
  } of mutualFundDetails) {
    if(counter <= 30){
      const tableRow = document.createElement('div');
      tableRow.innerHTML = `
      <table class="table table-bordered table-dark w-50">
      <thead><th>Scheme Code</th><th>Scheme Name</th></thead>
      <tbody><tr><td>${schemeCode}</td><td>${schemeName}</td>
      </table>
      `
      const classSelector = document.querySelector('.indian-mutualFunds');
      classSelector.appendChild(tableRow);
      counter++;
    }else{
      break;
    }
  }
}

