// Synthetic waveform data generator for MAiZU pulse diagnostics

export interface PulseDataPoint {
  time: number
  amplitude: number
  systolic: number
  diastolic: number
}

export interface PulseQuality {
  name: string
  description: string
  confidence: number
  features: string[]
}

export interface TCMPattern {
  name: string
  category: string
  description: string
  confidence: number
  associatedQualities: string[]
  recommendations: string[]
}

export interface DiagnosticSnapshot {
  id: string
  timestamp: string
  patientId: string
  pulseQualities: PulseQuality[]
  patterns: TCMPattern[]
  overallConfidence: number
  waveformData: PulseDataPoint[]
  metadata: {
    sampleRate: number
    duration: number
    position: string
    pressure: string
  }
  rationale: string
  clarificationQuestions: string[]
}

export interface PipelineStatus {
  stage: string
  status: "completed" | "processing" | "pending" | "error"
  timestamp: string
  details: string
}

// Generate synthetic pulse waveform data
export function generateWaveformData(
  type: "wiry" | "slippery" | "thready" | "rapid" | "normal" = "normal",
  points = 200
): PulseDataPoint[] {
  const data: PulseDataPoint[] = []
  for (let i = 0; i < points; i++) {
    const t = (i / points) * 4 * Math.PI
    let amplitude: number
    let systolic: number
    let diastolic: number

    switch (type) {
      case "wiry":
        amplitude = Math.sin(t) * 0.8 + Math.sin(3 * t) * 0.3 + Math.sin(5 * t) * 0.1
        systolic = 0.9 + Math.sin(t * 2) * 0.15
        diastolic = 0.3 + Math.sin(t * 1.5) * 0.08
        break
      case "slippery":
        amplitude = Math.sin(t) * 0.7 + Math.sin(2 * t) * 0.4 + Math.cos(t * 0.5) * 0.2
        systolic = 0.85 + Math.sin(t * 1.8) * 0.2
        diastolic = 0.4 + Math.cos(t * 1.2) * 0.12
        break
      case "thready":
        amplitude = Math.sin(t) * 0.3 + Math.sin(4 * t) * 0.05
        systolic = 0.5 + Math.sin(t * 2.5) * 0.08
        diastolic = 0.2 + Math.sin(t * 2) * 0.04
        break
      case "rapid":
        amplitude = Math.sin(t * 1.6) * 0.6 + Math.sin(3.2 * t) * 0.2
        systolic = 0.8 + Math.sin(t * 3) * 0.12
        diastolic = 0.35 + Math.sin(t * 2.5) * 0.06
        break
      default:
        amplitude = Math.sin(t) * 0.6 + Math.sin(2 * t) * 0.2 + Math.sin(3 * t) * 0.05
        systolic = 0.75 + Math.sin(t * 2) * 0.1
        diastolic = 0.35 + Math.sin(t * 1.5) * 0.06
    }

    data.push({
      time: Number((i * 0.02).toFixed(3)),
      amplitude: Number(amplitude.toFixed(4)),
      systolic: Number(systolic.toFixed(4)),
      diastolic: Number(diastolic.toFixed(4)),
    })
  }
  return data
}

// Mock diagnostic snapshots
export const mockDiagnostics: DiagnosticSnapshot[] = [
  {
    id: "DX-2026-001",
    timestamp: "2026-02-22T10:30:00Z",
    patientId: "SYN-P001",
    pulseQualities: [
      {
        name: "Wiry (Xian)",
        description: "Pulse feels taut like a guitar string, with significant tension on palpation",
        confidence: 0.87,
        features: ["High tension", "Narrow width", "Sharp peak", "Sustained force"],
      },
      {
        name: "Rapid (Shuo)",
        description: "Pulse rate exceeds 90 beats per minute with maintained regularity",
        confidence: 0.72,
        features: ["Elevated rate", "Regular rhythm", "Quick succession"],
      },
    ],
    patterns: [
      {
        name: "Liver Qi Stagnation",
        category: "Qi Disorder",
        description: "Stagnation of Liver Qi leading to impaired flow of Qi throughout the body",
        confidence: 0.84,
        associatedQualities: ["Wiry (Xian)"],
        recommendations: [
          "Consider Qi-moving herbal formulas",
          "Stress reduction techniques recommended",
          "Acupuncture points: LR3, LR14, GB34",
        ],
      },
      {
        name: "Heat Pattern",
        category: "Thermal Disorder",
        description: "Presence of pathological Heat affecting pulse dynamics",
        confidence: 0.68,
        associatedQualities: ["Rapid (Shuo)"],
        recommendations: [
          "Evaluate for Heat-clearing strategies",
          "Monitor for additional Heat signs",
          "Consider cooling dietary adjustments",
        ],
      },
    ],
    overallConfidence: 0.82,
    waveformData: generateWaveformData("wiry"),
    metadata: {
      sampleRate: 500,
      duration: 30,
      position: "Left Guan (Middle)",
      pressure: "Medium",
    },
    rationale:
      "The waveform exhibits characteristic tension patterns with sharp systolic peaks and rapid return, consistent with Wiry pulse quality (confidence: 87%). The elevated beat frequency in conjunction with the Wiry quality strongly correlates with Liver Qi Stagnation with secondary Heat pattern. The amplitude profile shows maintained force through the pulse cycle, further supporting the Qi stagnation diagnosis.",
    clarificationQuestions: [
      "Is the patient experiencing emotional stress or irritability?",
      "Are there concurrent symptoms of distension in the hypochondrium?",
      "Has the patient recently consumed stimulants or caffeine?",
    ],
  },
  {
    id: "DX-2026-002",
    timestamp: "2026-02-22T11:15:00Z",
    patientId: "SYN-P002",
    pulseQualities: [
      {
        name: "Slippery (Hua)",
        description: "Pulse feels smooth and flowing, like beads rolling on a plate",
        confidence: 0.91,
        features: ["Smooth flow", "Round profile", "Fluid movement", "Easy to detect"],
      },
      {
        name: "Thready (Xi)",
        description: "Pulse is thin and fine, like a silk thread under the fingers",
        confidence: 0.65,
        features: ["Narrow diameter", "Soft force", "Fine quality"],
      },
    ],
    patterns: [
      {
        name: "Phlegm-Dampness",
        category: "Fluid Disorder",
        description: "Accumulation of Phlegm and Dampness impairing normal fluid metabolism",
        confidence: 0.88,
        associatedQualities: ["Slippery (Hua)"],
        recommendations: [
          "Consider Phlegm-resolving formulas",
          "Dietary modification to reduce Dampness",
          "Acupuncture points: ST40, SP9, CV12",
        ],
      },
      {
        name: "Blood Deficiency",
        category: "Blood Disorder",
        description: "Insufficient Blood to fill the vessels adequately",
        confidence: 0.61,
        associatedQualities: ["Thready (Xi)"],
        recommendations: [
          "Blood-nourishing herbal strategies",
          "Nutritional assessment recommended",
          "Monitor for pallor and fatigue",
        ],
      },
    ],
    overallConfidence: 0.78,
    waveformData: generateWaveformData("slippery"),
    metadata: {
      sampleRate: 500,
      duration: 30,
      position: "Right Cun (Front)",
      pressure: "Light to Medium",
    },
    rationale:
      "Waveform analysis reveals a distinctive smooth, rounded profile with consistent flow characteristics typical of Slippery pulse (confidence: 91%). The secondary fine quality with reduced amplitude suggests concurrent Thready characteristics. This combined pattern strongly maps to Phlegm-Dampness as the primary pattern with underlying Blood Deficiency.",
    clarificationQuestions: [
      "Does the patient experience heaviness in the limbs or head?",
      "Is there a history of digestive issues or poor appetite?",
      "Has the patient noted increased phlegm production?",
    ],
  },
  {
    id: "DX-2026-003",
    timestamp: "2026-02-22T14:00:00Z",
    patientId: "SYN-P003",
    pulseQualities: [
      {
        name: "Thready (Xi)",
        description: "Pulse is thin and fine, like a silk thread under the fingers",
        confidence: 0.83,
        features: ["Narrow diameter", "Soft force", "Fine quality", "Weak at deep level"],
      },
    ],
    patterns: [
      {
        name: "Qi Deficiency",
        category: "Qi Disorder",
        description: "Insufficient Qi to drive pulse with adequate force",
        confidence: 0.79,
        associatedQualities: ["Thready (Xi)"],
        recommendations: [
          "Qi-tonifying herbal formulas",
          "Rest and recuperation emphasized",
          "Acupuncture points: ST36, CV6, LU9",
        ],
      },
    ],
    overallConfidence: 0.79,
    waveformData: generateWaveformData("thready"),
    metadata: {
      sampleRate: 500,
      duration: 30,
      position: "Right Chi (Rear)",
      pressure: "Deep",
    },
    rationale:
      "The waveform demonstrates consistently low amplitude with fine oscillation patterns characteristic of Thready pulse (confidence: 83%). The diminished force throughout all pressure levels points to underlying Qi Deficiency as the primary diagnostic pattern.",
    clarificationQuestions: [
      "Does the patient experience chronic fatigue or shortness of breath?",
      "Is there spontaneous sweating or cold extremities?",
      "What is the patient's current energy level on a scale of 1-10?",
    ],
  },
]

export const mockPipelineStages: PipelineStatus[] = [
  {
    stage: "S3 Ingestion",
    status: "completed",
    timestamp: "2026-02-22T10:28:15Z",
    details: "Waveform file uploaded to s3://maizu-raw/waveforms/SYN-P001.csv",
  },
  {
    stage: "Lambda Normalization",
    status: "completed",
    timestamp: "2026-02-22T10:28:32Z",
    details: "Time-series metadata converted to structured text descriptors",
  },
  {
    stage: "Bedrock Feature Extraction",
    status: "completed",
    timestamp: "2026-02-22T10:29:05Z",
    details: "Claude 3.5 Sonnet extracted: frequency=78bpm, rhythm=regular, amplitude=high",
  },
  {
    stage: "TCM Pattern Matching",
    status: "completed",
    timestamp: "2026-02-22T10:29:28Z",
    details: "Nova Pro mapped features to Liver Qi Stagnation (84%) via custom rubric",
  },
  {
    stage: "Confidence Scoring",
    status: "completed",
    timestamp: "2026-02-22T10:29:45Z",
    details: "Weighted scoring: model certainty (0.87) x signal completeness (0.94) = 0.82",
  },
  {
    stage: "API Response",
    status: "completed",
    timestamp: "2026-02-22T10:30:00Z",
    details: "Diagnostic Snapshot DX-2026-001 served via API Gateway",
  },
]
