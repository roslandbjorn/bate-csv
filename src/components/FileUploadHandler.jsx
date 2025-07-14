import {  useState } from 'react';
import convertToCsv from '../utils/CsvConverter';
import downloadFile from '../utils/DownloadUtil';

const FileUploadHandler = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log('Selected file:', e.target.files[0]);
            setFile(e.target.files[0]);
        }
    };

    const handleConvert = () => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const text = new TextDecoder('iso-8859-1').decode(arrayBuffer);
            const csvData = convertToCsv(text);
            downloadFile(csvData, "converted.csv");
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h1>Konverter til CSV</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleConvert}>Konverter</button>
        </div>
    );
}

export default FileUploadHandler;
