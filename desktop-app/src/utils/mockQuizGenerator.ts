// Mock quiz generator for demonstration
// In production, this will be replaced by LLM-generated questions from the backend

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

// Sample quiz questions by subject
const sampleQuizzes: Record<string, QuizQuestion[]> = {
  anatomy: [
    {
      question: "What is the primary function of the mitochondria in a cell?",
      options: [
        "Energy production through ATP synthesis",
        "Protein synthesis",
        "DNA replication",
        "Waste disposal"
      ],
      correct_answer: 0,
      explanation: "Mitochondria are the powerhouse of the cell, responsible for producing ATP (adenosine triphosphate) through cellular respiration, which provides energy for cellular processes."
    },
    {
      question: "Which bone is the longest in the human body?",
      options: [
        "Humerus",
        "Femur",
        "Tibia",
        "Fibula"
      ],
      correct_answer: 1,
      explanation: "The femur (thighbone) is the longest, strongest, and heaviest bone in the human body, extending from the hip to the knee."
    },
    {
      question: "What are the three layers of the heart wall, from outer to inner?",
      options: [
        "Epicardium, myocardium, endocardium",
        "Myocardium, epicardium, endocardium",
        "Endocardium, myocardium, epicardium",
        "Pericardium, myocardium, endocardium"
      ],
      correct_answer: 0,
      explanation: "The heart wall consists of three layers: epicardium (outer), myocardium (middle muscular layer), and endocardium (inner lining)."
    },
    {
      question: "Which part of the brain controls balance and coordination?",
      options: [
        "Cerebrum",
        "Cerebellum",
        "Medulla oblongata",
        "Hypothalamus"
      ],
      correct_answer: 1,
      explanation: "The cerebellum, located at the back of the brain, is responsible for coordinating voluntary movements, maintaining balance, and motor learning."
    },
    {
      question: "What is the functional unit of the kidney?",
      options: [
        "Alveolus",
        "Nephron",
        "Hepatocyte",
        "Neuron"
      ],
      correct_answer: 1,
      explanation: "The nephron is the basic structural and functional unit of the kidney, responsible for filtering blood and producing urine."
    }
  ],

  physiology: [
    {
      question: "What is the normal pH range of human blood?",
      options: [
        "6.8 - 7.0",
        "7.35 - 7.45",
        "7.8 - 8.0",
        "8.0 - 8.5"
      ],
      correct_answer: 1,
      explanation: "Normal blood pH is tightly regulated between 7.35 and 7.45. Values outside this range can indicate metabolic or respiratory disorders."
    },
    {
      question: "During which phase of the cardiac cycle does the heart fill with blood?",
      options: [
        "Systole",
        "Diastole",
        "Isovolumetric contraction",
        "Ejection"
      ],
      correct_answer: 1,
      explanation: "Diastole is the relaxation phase of the cardiac cycle when the heart chambers fill with blood. Systole is the contraction phase when blood is pumped out."
    },
    {
      question: "What hormone is primarily responsible for regulating blood glucose levels?",
      options: [
        "Cortisol",
        "Insulin",
        "Thyroxine",
        "Adrenaline"
      ],
      correct_answer: 1,
      explanation: "Insulin, produced by beta cells in the pancreas, lowers blood glucose by facilitating cellular glucose uptake and storage."
    },
    {
      question: "What is the primary site of gas exchange in the lungs?",
      options: [
        "Bronchi",
        "Bronchioles",
        "Alveoli",
        "Trachea"
      ],
      correct_answer: 2,
      explanation: "Alveoli are tiny air sacs in the lungs where oxygen and carbon dioxide are exchanged between the air and blood through diffusion."
    },
    {
      question: "Which type of muscle tissue is striated and involuntary?",
      options: [
        "Skeletal muscle",
        "Cardiac muscle",
        "Smooth muscle",
        "None of the above"
      ],
      correct_answer: 1,
      explanation: "Cardiac muscle is both striated (having visible bands) and involuntary (not under conscious control), unique among muscle types."
    }
  ],

  pharmacology: [
    {
      question: "What is the mechanism of action of aspirin?",
      options: [
        "Blocks sodium channels",
        "Inhibits COX enzymes",
        "Activates opioid receptors",
        "Blocks calcium channels"
      ],
      correct_answer: 1,
      explanation: "Aspirin irreversibly inhibits cyclooxygenase (COX) enzymes, reducing prostaglandin synthesis and thereby providing anti-inflammatory, antipyretic, and antiplatelet effects."
    },
    {
      question: "Which class of antibiotics works by inhibiting bacterial cell wall synthesis?",
      options: [
        "Tetracyclines",
        "Macrolides",
        "Penicillins",
        "Fluoroquinolones"
      ],
      correct_answer: 2,
      explanation: "Penicillins and other beta-lactam antibiotics inhibit bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to bacterial cell lysis."
    },
    {
      question: "What is the antidote for warfarin overdose?",
      options: [
        "Protamine sulfate",
        "Vitamin K",
        "Naloxone",
        "Flumazenil"
      ],
      correct_answer: 1,
      explanation: "Vitamin K is the specific antidote for warfarin overdose, as warfarin works by inhibiting vitamin K-dependent clotting factors."
    },
    {
      question: "Which medication class is considered first-line for hypertension in diabetic patients?",
      options: [
        "Beta blockers",
        "Calcium channel blockers",
        "ACE inhibitors",
        "Diuretics"
      ],
      correct_answer: 2,
      explanation: "ACE inhibitors are first-line for hypertension in diabetic patients because they provide renal protection and reduce proteinuria in addition to lowering blood pressure."
    },
    {
      question: "What is the half-life definition?",
      options: [
        "Time for drug to reach peak concentration",
        "Time for 50% of drug to be eliminated",
        "Time for drug to start working",
        "Time between doses"
      ],
      correct_answer: 1,
      explanation: "Half-life (t½) is the time required for the plasma concentration of a drug to decrease by 50%, determining dosing frequency."
    }
  ],

  general: [
    {
      question: "What are the four vital signs commonly measured in clinical practice?",
      options: [
        "Heart rate, blood pressure, temperature, respiratory rate",
        "Heart rate, oxygen saturation, glucose, blood pressure",
        "Temperature, pulse, reflexes, pupil response",
        "Blood pressure, weight, height, temperature"
      ],
      correct_answer: 0,
      explanation: "The four traditional vital signs are heart rate (pulse), blood pressure, body temperature, and respiratory rate. Some sources also include pain level and oxygen saturation as additional vital signs."
    },
    {
      question: "What does the acronym SOAP stand for in medical documentation?",
      options: [
        "Signs, Observations, Assessment, Plan",
        "Subjective, Objective, Assessment, Plan",
        "Symptoms, Onset, Assessment, Prescription",
        "Source, Objective, Analysis, Protocol"
      ],
      correct_answer: 1,
      explanation: "SOAP notes include Subjective data (patient's complaints), Objective data (measurable findings), Assessment (diagnosis), and Plan (treatment strategy)."
    },
    {
      question: "What is the normal range for adult resting heart rate?",
      options: [
        "40-60 beats per minute",
        "60-100 beats per minute",
        "80-120 beats per minute",
        "100-140 beats per minute"
      ],
      correct_answer: 1,
      explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute. Athletes may have lower resting rates due to cardiovascular fitness."
    },
    {
      question: "Which body fluid has the highest pH (most alkaline)?",
      options: [
        "Gastric juice",
        "Blood",
        "Pancreatic secretions",
        "Urine"
      ],
      correct_answer: 2,
      explanation: "Pancreatic secretions have a pH of 8-8.3, making them the most alkaline body fluid, which helps neutralize acidic chyme from the stomach."
    },
    {
      question: "What is the medical term for low blood sugar?",
      options: [
        "Hyperglycemia",
        "Hypoglycemia",
        "Hypoxemia",
        "Hyponatremia"
      ],
      correct_answer: 1,
      explanation: "Hypoglycemia refers to abnormally low blood glucose levels (typically <70 mg/dL), which can cause symptoms like shakiness, confusion, and sweating."
    }
  ]
};

/**
 * Generates mock quiz questions based on the subject
 * In production, this will be replaced by LLM-generated questions from the study notes
 */
export function generateMockQuiz(subject?: string, numQuestions: number = 5): QuizQuestion[] {
  // Determine which quiz bank to use
  const subjectKey = subject?.toLowerCase() || 'general';
  const quizBank = sampleQuizzes[subjectKey] || sampleQuizzes.general;

  // Shuffle and select random questions
  const shuffled = [...quizBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
}

/**
 * Future function: Will call the backend API to generate questions from study notes
 * This is where we'll integrate with the LLM
 */
export async function generateQuizFromNotes(
  studyNotes: string,
  subject?: string,
  numQuestions: number = 5
): Promise<QuizQuestion[]> {
  // TODO: Call backend API endpoint
  // const response = await fetch('http://localhost:8080/api/generate-quiz', {
  //   method: 'POST',
  //   body: JSON.stringify({ notes: studyNotes, subject, num_questions: numQuestions })
  // });
  // return response.json();

  // For now, return mock data
  console.log('Would generate quiz from notes:', studyNotes.substring(0, 100) + '...');
  return generateMockQuiz(subject, numQuestions);
}

export type { QuizQuestion };
