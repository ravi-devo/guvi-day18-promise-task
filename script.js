const f1Heading = document.querySelector('.f1-formula-heading');
const f1Data = document.querySelector('.f1-formula-data');
const mutualFundHeading = document.querySelector('.mutualFund-heading');
const mutualFundData = document.querySelector('.mutualFund-data');
const luciferHeading = document.querySelector('.lucifer-heading');
const luciferData = document.querySelector('.lucifer-data');

//Array with name of the API and endpoint.
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

function callFetch(endpointsArrayIndex) {
  const index = endpointsArrayIndex;
  fetchData(endpointsArray[index].name, endpointsArray[index].url);
}

//Here we are fetching the data from the api and sending the response to each function based on the name.
async function fetchData(name, url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if (name == "F1 formula racing") {
      f1FormulaRacing(jsonData);
    } else if (name == "Indian mutual funds") {
      indianMutualFundDetails(jsonData);
    } else {
      luciferSeriesQuotes(jsonData);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

//The function gets the F1 formula racing json data and displaying it using DOM
function f1FormulaRacing(jsonData) {
  resetLuciferInfo();
  resetMutualFundInfo();
  const f1Drivers = jsonData.MRData.DriverTable.Drivers;
  let counter = 1;
  f1Heading.innerHTML = `
  <h1 class="text-center" id="title">F1 Formula racing driver details</h1>
  <p class="text-center" id="description">The details fetched from one of the public API using fetch.</p>
  `;
  for (const {
    "url": biographyURL,
    "givenName": name,
    "familyName": lastName,
    "dateOfBirth": dOB,
    "nationality": nationality
  }
    of f1Drivers) {
    if (counter <= 10) {
      const tableRow = document.createElement('div');
      tableRow.innerHTML = `<table class="table table-bordered table-light"><thead><th>Id</th><th>Name</th><th>Family Name</th><th>DOB</th><th>Nationality</th><th>Biography</th></thead>
          <tbody><tr><td>${counter}</td>
          <td>${name}</td>
          <td>${lastName}</td>
          <td>${dOB}</td>
          <td>${nationality}</td>
          <td><a href="${biographyURL}" target="_blank">${name}'s biography</a></td></tr><tbody></table>
          `;
      f1Data.appendChild(tableRow);
      counter++;
    } else {
      break;
    }
  }
}

//The function gets the Indian mutual fund json data and displaying it using DOM
function indianMutualFundDetails(jsonData) {
  resetF1Info();
  resetLuciferInfo();
  const mutualFundDetails = jsonData;
  let counter = 1;
  mutualFundHeading.innerHTML = `
  <h1 class="text-center" id="title">Indian Mutual fund details</h1>
  <p class="text-center" id="description">India's first free mutual fund api</p>
  `;
  for (const {
    "schemeCode": schemeCode,
    "schemeName": schemeName
  } of mutualFundDetails) {
    if (counter <= 10) {
      const tableRow = document.createElement('div');
      tableRow.innerHTML = `
      <table class="table table-bordered table-dark w-50">
      <thead><th>Scheme Code</th><th>Scheme Name</th></thead>
      <tbody><tr><td>${schemeCode}</td><td>${schemeName}</td>
      </table>
      `
      mutualFundData.appendChild(tableRow);
      counter++;
    } else {
      break;
    }
  }
}

//The function gets the lucifer series quotes json data and displaying it using DOM
function luciferSeriesQuotes(jsonData) {
  resetF1Info();
  resetMutualFundInfo();
  const luciferQuotes = jsonData;
  luciferHeading.innerHTML = `
  <h1 class="text-center" id="title">Lucifer Series Quotes</h1>
  <p class="text-center" id="description">This api has the data has the quotes used on the Lucifer netflix series</p>
  `;
  for (const {
    "quote": quote,
    "author": author
  } of luciferQuotes) {
    const tableRow = document.createElement('div');
    tableRow.style.backgroundColor = "brown";
    tableRow.style.color = "white";
    tableRow.style.borderRadius = "10px";
    tableRow.style.boxShadow = "5px 5px black";
    tableRow.style.padding = "1rem";
    tableRow.style.margin = "1rem";
    tableRow.innerHTML = `
      <p>${quote}</p>
      <p class="text-end">-${author}</p>
      `
    luciferData.appendChild(tableRow);

  }
}

//resetting each api's data as we display the information using appendChild the data 
                        //is being on the webpage when we are trying to show other api data so resetting other two api's data when calling one.
function resetLuciferInfo() {
  luciferData.innerHTML = '';
  luciferHeading.innerHTML = '';
}

function resetF1Info() {
  f1Data.innerHTML = '';
  f1Heading.innerHTML = '';
}

function resetMutualFundInfo() {
  mutualFundData.innerHTML = '';
  mutualFundHeading.innerHTML = '';
}
