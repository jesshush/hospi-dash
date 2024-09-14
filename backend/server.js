const express = require('express');
const { PDFDocument, rgb } = require('pdf-lib');
const { createCanvas, loadImage } = require('canvas');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.post('/api/generate-report', async (req, res) => {
  try {
    const { dashboardImage, startDate, endDate } = req.body;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape

    // Add title and date range
    const { width, height } = page.getSize();
    page.drawText('Hospital Dashboard Report', {
      x: 50,
      y: height - 50,
      size: 24
    });
    page.drawText(`Date Range: ${startDate} to ${endDate}`, {
      x: 50,
      y: height - 80,
      size: 12
    });

    // Add the dashboard image
    const image = await loadImage(dashboardImage);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const pngImage = await pdfDoc.embedPng(canvas.toBuffer());
    
    page.drawImage(pngImage, {
      x: 50,
      y: 50,
      width: width - 100,
      height: height - 150
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    res.contentType('application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));