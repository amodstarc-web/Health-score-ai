// PDF Report Generator Utility
// This creates a downloadable PDF report for health tests
import { toast } from 'sonner';

export interface PDFReportData {
  testName: string;
  score: number | string;
  date: string;
  userName?: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export const generatePDFReport = (data: PDFReportData) => {
  try {
    const { testName, score, date, sections } = data;
    
    // Show loading toast
    toast.loading('Generating your report...');
    
    // Create HTML content for the PDF
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${testName} - Health Report</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #fff;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3b82f6;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #3b82f6;
      margin-bottom: 10px;
    }
    .test-name {
      font-size: 28px;
      font-weight: bold;
      color: #1e40af;
      margin: 10px 0;
    }
    .score-box {
      background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
      color: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .score {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }
    .date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
    .section {
      margin: 30px 0;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .section-content {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .content-item {
      margin: 12px 0;
      padding-left: 20px;
      position: relative;
    }
    .content-item:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
      font-size: 20px;
    }
    .nutrition-item {
      background: white;
      padding: 12px;
      margin: 8px 0;
      border-left: 4px solid #10b981;
      border-radius: 4px;
    }
    .avoid-item {
      background: white;
      padding: 12px;
      margin: 8px 0;
      border-left: 4px solid #ef4444;
      border-radius: 4px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .disclaimer {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 13px;
    }
    @media print {
      body {
        padding: 20px;
      }
      .score-box {
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🏥 HealthScore AI</div>
    <div class="test-name">${testName}</div>
    <div class="date">Generated on ${date}</div>
  </div>

  <div class="score-box">
    <div style="font-size: 18px; margin-bottom: 5px;">Your Result</div>
    <div class="score">${score}</div>
  </div>

  ${sections.map(section => `
    <div class="section">
      <div class="section-title">${section.title}</div>
      <div class="section-content">
        ${section.content.map(item => {
          // Check if it's a nutrition add/avoid item
          if (item.startsWith('ADD:')) {
            return `<div class="nutrition-item">✅ ${item.replace('ADD:', '').trim()}</div>`;
          } else if (item.startsWith('AVOID:')) {
            return `<div class="avoid-item">❌ ${item.replace('AVOID:', '').trim()}</div>`;
          } else {
            return `<div class="content-item">${item}</div>`;
          }
        }).join('')}
      </div>
    </div>
  `).join('')}

  <div class="disclaimer">
    <strong>⚠️ Medical Disclaimer:</strong> This report is for informational purposes only and does not constitute medical advice. 
    Always consult with a qualified healthcare provider before making any changes to your diet, exercise, or health regimen. 
    This assessment is based on general health guidelines and may not account for individual medical conditions.
  </div>

  <div class="footer">
    <p><strong>HealthScore AI</strong> - Your Personal Health Assessment Platform</p>
    <p>For more health insights, visit our website</p>
    <p>© ${new Date().getFullYear()} HealthScore AI. All rights reserved.</p>
  </div>
</body>
</html>
  `;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${testName.replace(/\s+/g, '_')}_Report_${new Date().getTime()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success toast
    toast.success('Report generated successfully!');
  } catch (error) {
    // Show error toast
    toast.error('Failed to generate report. Please try again.');
    console.error('Error generating PDF report:', error);
  }
};