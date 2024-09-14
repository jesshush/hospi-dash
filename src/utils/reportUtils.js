import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const captureDashboard = async () => {
  try {
    const dashboardElement = document.getElementById('dashboard');
    if (!dashboardElement) {
      throw new Error('Dashboard element not found');
    }
    
    const canvas = await html2canvas(dashboardElement);
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing dashboard:', error);
    throw error;
  }
};

export const generatePDF = async (dashboardImage, startDate, endDate) => {
  try {
    const pdf = new jsPDF('landscape');
    
    // Add title
    pdf.setFontSize(18);
    pdf.text('Hospital Dashboard Report', 14, 22);
    
    // Add date range
    pdf.setFontSize(12);
    pdf.text(`Date Range: ${startDate} to ${endDate}`, 14, 32);
    
    // Add dashboard image
    const imgProps = pdf.getImageProperties(dashboardImage);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dashboardImage, 'PNG', 14, 40, pdfWidth - 28, pdfHeight);
    
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};