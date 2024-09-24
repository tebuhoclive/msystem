
import AppStore from "../stores/AppStore";


export const getBase64ImageFromURL = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
};

export const formatDate = (inputCode: string): string => {
  // Check if the input code starts with "GT"
  if (!inputCode.startsWith("GT")) {
    return "Invalid input code. It should start with 'GT'.";
  }

  // Extract the relevant parts from the input code
  const [, daysToMaturity, settlementDateStr, maturityDateStr] =
    inputCode.match(
      /^GT(\d+)(\/\d{2}[A-Za-z]{3}\d{2})-(\d{2}[A-Za-z]{3}\d{2})$/
    ) || [];

  if (!daysToMaturity || !settlementDateStr || !maturityDateStr) {
    return "Invalid input code.";
  }

  // Parse the days to maturity as a number
  const daysToMaturityNum = parseInt(daysToMaturity, 10);

  // Parse the settlement and maturity dates using the 'Date' object

  const maturityDate = new Date(maturityDateStr);

  // Add the days to maturity to the maturity date
  maturityDate.setDate(maturityDate.getDate() + daysToMaturityNum);

  // Custom date formatting function
  const formatDateToString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}${month}${year}`;
  };

  // Format the dates to match the desired output format
  const formattedMaturityDate = formatDateToString(maturityDate);

  // Combine the parts to create the final output
  const outputCode = `GT${daysToMaturity}/${maturityDateStr}-${formattedMaturityDate}`;

  return outputCode;
};

export const calculateFileHash = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};



