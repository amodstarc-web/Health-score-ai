import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Camera, X, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Activity, Lock, Sparkles, ArrowRight, Shield, Download, Apple, Utensils, Dumbbell, Pill, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { unlockTestReport, isRazorpayConfigured } from '../config/razorpay';
import { markTestCompleted, markTestUnlocked, TEST_IDS } from '../utils/testTracking';
import { toast } from 'sonner';
import { generatePDFReport } from '../utils/pdfGenerator';
import { analyzeBloodReportWithAI, isOpenAIConfigured } from '../config/openai';
import { parseBloodReportText } from '../utils/bloodReportParser';
import Tesseract from 'tesseract.js';

interface BloodMetric {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low';
  risk?: string;
  recommendations?: {
    foods: string[];
    lifestyle: string[];
    supplements: string[];
    warning?: string;
  };
  description?: string;
  clinicalSignificance?: string;
}

interface ReportDetails {
  labName?: string;
  patientName?: string;
  patientAge?: string;
  patientGender?: string;
  reportDate?: string;
  reportId?: string;
  referredBy?: string;
  extractedText: string;
}

export function BloodReportAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [analyzedMetrics, setAnalyzedMetrics] = useState<BloodMetric[]>([]);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<string>(''); // Store AI analysis for PDF
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Create a synthetic event for handleImageUpload
      const syntheticEvent = {
        target: {
          files: [file]
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleImageUpload(syntheticEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setAnalyzedMetrics([]);
    setReportDetails(null);
    setShowResults(false);

    try {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      setAnalysisProgress('Reading image with OCR...');

      // Perform OCR
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
            setAnalysisProgress(`Extracting text: ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      const extractedText = result.data.text;
      console.log('==========================================');
      console.log('EXTRACTED TEXT FROM BLOOD REPORT:');
      console.log('==========================================');
      console.log(extractedText);
      console.log('==========================================\n');

      setAnalysisProgress('Analyzing blood metrics...');

      // Parse the extracted text
      const { metrics, summary, reportType } = parseBloodReportText(extractedText);
      
      // Check if wrong report type detected
      if (reportType && reportType.type === 'trisomy-prenatal') {
        toast.error('Wrong Report Type Detected', {
          description: reportType.message || 'This appears to be a Prenatal/Trisomy report. Please upload a blood chemistry report instead.',
          duration: 8000
        });
        setIsAnalyzing(false);
        setUploadedImage(null);
        setAnalysisProgress('');
        return;
      }
      
      if (reportType && reportType.type === 'unknown' && metrics.length === 0) {
        toast.error('Unable to Analyze Report', {
          description: 'Could not identify the report type. Please ensure you upload a clear blood chemistry report (CBC, lipid profile, or general blood test).',
          duration: 8000
        });
        setIsAnalyzing(false);
        setUploadedImage(null);
        setAnalysisProgress('');
        return;
      }

      // Extract patient and lab details
      const details = extractReportDetails(extractedText);
      setReportDetails(details);

      console.log('Parsed metrics:', metrics);
      console.log('Report summary:', summary);

      // Store the analysis summary for PDF
      setAiAnalysis(summary || 'Blood report analysis completed');

      setAnalyzedMetrics(metrics);
      
      // Show results automatically
      setShowResults(true);
      
      if (metrics.length > 0) {
        toast.success('Report Analyzed Successfully', {
          description: `Found ${metrics.length} blood test metrics in your report`
        });
      } else {
        toast.info('Using Sample Data', {
          description: summary || 'Could not detect specific values. Showing sample analysis for demonstration.'
        });
      }
    } catch (error) {
      console.error('Error analyzing report:', error);
      toast.error('Analysis Failed', {
        description: error instanceof Error ? error.message : 'Could not analyze the report. Please try again with a clearer image.'
      });
      setUploadedImage(null);
    } finally {
      setIsAnalyzing(false);
      setOcrProgress(0);
      setAnalysisProgress('');
    }
  };

  // Extract patient and lab details from text
  const extractReportDetails = (text: string): ReportDetails => {
    const details: ReportDetails = {
      extractedText: text
    };
    
    // Extract Lab Name (usually at the top)
    const labMatch = text.match(/^([A-Z][A-Z\s&]+(?:LAB|LABORATORY|DIAGNOSTIC|CLINIC|HOSPITAL|HEALTHCARE|PATHOLOGY))/im);
    if (labMatch) {
      details.labName = labMatch[1].trim();
    }
    
    // Extract Patient Name
    const nameMatch = text.match(/(?:patient\s*name|name)[:\s]+([A-Za-z\s.]+?)(?:\n|age|gender|sex|$)/i);
    if (nameMatch) {
      details.patientName = nameMatch[1].trim();
    }
    
    // Extract Age
    const ageMatch = text.match(/(?:age)[:\s]+(\d+\s*(?:years?|yrs?|y)?)/i);
    if (ageMatch) {
      details.patientAge = ageMatch[1].trim();
    }
    
    // Extract Gender
    const genderMatch = text.match(/(?:gender|sex)[:\s]+(male|female|m|f)/i);
    if (genderMatch) {
      const gender = genderMatch[1].toLowerCase();
      details.patientGender = gender === 'm' || gender === 'male' ? 'Male' : 'Female';
    }
    
    // Extract Report Date
    const dateMatch = text.match(/(?:date|report\s*date|collection\s*date)[:\s]+(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i);
    if (dateMatch) {
      details.reportDate = dateMatch[1].trim();
    }
    
    // Extract Report ID
    const idMatch = text.match(/(?:report\s*(?:id|no|number)|ref\s*(?:id|no|number)|lab\s*(?:id|no|number))[:\s]+([A-Z0-9]+)/i);
    if (idMatch) {
      details.reportId = idMatch[1].trim();
    }
    
    // Extract Referred By
    const referredMatch = text.match(/(?:referred\s*by|ref\s*by|doctor)[:\s]+(dr\.?\s*[A-Za-z\s.]+?)(?:\n|$)/i);
    if (referredMatch) {
      details.referredBy = referredMatch[1].trim();
    }
    
    return details;
  };

  // Note: parseBloodReportText is now imported from utils/bloodReportParser.ts

  const handleReset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
    setIsUnlocked(false);
  };

  const handleUnlock = () => {
    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      // For demo/testing purposes when Razorpay is not configured
      toast.success('🎉 Report Unlocked! (Demo Mode - No payment required)', {
        duration: 4000,
      });
      setIsUnlocked(true);
      markTestUnlocked(TEST_IDS.BLOOD_REPORT);
      markTestCompleted(TEST_IDS.BLOOD_REPORT, 'Blood Report Analysis', 100, true);
      return;
    }

    // Use the Razorpay integration
    unlockTestReport(
      'Blood Report Analysis',
      'Guest User',
      '', // Email - can be added if needed
      (paymentId) => {
        // Payment successful
        toast.success('Payment successful! Your full report is now unlocked.', {
          duration: 5000,
        });
        
        setIsUnlocked(true);
        
        // Mark test as unlocked
        markTestUnlocked(TEST_IDS.BLOOD_REPORT);
        
        // Update the completion with unlocked status
        markTestCompleted(TEST_IDS.BLOOD_REPORT, 'Blood Report Analysis', 100, true);
        
        // Log payment for tracking (in production, send to your backend)
        console.log('Payment ID:', paymentId);
      },
      (error) => {
        // Payment failed or cancelled
        console.error('Payment error:', error);
        
        if (error.includes('cancelled')) {
          toast.error('Payment cancelled. Your report remains locked.');
        } else {
          toast.error('Payment failed. Please try again or contact support.');
        }
      }
    );
  };

  const handleDownloadPDF = () => {
    const sections = [];
    
    // Add Patient & Lab Information Section
    if (reportDetails) {
      const patientInfo: string[] = [];
      
      if (reportDetails.labName) {
        patientInfo.push(`Lab Name: ${reportDetails.labName}`);
      }
      if (reportDetails.reportId) {
        patientInfo.push(`Report ID: ${reportDetails.reportId}`);
      }
      if (reportDetails.reportDate) {
        patientInfo.push(`Report Date: ${reportDetails.reportDate}`);
      }
      if (reportDetails.patientName) {
        patientInfo.push(`Patient Name: ${reportDetails.patientName}`);
      }
      if (reportDetails.patientAge) {
        patientInfo.push(`Age: ${reportDetails.patientAge}`);
      }
      if (reportDetails.patientGender) {
        patientInfo.push(`Gender: ${reportDetails.patientGender}`);
      }
      if (reportDetails.referredBy) {
        patientInfo.push(`Referred By: ${reportDetails.referredBy}`);
      }
      
      if (patientInfo.length > 0) {
        sections.push({
          title: '📋 Report Information',
          content: patientInfo
        });
      }
    }
    
    // Add Results Summary
    sections.push({
      title: '📊 Blood Test Results Summary',
      content: analyzedMetrics.map(metric => 
        `${metric.name}: ${metric.value} ${metric.unit} (Normal: ${metric.normalRange}) - ${metric.status.toUpperCase()}`
      )
    });
    
    // Add comprehensive test details with explanations
    sections.push({
      title: '📖 Understanding Your Blood Tests',
      content: analyzedMetrics.map((metric: any) => {
        const lines = [
          `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
          `TEST: ${metric.name}`,
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
          ``
        ];
        
        // What this test measures
        if (metric.description) {
          lines.push(`🔬 What This Test Measures:`);
          lines.push(`${metric.description}`);
          lines.push(``);
        }
        
        // Your results
        lines.push(`📊 Your Results:`);
        lines.push(`• Your Value: ${metric.value} ${metric.unit}`);
        lines.push(`• Normal Range: ${metric.normalRange}`);
        lines.push(`• Status: ${metric.status.toUpperCase()}`);
        
        // What abnormal values mean
        if (metric.clinicalSignificance) {
          lines.push(``);
          lines.push(`⚕️ Clinical Significance:`);
          lines.push(`${metric.clinicalSignificance}`);
        }
        
        // Risk assessment if abnormal
        if (metric.risk) {
          lines.push(``);
          lines.push(`⚠️ Risk Assessment:`);
          lines.push(`${metric.risk}`);
        }
        
        lines.push(``);
        return lines.join('\n');
      })
    });
    
    // Add detailed analysis of abnormal values
    const abnormalMetrics = analyzedMetrics.filter(m => m.status !== 'normal');
    if (abnormalMetrics.length > 0) {
      sections.push({
        title: '🔍 Detailed Analysis of Abnormal Values',
        content: abnormalMetrics.map((metric: any) => {
          const lines = [
            `\n${metric.name} (${metric.status.toUpperCase()}):`,
            `• Your Value: ${metric.value} ${metric.unit}`,
            `• Normal Range: ${metric.normalRange}`,
            ``
          ];
          
          if (metric.status === 'high') {
            lines.push(`Your ${metric.name} level is HIGHER than normal.`);
          } else {
            lines.push(`Your ${metric.name} level is LOWER than normal.`);
          }
          
          if (metric.risk) {
            lines.push(`Risk: ${metric.risk}`);
          }
          
          lines.push(``);
          return lines.join('\n');
        })
      });
    }

    // Add recommendations for abnormal metrics
    const metricsWithRecommendations = analyzedMetrics.filter((m: any) => m.status !== 'normal' && m.recommendations);
    if (metricsWithRecommendations.length > 0) {
      sections.push({
        title: '💊 Personalized Health Recommendations',
        content: metricsWithRecommendations.map((metric: any) => {
          const lines = [
            `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            `${metric.name} - Action Plan`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            ``
          ];
          
          if (metric.recommendations) {
            lines.push(`🍎 FOODS TO INCLUDE IN YOUR DIET:`);
            metric.recommendations.foods.forEach((food: string) => {
              lines.push(`  ✓ ${food}`);
            });
            lines.push(``);
            
            lines.push(`🏃 LIFESTYLE MODIFICATIONS:`);
            metric.recommendations.lifestyle.forEach((lifestyle: string) => {
              lines.push(`  ✓ ${lifestyle}`);
            });
            lines.push(``);
            
            lines.push(`💊 SUPPLEMENTS TO CONSIDER (Consult Doctor First):`);
            metric.recommendations.supplements.forEach((supplement: string) => {
              lines.push(`  ✓ ${supplement}`);
            });
            lines.push(``);
            
            if (metric.recommendations.warning) {
              lines.push(`⚠️ IMPORTANT WARNING:`);
              lines.push(`${metric.recommendations.warning}`);
              lines.push(``);
            }
          }
          
          return lines.join('\n');
        })
      });
    }
    
    // Add medical terminology glossary
    sections.push({
      title: '📚 Medical Terminology Guide',
      content: [
        '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'UNDERSTANDING YOUR TESTS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '• g/dL = grams per deciliter (measurement of concentration)',
        '• mg/dL = milligrams per deciliter (measurement of concentration)',
        '• ng/mL = nanograms per milliliter (measurement of concentration)',
        '• mIU/L = milli-international units per liter (hormone measurement)',
        '• % = percentage (proportion measurement)',
        '',
        'STATUS INDICATORS:',
        '• NORMAL = Your value is within the healthy reference range',
        '• HIGH = Your value is above the normal range',
        '• LOW = Your value is below the normal range',
        '',
        'COMMON MEDICAL TERMS:',
        '• Anemia = Low red blood cells or hemoglobin',
        '• Prediabetes = Blood sugar higher than normal but not yet diabetes',
        '• Hypothyroidism = Underactive thyroid gland',
        '• Hyperthyroidism = Overactive thyroid gland',
        '• Cholesterol = A type of fat in the blood',
        '• Creatinine = Waste product from muscle metabolism',
        ''
      ]
    });
    
    // Add disclaimer
    sections.push({
      title: '⚕️ Medical Disclaimer',
      content: [
        '',
        'This analysis is generated by AI for educational purposes only.',
        'It should NOT be used as a substitute for professional medical advice.',
        '',
        'IMPORTANT:',
        '• Always consult your doctor before making any health decisions',
        '• Your doctor should interpret these results in the context of your complete medical history',
        '• Do not start, stop, or change any medications without medical supervision',
        '• Seek immediate medical attention if you have concerning symptoms',
        '',
        'For questions about your results, please schedule an appointment with your healthcare provider.',
        ''
      ]
    });

    generatePDFReport({
      testName: 'Comprehensive Blood Report Analysis',
      score: `${analyzedMetrics.length} Tests Analyzed`,
      date: new Date().toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t-2 border-blue-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            New: AI-Powered Analysis
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            Upload Your Blood Report,<br />Get AI Analysis Instantly
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your blood test results and explains what each metric means for your health
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {!uploadedImage ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-3xl p-8 md:p-12 text-center transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50'
                }`}
              >
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Upload Blood Report
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your report image or click to browse
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Choose File
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-xl"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Take Photo
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <span>100% Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Instant Results</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Blood Report"
                    className="w-full h-auto max-h-96 object-contain bg-gray-50"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </button>
                </div>

                {/* Analysis Status */}
                <div className="p-6">
                  {isAnalyzing ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Analyzing Your Report...
                      </h4>
                      <p className="text-gray-600">
                        AI is reading and analyzing your blood test results
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{analysisProgress}</p>
                      {ocrProgress > 0 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${ocrProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Processing: {ocrProgress}%</p>
                        </div>
                      )}
                    </div>
                  ) : showResults ? (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Analysis Complete!
                      </h4>
                      <p className="text-sm text-gray-600">
                        View your results on the right →
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <span className="font-semibold">Medical Disclaimer:</span> This AI analysis is for educational purposes only and should not replace professional medical advice. Always consult your doctor for medical decisions.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border-2 border-dashed border-gray-300 p-8 md:p-12 h-full flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                    <Activity className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Your Results Will Appear Here
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    Upload your blood report to see AI-powered analysis of your health metrics
                  </p>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Detected</div>
                      <div className="text-lg font-semibold text-gray-900">12+ Metrics</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Analysis</div>
                      <div className="text-lg font-semibold text-gray-900">Instant</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl border-2 border-green-100 shadow-xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-semibold">Analysis Results</h3>
                    </div>
                    <p className="text-blue-100">AI detected and analyzed your blood metrics</p>
                  </div>

                  {/* Free Preview Metrics */}
                  <div className="p-6 space-y-4">
                    {analyzedMetrics.slice(0, 2).map((metric, index) => (
                      <motion.div
                        key={`preview-${metric.name}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl p-4 border-2 ${
                          metric.status === 'normal'
                            ? 'bg-green-50 border-green-200'
                            : metric.status === 'high'
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                            <p className="text-sm text-gray-600">Normal Range: {metric.normalRange}</p>
                          </div>
                          {metric.status === 'normal' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : metric.status === 'high' ? (
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                          <span className="text-gray-600">{metric.unit}</span>
                        </div>
                        {metric.risk && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-gray-700">{metric.risk}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Locked or Unlocked Metrics */}
                    {!isUnlocked ? (
                      <div className="relative">
                        <div className="space-y-4 blur-sm pointer-events-none">
                          {analyzedMetrics.slice(2).map((metric, index) => (
                            <div
                              key={index}
                              className="rounded-xl p-4 border-2 bg-gray-50 border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                                  <p className="text-sm text-gray-600">Normal Range: {metric.normalRange}</p>
                                </div>
                              </div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                                <span className="text-gray-600">{metric.unit}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Unlock Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                              Unlock Full Analysis
                            </h4>
                            <p className="text-gray-600 mb-4 text-sm">
                              Get detailed analysis of all {analyzedMetrics.length} metrics + personalized health recommendations
                            </p>
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl shadow-lg"
                              onClick={handleUnlock}
                            >
                              Unlock for ₹199
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Unlocked Metrics */
                      analyzedMetrics.slice(2).map((metric, index) => (
                        <motion.div
                          key={`unlocked-${metric.name}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-xl p-4 border-2 ${
                            metric.status === 'normal'
                              ? 'bg-green-50 border-green-200'
                              : metric.status === 'high'
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-yellow-50 border-yellow-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                              <p className="text-sm text-gray-600">Normal Range: {metric.normalRange}</p>
                            </div>
                            {metric.status === 'normal' ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : metric.status === 'high' ? (
                              <TrendingUp className="h-5 w-5 text-orange-600" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                            <span className="text-gray-600">{metric.unit}</span>
                          </div>
                          {metric.risk && (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-600" />
                              <span className="text-sm text-gray-700">{metric.risk}</span>
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}

                    {/* Detailed Recommendations (Only show when unlocked) */}
                    {isUnlocked && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 space-y-4"
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                          <h4 className="text-lg font-semibold mb-1 flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Personalized Health Recommendations
                          </h4>
                          <p className="text-sm text-blue-100">
                            Based on your blood test results
                          </p>
                        </div>

                        {analyzedMetrics.filter(m => m.status !== 'normal' && m.recommendations).map((metric, index) => (
                          <motion.div
                            key={`recommendation-${metric.name}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-white border-2 border-gray-200 rounded-xl p-5"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.status === 'high' ? 'bg-orange-100' : 'bg-yellow-100'}`}>
                                {metric.status === 'high' ? (
                                  <TrendingUp className={`h-5 w-5 ${metric.status === 'high' ? 'text-orange-600' : 'text-yellow-600'}`} />
                                ) : (
                                  <TrendingDown className="h-5 w-5 text-yellow-600" />
                                )}
                              </div>
                              <h5 className="font-semibold text-gray-900">
                                {metric.name} - {metric.status === 'high' ? 'Too High' : 'Too Low'}
                              </h5>
                            </div>

                            {metric.recommendations && (
                              <div className="space-y-4">
                                {/* Foods */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Apple className="h-4 w-4 text-green-600" />
                                    <h6 className="font-medium text-gray-900 text-sm">Foods to Include:</h6>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {metric.recommendations.foods.map((food, i) => (
                                      <span
                                        key={i}
                                        className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                                      >
                                        {food}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Lifestyle */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Dumbbell className="h-4 w-4 text-blue-600" />
                                    <h6 className="font-medium text-gray-900 text-sm">Lifestyle Changes:</h6>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {metric.recommendations.lifestyle.map((lifestyle, i) => (
                                      <span
                                        key={i}
                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                      >
                                        {lifestyle}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Supplements */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Pill className="h-4 w-4 text-purple-600" />
                                    <h6 className="font-medium text-gray-900 text-sm">Supplements (Consult Doctor):</h6>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {metric.recommendations.supplements.map((supplement, i) => (
                                      <span
                                        key={i}
                                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                                      >
                                        {supplement}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Warning */}
                                {metric.recommendations.warning && (
                                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-orange-800">
                                      {metric.recommendations.warning}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}

                        {/* Download PDF Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Button
                            onClick={handleDownloadPDF}
                            size="lg"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl shadow-lg"
                          >
                            <Download className="mr-2 h-5 w-5" />
                            Download Full Report (PDF)
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom CTA */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{analyzedMetrics.length} metrics</span> detected
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Upload New Report
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
            <p className="text-sm text-gray-600">
              Advanced AI reads and interprets your blood test values instantly
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">100% Private & Secure</h4>
            <p className="text-sm text-gray-600">
              Your reports are encrypted and never stored on our servers
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Insights</h4>
            <p className="text-sm text-gray-600">
              Get easy-to-understand explanations of what each metric means
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}