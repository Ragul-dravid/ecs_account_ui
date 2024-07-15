import jsPDF from "jspdf";
import 'jspdf-autotable';
import Logo from "../assets/AccountsLogo2.png"

const dataTable = () => {
  return
}
const GeneratePdf = (action = "download", data, { name }) => {
  const doc = new jsPDF();
  doc.addImage(Logo, "Logo", 13, 15, 15, 15); // x, y, width, height

  doc.setFont("helvetica", "normal");
  doc.setFontSize(23);
  doc.text(name, 130, 22);

  // doc.setFont("helvetica", "bold");
  // doc.setFontSize(13);
  // doc.text("ECS Cloud Infotech Pte Ltd", 13, 30);

  doc.setFont("helvetica", "small");
  doc.setFontSize(10);
  doc.text("Cloud ECS Infotech Pte Ltd", 13, 35);
  doc.text("Anna Salai", 13, 40);
  doc.text("Chennai-600002", 13, 45);
  doc.text("Tamil Nadu", 13, 50);

  doc.text("Bill To :", 13, 65);
  // doc.text(`${customer(data.customerId)}`, 13, 70);
  doc.text("Harish", 13, 70);
  doc.text("Purasaiwalkam", 13, 75);
  doc.text("Chennai-600002", 13, 80);

  const itemsModel = name === "DELIVERY"
    ? data.challansItemsModels
    : name === "INVOICE"
      ? data.invoiceItemsModels
      : name === "PURCHASE"
        ? data.purchaseOrderItemModels
        : name === "PAYMENTRECEIVED"
          ? data.paymentReceivedItemsModels
          : name === "PAYMENT MADE"
            ? data.paymentMadeItemsModels
            : null;
  // Add the table
  const tableData =
    itemsModel &&
    itemsModel.map((item, index) => [
      index + 1,
      item.productName,
      item.qty,
      item.rate || item.unitPrice,
      item.disc,
      item.tax || item.taxRate,
      item.amount,
      item.total,
    ]);
  doc.autoTable({
    startY: 85,
    headStyles: {
      fillColor: [50, 50, 50],
      textColor: [255, 255, 255],
      fontStyle: "normal",
    },
    bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    head: [
      [
        "S.No",
        "Product Name",
        "Quantity",
        "Price",
        "Discount",
        "Tax",
        "Amount",
        "Total",
      ],
    ],
    body: tableData,
    footStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "normal",
    },
    // eslint-disable-next-line no-dupe-keys
    body: tableData,
    foot: [
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "Sub Total(SGT)",
        `: ${data.subTotal || "0"}`,
        "",
        "",
        "",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "Discount(%)",
        `: ${data.txnDiscount || "0"}`,
        "",
        "",
        "",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "Tax(%)",
        `: ${data.totalTax || "0"}`,
        "",
        "",
        "",
        "",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "Grand Total(SGT)",
        `: ${data.total || "0"}`,
        "",
        "",
        "",
        "",
      ],
    ],
  });

  // Add Company Footer Information
  const finalY = doc.lastAutoTable.finalY + 10;

  // Wrap the Notes text
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Notes", 13, finalY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const notesText = doc.splitTextToSize(data.cusNotes || "", 180); // 180 is the width
  doc.text(notesText, 13, finalY + 6);

  const nextY = finalY + 6 + notesText.length * 10; // Adjust next Y position

  // Wrap the Terms & Conditions text
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Terms & Conditions", 13, nextY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const termsText = doc.splitTextToSize(data.termsConditions || "", 180); // 180 is the width
  doc.text(termsText, 13, nextY + 6);

  // Save the PDF
  if (action === "download") {
    doc.save(`${name}.pdf`);
  } else if (action === "print") {
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
  } else if (action === "open") {
    window.open(doc.output("bloburl"), "_blank");
  }
};

export default GeneratePdf