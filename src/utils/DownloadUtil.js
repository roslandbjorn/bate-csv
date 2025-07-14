const downloadFile = (data, fileName) => {
  const blob = new Blob([data]);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob, { type: "text/csv;" });
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFile;