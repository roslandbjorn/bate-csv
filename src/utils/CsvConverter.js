const headers = [
  {
    name: "Klient",
    startPosition: 0,
    endPosition: 21,
  },
  {
    name: "Periode",
    startPosition: 21,
    endPosition: 37,
  },
  {
    name: "Dato",
    startPosition: 37,
    endPosition: 48,
  },
  {
    name: "Tekst",
    startPosition: 48,
    endPosition: 68,
  },
  {
    name: "Avdeling",
    startPosition: 68,
    endPosition: 83,
  },
  {
    name: "Ansatt",
    startPosition: 83,
    endPosition: 114,
  },
  {
    name: "Konto",
    startPosition: 114,
    endPosition: 150,
  },
  {
    name: "Beløp",
    startPosition: 150,
    endPosition: 317,
  },
  {
    name: "Bilagsnummer",
    startPosition: 317,
    endPosition: 377,
  },
];


const fixAmount = (text) => {
  let amountNumber = parseFloat(text.replace("NOK", "").replace(/,/g, "."));
  amountNumber = isNaN(amountNumber) ? 0 : amountNumber;
  amountNumber /= 100;
  return isNaN(amountNumber) ? "" : amountNumber.toFixed(2).replace(".", ",");
};

const handleValue = (headerName, value) => {
  switch (headerName) {
    case "Beløp":
      return fixAmount(value);
    default:
      return value;
  }
};

const handleLine = (line) => {
  const values = [];
  for (let i = 0; i < headers.length; i++) {
    if (!line || line.trim() === "") {
      continue;
    }
    const header = headers[i];
    const value = line
      .trim()
      .substring(header.startPosition, header.endPosition)
      .trim();

    const formattedValue = handleValue(header.name, value);
    values.push(formattedValue);
  }
  return values.join(";");
};

const convertToCsv = (text) => {
  const lines = text.split("\n");
  const headerNames = headers.map((header) => header.name).join(";");
  const formattedLines = lines.map((line) => handleLine(line));
  return [headerNames, ...formattedLines].join("\n");
};

export default convertToCsv;
