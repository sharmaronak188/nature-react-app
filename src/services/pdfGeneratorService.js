import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a orders argument
const generatePDF = (orders) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "Sr. No.",
    "Name",
    "Quantity",
    "Price",
    "Total_per_item",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each product pass all its data into an array
  orders.products.forEach((product, index) => {
    const orderData = [
      index + 1,
      product[1],
      product[2],
      "$" + product[3],
      "$" + orders.total_per_item[index].toFixed(2),
    ];
    // push each product's info into a row
    tableRows.push(orderData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 35 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Order Summary", 14, 15);
  doc.text("\nGrand Total: $" + orders.total, 14, 25);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
