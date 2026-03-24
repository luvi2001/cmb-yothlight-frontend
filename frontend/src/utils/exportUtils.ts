import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export type AttendanceRecord = {
  memberName: string;
  attended: boolean;
  notes?: string | null;
};

export type AttendanceExport = {
  eventName: string;
  eventDate?: string;
  area?: string;
  records: AttendanceRecord[];
  total: number;
  attended: number;
  absent: number;
};

/**
 * Export attendance data to Excel format
 */
export const exportToExcel = (data: AttendanceExport) => {
  const worksheetData = [
    ['Event Attendance Report'],
    ['Event Name', data.eventName],
    ['Area', data.area || 'N/A'],
    ['Date Generated', new Date().toLocaleDateString()],
    [],
    ['Summary'],
    ['Total Members', data.total],
    ['Attended', data.attended],
    ['Absent', data.absent],
    ['Attendance Rate', `${((data.attended / data.total) * 100).toFixed(2)}%`],
    [],
    ['Member', 'Status', 'Notes'],
    ...data.records.map((record) => [
      record.memberName,
      record.attended ? 'Present' : 'Absent',
      record.notes || '',
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
  // Set column widths
  worksheet['!cols'] = [
    { wch: 25 }, // Member name
    { wch: 12 }, // Status
    { wch: 30 }, // Notes
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  const filename = `${data.eventName}_attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, filename);
};

/**
 * Export attendance data to PDF format
 */
export const exportToPDF = (data: AttendanceExport) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  let yPosition = margin;

  // Title
  doc.setFontSize(16);
  doc.text('Event Attendance Report', margin, yPosition);
  yPosition += 10;

  // Event Details
  doc.setFontSize(11);
  doc.text(`Event: ${data.eventName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Area: ${data.area || 'N/A'}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 10;

  // Summary Section
  doc.setFontSize(12);
  doc.text('Summary', margin, yPosition);
  yPosition += 6;

  const summaryData = [
    ['Total Members', data.total.toString()],
    ['Attended', data.attended.toString()],
    ['Absent', data.absent.toString()],
    ['Attendance Rate', `${((data.attended / data.total) * 100).toFixed(2)}%`],
  ];

  (doc as any).autoTable({
    startY: yPosition,
    head: [['Metric', 'Count']],
    body: summaryData,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // Attendance Details Section
  doc.setFontSize(12);
  doc.text('Attendance Details', margin, yPosition);
  yPosition += 6;

  const tableData = data.records.map((record) => [
    record.memberName,
    record.attended ? 'Present' : 'Absent',
    record.notes || '',
  ]);

  (doc as any).autoTable({
    startY: yPosition,
    head: [['Member Name', 'Status', 'Notes']],
    body: tableData,
    margin: { left: margin, right: margin },
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    didDrawPage: (data: any) => {
      // Footer
      const footerText = `Page ${doc.internal.pages.length - 1}`;
      doc.setFontSize(9);
      doc.text(footerText, pageWidth - margin - 20, pageHeight - 10);
    },
  });

  const filename = `${data.eventName}_attendance_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};

/**
 * Export member attendance history to Excel
 */
export const exportMemberHistoryToExcel = (
  memberName: string,
  history: Array<{
    eventName: string;
    date?: string;
    purpose?: string;
    present: boolean;
    notes?: string;
  }>
) => {
  const worksheetData = [
    ["Member Attendance History"],
    ["Member", memberName],
    ["Report Generated", new Date().toLocaleDateString()],
    [],
    ["Event", "Date", "Purpose", "Status", "Notes"],
    ...history.map((h) => [
      h.eventName,
      h.date || "N/A",
      h.purpose || "",
      h.present ? "Attended" : "Absent",
      h.notes || "",
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  worksheet["!cols"] = [
    { wch: 25 }, // Event
    { wch: 15 }, // Date
    { wch: 20 }, // Purpose
    { wch: 12 }, // Status
    { wch: 30 }, // Notes
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "History");

  const filename = `${memberName}_attendance_history_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, filename);
};

/**
 * Export member attendance history to PDF
 */
export const exportMemberHistoryToPDF = (
  memberName: string,
  history: Array<{
    eventName: string;
    date?: string;
    purpose?: string;
    present: boolean;
    notes?: string;
  }>
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  let yPosition = margin;

  // Title
  doc.setFontSize(16);
  doc.text("Member Attendance History", margin, yPosition);
  yPosition += 10;

  // Member Details
  doc.setFontSize(11);
  doc.text(`Member: ${memberName}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 10;

  // Calculate summary
  const attended = history.filter((h) => h.present).length;
  const summary = [
    ["Total Events", history.length.toString()],
    ["Attended", attended.toString()],
    ["Absent", (history.length - attended).toString()],
    ["Attendance Rate", `${((attended / history.length) * 100).toFixed(2)}%`],
  ];

  (doc as any).autoTable({
    startY: yPosition,
    head: [["Metric", "Value"]],
    body: summary,
    margin: { left: margin, right: margin },
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // History Table
  doc.setFontSize(12);
  doc.text("Event Attendance", margin, yPosition);
  yPosition += 6;

  const tableData = history.map((h) => [
    h.eventName,
    h.date || "N/A",
    h.purpose || "",
    h.present ? "Attended" : "Absent",
    h.notes || "",
  ]);

  (doc as any).autoTable({
    startY: yPosition,
    head: [["Event", "Date", "Purpose", "Status", "Notes"]],
    body: tableData,
    margin: { left: margin, right: margin },
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  const filename = `${memberName}_attendance_history_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
};
