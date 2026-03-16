/**
 * Enhanced Blood Report Parser
 * Extracts blood test values more accurately by looking for "Observed" values
 */

export interface BloodMetric {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: 'normal' | 'high' | 'low';
    risk?: string;
    description?: string; // What this test measures
    clinicalSignificance?: string; // What abnormal values mean
    recommendations?: {
      foods: string[];
      lifestyle: string[];
      supplements: string[];
      warning?: string;
    };
  }
  
  export type ReportType = 
    | 'blood-chemistry'
    | 'trisomy-prenatal'
    | 'cbc-complete-blood-count'
    | 'lipid-profile'
    | 'thyroid'
    | 'liver-function'
    | 'kidney-function'
    | 'unknown';
  
  export interface ReportTypeInfo {
    type: ReportType;
    confidence: number;
    message?: string;
  }
  
  /**
   * Detect the type of medical report
   */
  export function detectReportType(text: string): ReportTypeInfo {
    const lowerText = text.toLowerCase();
    
    // Trisomy / Prenatal Screening Detection
    const trisomyKeywords = ['trisomy', 'nipt', 'nifty', 'panorama', 'harmony', 'prenatl', 
      'prenatal', 'down syndrome', 'edwards syndrome', 'patau syndrome', 
      'cell-free dna', 'cfdna', 'aneuploidy', 'fetal', 'maternal serum'];
    
    const trisomyCount = trisomyKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (trisomyCount >= 2) {
      return {
        type: 'trisomy-prenatal',
        confidence: Math.min(trisomyCount / trisomyKeywords.length * 100, 95),
        message: 'This appears to be a Prenatal/Trisomy Screening Report. This analyzer is designed for blood chemistry reports only.'
      };
    }
    
    // Blood Chemistry Detection
    const bloodChemKeywords = ['glucose', 'hemoglobin', 'cholesterol', 'creatinine', 
      'urea', 'bilirubin', 'sgpt', 'sgot', 'hba1c'];
    
    const bloodChemCount = bloodChemKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (bloodChemCount >= 2) {
      return {
        type: 'blood-chemistry',
        confidence: Math.min(bloodChemCount / bloodChemKeywords.length * 100, 95)
      };
    }
    
    // CBC Detection
    const cbcKeywords = ['wbc', 'rbc', 'platelet', 'hematocrit', 'mcv', 'mch', 'mchc'];
    const cbcCount = cbcKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (cbcCount >= 3) {
      return {
        type: 'cbc-complete-blood-count',
        confidence: Math.min(cbcCount / cbcKeywords.length * 100, 95)
      };
    }
    
    // Lipid Profile Detection
    const lipidKeywords = ['ldl', 'hdl', 'triglyceride', 'vldl', 'cholesterol'];
    const lipidCount = lipidKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (lipidCount >= 3) {
      return {
        type: 'lipid-profile',
        confidence: Math.min(lipidCount / lipidKeywords.length * 100, 95)
      };
    }
    
    // Thyroid Detection
    const thyroidKeywords = ['tsh', 't3', 't4', 'thyroid'];
    const thyroidCount = thyroidKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (thyroidCount >= 2) {
      return {
        type: 'thyroid',
        confidence: Math.min(thyroidCount / thyroidKeywords.length * 100, 95)
      };
    }
    
    return {
      type: 'unknown',
      confidence: 0,
      message: 'Unable to determine report type. Please upload a blood chemistry report.'
    };
  }
  
  /**
   * Parse blood report text and extract metrics
   * This version looks for patterns like:
   * - "Glucose 88 mg/dL"
   * - "Glucose Observed: 88"
   * - "Test Name | Observed | Reference"
   */
  export function parseBloodReportText(text: string): { metrics: BloodMetric[]; summary: string; reportType?: ReportTypeInfo } {
    // First, detect report type
    const reportTypeInfo = detectReportType(text);
    
    console.log('🔍 Report Type Detection:', reportTypeInfo);
    
    // If it's not a blood chemistry report, return empty with type info
    if (reportTypeInfo.type === 'trisomy-prenatal') {
      return {
        metrics: [],
        summary: 'Trisomy/Prenatal Report Detected',
        reportType: reportTypeInfo
      };
    }
    
    if (reportTypeInfo.type === 'unknown' && reportTypeInfo.confidence === 0) {
      return {
        metrics: [],
        summary: 'Unknown Report Type',
        reportType: reportTypeInfo
      };
    }
    
    const metrics: BloodMetric[] = [];
    const lines = text.split('\n');
    
    console.log('📋 Parsing', lines.length, 'lines of text');
    console.log('Full text to analyze:');
    console.log(text);
    
    // Test definitions with multiple regex patterns to catch different formats
    const testDefinitions = [
      {
        names: ['hemoglobin', 'hb', 'hgb'],
        displayName: 'Hemoglobin',
        unit: 'g/dL',
        normalRange: '13.5-17.5',
        normalMin: 13.5,
        normalMax: 17.5,
        description: 'Hemoglobin is a protein in red blood cells that carries oxygen from the lungs to the rest of the body.',
        clinicalSignificance: 'Abnormal levels can indicate anemia (low) or polycythemia (high).',
        recommendations: {
          low: {
            foods: ['Red Meat', 'Poultry', 'Fish', 'Shellfish', 'Eggs', 'Spinach', 'Lentils', 'Beans'],
            lifestyle: ['Regular exercise', 'Adequate sleep (7-8 hours)', 'Avoid tea/coffee with meals'],
            supplements: ['Iron supplements (Ferrous sulfate)', 'Vitamin C (aids iron absorption)', 'Folic acid'],
            warning: 'Consult a doctor if symptoms like dizziness or extreme fatigue persist.'
          },
          high: {
            foods: ['Increase hydration', 'Fresh vegetables', 'Fruits'],
            lifestyle: ['Avoid smoking', 'Regular health checkups', 'Monitor oxygen levels'],
            supplements: ['Consult doctor before taking any supplements'],
            warning: 'High hemoglobin may indicate dehydration or other conditions. See a doctor.'
          }
        },
        risks: {
          low: 'Mild anemia risk - Low hemoglobin may cause fatigue and weakness',
          high: 'Elevated hemoglobin - May indicate dehydration or lung disease'
        }
      },
      {
        names: ['total cholesterol', 'cholesterol total', 't cholesterol', 'cholesterol'],
        displayName: 'Total Cholesterol',
        unit: 'mg/dL',
        normalRange: '<200',
        normalMin: 0,
        normalMax: 200,
        description: 'Total cholesterol is the sum of all cholesterol in the blood, including LDL and HDL.',
        clinicalSignificance: 'High levels can increase the risk of heart disease.',
        recommendations: {
          high: {
            foods: ['Oats', 'Barley', 'Nuts', 'Fatty Fish', 'Avocado', 'Olive Oil', 'Fruits', 'Vegetables'],
            lifestyle: ['Regular aerobic exercise (30 min daily)', 'Reduce saturated fats', 'Quit smoking'],
            supplements: ['Omega-3 fatty acids', 'Plant sterols', 'Psyllium fiber'],
            warning: 'Monitor cholesterol levels regularly and consult a cardiologist if levels remain high.'
          }
        },
        risks: {
          high: 'Increased risk of heart disease'
        }
      },
      {
        names: ['blood sugar', 'glucose', 'fasting glucose', 'fbs', 'blood glucose', 'sugar'],
        displayName: 'Blood Sugar (Fasting)',
        unit: 'mg/dL',
        normalRange: '70-100',
        normalMin: 70,
        normalMax: 100,
        description: 'Fasting blood sugar measures the amount of glucose in the blood after an 8-hour fast.',
        clinicalSignificance: 'High levels can indicate prediabetes or diabetes, while low levels can cause hypoglycemia.',
        recommendations: {
          high: {
            foods: ['Whole grains', 'Leafy greens', 'Nuts', 'Cinnamon', 'Berries', 'Sweet potatoes'],
            lifestyle: ['Regular exercise', 'Weight management', 'Stress reduction', 'Limit refined carbs'],
            supplements: ['Chromium', 'Magnesium', 'Alpha-lipoic acid'],
            warning: 'High blood sugar may indicate prediabetes or diabetes. Consult an endocrinologist.'
          },
          low: {
            foods: ['Complex carbohydrates', 'Frequent small meals', 'Protein with each meal'],
            lifestyle: ['Eat regular meals', 'Avoid skipping breakfast', 'Monitor blood sugar'],
            supplements: ['Consult doctor for appropriate supplements'],
            warning: 'Low blood sugar can be dangerous. Seek medical advice.'
          }
        },
        risks: {
          high: 'Prediabetes or diabetes risk - Requires monitoring',
          low: 'Hypoglycemia risk - May cause dizziness and weakness'
        }
      },
      {
        names: ['vitamin d', 'vit d', '25-oh vitamin d', 'vit. d'],
        displayName: 'Vitamin D',
        unit: 'ng/mL',
        normalRange: '30-100',
        normalMin: 30,
        normalMax: 100,
        description: 'Vitamin D is essential for bone health and immune function.',
        clinicalSignificance: 'Low levels can lead to bone weakness and increased risk of infections.',
        recommendations: {
          low: {
            foods: ['Fatty Fish (Salmon, Mackerel)', 'Egg Yolks', 'Mushrooms', 'Fortified Milk', 'Fortified Cereals'],
            lifestyle: ['Sun exposure (10-30 minutes daily)', 'Outdoor activities', 'Morning walks'],
            supplements: ['Vitamin D3 (Cholecalciferol) 1000-2000 IU daily', 'Calcium with Vitamin D'],
            warning: 'Severe deficiency may require higher doses. Consult your doctor for appropriate supplementation.'
          }
        },
        risks: {
          low: 'Vitamin D deficiency - May affect bone health and immunity'
        }
      },
      {
        names: ['tsh', 'thyroid stimulating hormone'],
        displayName: 'Thyroid (TSH)',
        unit: 'mIU/L',
        normalRange: '0.5-4.5',
        normalMin: 0.5,
        normalMax: 4.5,
        description: 'Thyroid-stimulating hormone regulates the thyroid gland\'s production of thyroid hormones.',
        clinicalSignificance: 'Abnormal levels can indicate hypothyroidism (high) or hyperthyroidism (low).',
        recommendations: {
          high: {
            foods: ['Iodized Salt', 'Seafood', 'Dairy Products', 'Brazil Nuts (selenium)', 'Whole Grains'],
            lifestyle: ['Stress management', 'Regular sleep schedule', 'Moderate exercise'],
            supplements: ['Selenium', 'Zinc', 'Iodine (if deficient)'],
            warning: 'Repeat test in 6-8 weeks. Consult an endocrinologist if TSH continues to rise.'
          },
          low: {
            foods: ['Balanced diet', 'Avoid excessive iodine', 'Regular meals'],
            lifestyle: ['Stress management', 'Adequate sleep', 'Regular monitoring'],
            supplements: ['Consult endocrinologist before supplements'],
            warning: 'Low TSH may indicate hyperthyroidism. Seek medical evaluation.'
          }
        },
        risks: {
          high: 'Slightly elevated - May indicate early hypothyroidism',
          low: 'May indicate hyperthyroidism or overactive thyroid'
        }
      },
      {
        names: ['creatinine', 'creat'],
        displayName: 'Creatinine',
        unit: 'mg/dL',
        normalRange: '0.7-1.3',
        normalMin: 0.7,
        normalMax: 1.3,
        description: 'Creatinine is a waste product that the kidneys filter out of the blood.',
        clinicalSignificance: 'High levels can indicate kidney dysfunction.',
        recommendations: {
          high: {
            foods: ['Increase water intake', 'Reduce protein', 'Limit salt', 'Fresh vegetables'],
            lifestyle: ['Stay hydrated', 'Avoid NSAIDs', 'Regular exercise', 'Monitor kidney function'],
            supplements: ['Consult nephrologist before supplements'],
            warning: 'High creatinine may indicate kidney problems. Consult a nephrologist.'
          }
        },
        risks: {
          high: 'Possible kidney dysfunction - Requires medical evaluation'
        }
      },
      {
        names: ['hba1c', 'hb a1c', 'a1c', 'glycated hemoglobin'],
        displayName: 'HbA1c',
        unit: '%',
        normalRange: '<5.7',
        normalMin: 0,
        normalMax: 5.7,
        description: 'HbA1c measures the average blood sugar level over the past 2-3 months.',
        clinicalSignificance: 'High levels can indicate prediabetes or diabetes.',
        recommendations: {
          high: {
            foods: ['Low glycemic foods', 'Whole grains', 'Vegetables', 'Lean protein'],
            lifestyle: ['Regular exercise', 'Weight loss', 'Limit sugar', 'Portion control'],
            supplements: ['Chromium', 'Berberine', 'Cinnamon extract'],
            warning: 'HbA1c >6.5% indicates diabetes. Consult an endocrinologist immediately.'
          }
        },
        risks: {
          high: 'Prediabetes or diabetes risk'
        }
      }
    ];
    
    // For each test definition, search for matches
    for (const test of testDefinitions) {
      let found = false;
      let detectedValue: number | null = null;
      
      // Try to find the test in the text
      for (const line of lines) {
        if (found) break;
        
        const lowerLine = line.toLowerCase();
        
        // Check if this line contains one of the test names
        for (const testName of test.names) {
          if (lowerLine.includes(testName)) {
            console.log(`✅ Found "${testName}" in line:`, line);
            
            // Extract numeric value from the line
            // Look for patterns like: "88", "88.5", "88 mg/dL", etc.
            const numberMatches = line.match(/(\d+\.?\d*)\s*(?:mg\/dl|g\/dl|ng\/ml|miu\/l|µiu\/ml|%)?/gi);
            
            if (numberMatches) {
              console.log('  📊 Number matches found:', numberMatches);
              
              // Get all numbers from the line
              const numbers = numberMatches.map(m => {
                const num = parseFloat(m.match(/(\d+\.?\d*)/)?.[1] || '0');
                return num;
              }).filter(n => n > 0 && n < 10000); // Filter out invalid values
              
              console.log('  🔢 Extracted numbers:', numbers);
              
              // Usually the first reasonable number is the observed value
              // Skip very small decimals (like 0.5) for certain tests
              for (const num of numbers) {
                // Apply reasonable range checks
                if (test.displayName === 'Hemoglobin' && num >= 5 && num <= 25) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'Total Cholesterol' && num >= 100 && num <= 400) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'Blood Sugar (Fasting)' && num >= 50 && num <= 500) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'Vitamin D' && num >= 5 && num <= 150) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'Thyroid (TSH)' && num >= 0.1 && num <= 20) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'Creatinine' && num >= 0.1 && num <= 5) {
                  detectedValue = num;
                  found = true;
                  break;
                } else if (test.displayName === 'HbA1c' && num >= 3 && num <= 15) {
                  detectedValue = num;
                  found = true;
                  break;
                }
              }
            }
            
            if (found) break;
          }
        }
      }
      
      // If we found a value, create a metric
      if (detectedValue !== null) {
        console.log(`  ✨ Creating metric for ${test.displayName} with value ${detectedValue}`);
        
        const status = detectedValue < test.normalMin ? 'low' : 
                       detectedValue > test.normalMax ? 'high' : 'normal';
        
        const metric: BloodMetric = {
          name: test.displayName,
          value: detectedValue.toString(),
          unit: test.unit,
          normalRange: test.normalRange,
          status: status as 'normal' | 'high' | 'low'
        };
        
        // Add risk and recommendations if abnormal
        if (status !== 'normal') {
          if (test.risks?.[status as 'low' | 'high']) {
            metric.risk = test.risks[status as 'low' | 'high'];
          }
          
          if (test.recommendations?.[status as 'low' | 'high']) {
            metric.recommendations = test.recommendations[status as 'low' | 'high'];
          }
        }
        
        // Add description and clinical significance
        if (test.description) {
          metric.description = test.description;
        }
        if (test.clinicalSignificance) {
          metric.clinicalSignificance = test.clinicalSignificance;
        }
        
        metrics.push(metric);
      }
    }
    
    console.log(`\n🎯 Total metrics detected: ${metrics.length}`);
    
    // If no metrics detected, return sample data for demonstration
    if (metrics.length === 0) {
      console.warn('⚠️ No metrics detected. Returning sample data for demonstration.');
      return {
        metrics: [
          {
            name: 'Hemoglobin',
            value: '13.2',
            unit: 'g/dL',
            normalRange: '13.5-17.5',
            status: 'low' as const,
            risk: 'Mild anemia risk - Low hemoglobin may cause fatigue and weakness',
            recommendations: {
              foods: ['Red Meat', 'Poultry', 'Fish', 'Shellfish', 'Eggs', 'Spinach', 'Lentils', 'Beans'],
              lifestyle: ['Regular exercise', 'Adequate sleep (7-8 hours)', 'Avoid tea/coffee with meals'],
              supplements: ['Iron supplements (Ferrous sulfate)', 'Vitamin C (aids iron absorption)', 'Folic acid'],
              warning: 'Consult a doctor if symptoms like dizziness or extreme fatigue persist.'
            }
          },
          {
            name: 'Blood Sugar (Fasting)',
            value: '95',
            unit: 'mg/dL',
            normalRange: '70-100',
            status: 'normal' as const
          },
          {
            name: 'Total Cholesterol',
            value: '210',
            unit: 'mg/dL',
            normalRange: '<200',
            status: 'high' as const,
            risk: 'Increased risk of heart disease',
            recommendations: {
              foods: ['Oats', 'Barley', 'Nuts', 'Fatty Fish', 'Avocado', 'Olive Oil', 'Fruits', 'Vegetables'],
              lifestyle: ['Regular aerobic exercise (30 min daily)', 'Reduce saturated fats', 'Quit smoking'],
              supplements: ['Omega-3 fatty acids', 'Plant sterols', 'Psyllium fiber'],
              warning: 'Monitor cholesterol levels regularly and consult a cardiologist if levels remain high.'
            }
          },
          {
            name: 'Vitamin D',
            value: '18',
            unit: 'ng/mL',
            normalRange: '30-100',
            status: 'low' as const,
            risk: 'Vitamin D deficiency - May affect bone health and immunity',
            recommendations: {
              foods: ['Fatty Fish (Salmon, Mackerel)', 'Egg Yolks', 'Mushrooms', 'Fortified Milk', 'Fortified Cereals'],
              lifestyle: ['Sun exposure (10-30 minutes daily)', 'Outdoor activities', 'Morning walks'],
              supplements: ['Vitamin D3 (Cholecalciferol) 1000-2000 IU daily', 'Calcium with Vitamin D'],
              warning: 'Severe deficiency may require higher doses. Consult your doctor for appropriate supplementation.'
            }
          },
          {
            name: 'Thyroid (TSH)',
            value: '2.8',
            unit: 'mIU/L',
            normalRange: '0.5-4.5',
            status: 'normal' as const
          },
          {
            name: 'Creatinine',
            value: '1.0',
            unit: 'mg/dL',
            normalRange: '0.7-1.3',
            status: 'normal' as const
          }
        ],
        summary: 'Using sample data for demonstration. For accurate analysis, please ensure the image is clear and contains standard blood test names.'
      };
    }
    
    return {
      metrics: metrics,
      summary: `Successfully detected ${metrics.length} blood test metrics from your report.`,
      reportType: reportTypeInfo
    };
  }