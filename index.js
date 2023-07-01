// Checks for --custom and if it has a value
const inputIndex = process.argv.indexOf("--input");
let inputValue;

if (inputIndex > -1) {
  // Retrieve the value after --custom
  inputValue = process.argv[inputIndex + 1];
}

const groupIndex = process.argv.indexOf("--group");
let groupValue;

if (groupIndex > -1) {
  // Retrieve the value after --custom
  groupValue = process.argv[groupIndex + 1];
}

const fs = require("fs");
const csv = require("fast-csv");
const countryList = require("./ISO-3166-CountryCode.json");
const data = [];

const file = inputValue || "import";

const getLand = (countryCode) => {
  const country = countryList.find(
    (item) => item["alpha-2"] === countryCode.toLocaleUpperCase()
  );
  return country ? country.name : "";
};

fs.createReadStream("./import/" + file + ".csv")
  .pipe(
    csv.parse({ headers: true, discardUnmappedColumns: false, delimiter: ";" })
  )
  .on("error", (error) => console.error(error))
  .on("data", (row) => data.push(row))
  .on("end", () => {
    // Output
    const output = [];

    data.map((item) => {
      if (item["E-mailadres"] === "") {
        return;
      }
      output.push({
        email: item["E-mailadres"],
        bedrijfsnaam: "",
        aanhef: "",
        voornaam: item.Voornaam,
        tussenvoegsel: "",
        achternaam: item.Achternaam,
        telefoon: "",
        fax: "",
        geboortedatum: "",
        adres_aanhef: "",
        tav: "",
        adres: "",
        huisnummer: "",
        postcode: "",
        plaats: "",
        land: getLand(item["CC"]),
        nieuwsbrief_groepen: groupValue || "",
      });
    });

    // export to csv

    const titleKeys = Object.keys(output[0]);

    const refinedData = [];
    refinedData.push(titleKeys);

    output.forEach((item) => {
      refinedData.push(Object.values(item));
    });

    let csvContent = "";

    refinedData.forEach((row) => {
      csvContent += row.join(";") + "\n";
    });

    fs.writeFile("./export/ex_" + file + ".csv", csvContent, "utf-8", (err) => {
      if (err) console.log(err);
      else console.log("Data saved");
    });
  });
