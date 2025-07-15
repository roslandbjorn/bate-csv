import convertToCsv from "../utils/CsvConverter";
import downloadFile from "../utils/DownloadUtil";

const FileUploadHandler = () => {
  const handleConvert = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const text = new TextDecoder("iso-8859-1").decode(arrayBuffer);
        const csvData = convertToCsv(text);
        const fileName = file.name.replace(".txt", ".csv");
        downloadFile(csvData, fileName);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h1>Konverter til CSV</h1>
      <input type="file" onChange={handleConvert} accept=".txt" />
    </div>
  );
};

export default FileUploadHandler;
