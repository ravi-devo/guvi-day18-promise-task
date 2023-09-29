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
    name: "Lucifer series quotes",
    url: "https://lucifer-quotes.vercel.app/api/quotes/10"
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
    }else{
      luciferSeriesQuotes(jsonData);
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

function luciferSeriesQuotes(jsonData){
  const luciferQuotes = jsonData;
  // console.log(jsonData);
  
  for (const {
    "quote": quote,
    "author": author
  } of luciferQuotes) {
    const tableRow = document.createElement('div');
    tableRow.style.backgroundColor = "brown";
    tableRow.style.color = "white";
    tableRow.style.borderRadius = "10px";
    tableRow.style.boxShadow="5px 5px black";
    tableRow.style.padding = "1rem";
    tableRow.style.margin = "1rem";
    tableRow.innerHTML = `
      <p>${quote}</p>
      <p class="text-end">-${author}</p>
      `
      const classSelector = document.querySelector('.lucifer-quote');
      classSelector.appendChild(tableRow);
      
  }
  // const tagName = document.querySelector('.lucifer-quotes');
  // tagName.innerHTML = `
  // <h1 class="text-center" id="title">Lucifer Series Quotes</h1>
  // <p class="text-center" id="description">This api has the data has the quotes used on the Lucifer netflix series</p>
  // `;
}

