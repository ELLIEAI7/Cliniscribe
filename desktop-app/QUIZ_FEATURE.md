# Quiz Feature Documentation

🎯 **Interactive quiz generation from lecture transcriptions**

## Overview

The quiz feature automatically generates multiple-choice questions based on the transcribed and summarized lecture content. Students can test their knowledge immediately after processing a lecture.

---

## ✨ Features

### Current Implementation (v1.0.0)

✅ **Interactive Quiz UI**
- Multiple choice questions (4 options each)
- One question at a time interface
- Progress tracking
- Check answer with explanations
- Full review at end with score

✅ **Smart Question Generation**
- Subject-specific questions (Anatomy, Physiology, Pharmacology, etc.)
- 5 questions per quiz
- Randomized from question bank
- Educational explanations for each answer

✅ **User Experience**
- Tab-based interface (Notes | Quiz)
- Visual feedback (correct/incorrect)
- Retake quiz option
- Score calculation with performance feedback

### Planned for v2.0.0

🔮 **AI-Generated Questions** (from actual lecture content)
- LLM generates questions directly from study notes
- Context-aware questions specific to the lecture
- Adjustable difficulty levels
- More question types (true/false, fill-in-blank)

---

## 🎬 How It Works

### User Flow

```
1. User uploads lecture audio
   ↓
2. Audio is transcribed → Study notes generated
   ↓
3. Quiz questions generated from content
   ↓
4. User clicks "Quiz" tab
   ↓
5. Takes quiz → Gets score → Reviews answers
   ↓
6. Can retake quiz anytime
```

###Current Architecture (Mock Data)

```typescript
// When audio processing completes:
const quizQuestions = generateMockQuiz(subject, 5);

// Questions are added to result:
{
  transcript: {...},
  summary: {...},
  metadata: {...},
  quiz: [
    {
      question: "...",
      options: ["A", "B", "C", "D"],
      correct_answer: 1,
      explanation: "..."
    }
  ]
}
```

### Future Architecture (LLM-Generated)

```python
# Backend API endpoint (to be implemented)
@app.post("/api/generate-quiz")
async def generate_quiz(notes: str, subject: str, num_questions: int = 5):
    prompt = f"""
    Based on these study notes about {subject}, generate {num_questions}
    multiple-choice questions to test understanding.

    Notes: {notes}

    Format each question as JSON with:
    - question: the question text
    - options: array of 4 possible answers
    - correct_answer: index of correct option (0-3)
    - explanation: why the answer is correct
    """

    quiz = await llm.generate(prompt)
    return quiz
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── Quiz/
│   │   └── QuizComponent.tsx       # Main quiz UI component
│   └── Dashboard/
│       ├── ResultsPanel.tsx        # Includes quiz tab
│       └── UploadCard.tsx          # Triggers quiz generation
└── utils/
    └── mockQuizGenerator.ts        # Mock quiz data (temporary)
```

---

## 🔧 Component API

### QuizComponent

**Props:**
```typescript
interface QuizComponentProps {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;  // Index (0-3)
  explanation: string;
}
```

**Usage:**
```tsx
import QuizComponent from './Quiz/QuizComponent';

<QuizComponent questions={quizQuestions} />
```

### Mock Quiz Generator

**Current (Demo):**
```typescript
import { generateMockQuiz } from './utils/mockQuizGenerator';

// Generate 5 random questions for a subject
const quiz = generateMockQuiz('anatomy', 5);
```

**Future (Real LLM):**
```typescript
import { generateQuizFromNotes } from './utils/mockQuizGenerator';

// Will call backend API
const quiz = await generateQuizFromNotes(
  studyNotes,   // The AI-generated notes
  'anatomy',     // Subject
  5             // Number of questions
);
```

---

## 🚀 Integration Guide

### Step 1: Backend API (To Be Implemented)

Create a new API endpoint in your FastAPI backend:

```python
# backend/app/main.py

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class QuizRequest(BaseModel):
    notes: str
    subject: str
    num_questions: int = 5

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    correct_answer: int
    explanation: str

@router.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest) -> list[QuizQuestion]:
    """
    Generate quiz questions from study notes using LLM
    """
    # Construct prompt for Llama
    prompt = construct_quiz_prompt(
        notes=request.notes,
        subject=request.subject,
        num_questions=request.num_questions
    )

    # Call Llama model
    response = await llm_client.generate(prompt)

    # Parse response into structured quiz questions
    questions = parse_quiz_response(response)

    return questions

def construct_quiz_prompt(notes: str, subject: str, num_questions: int) -> str:
    """
    Create a prompt that generates well-structured quiz questions
    """
    return f"""You are a medical education expert. Based on these study notes about {subject},
create {num_questions} multiple-choice questions to test student understanding.

Study Notes:
{notes}

Generate questions that:
1. Test key concepts from the notes
2. Have one clearly correct answer
3. Include 3 plausible distractors
4. Cover different difficulty levels
5. Include an educational explanation

Format your response as JSON array:
[
  {{
    "question": "What is...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": 1,
    "explanation": "The correct answer is B because..."
  }},
  ...
]
"""
```

### Step 2: Update Frontend to Call API

Replace the mock data in `UploadCard.tsx`:

```typescript
// BEFORE (mock):
const quizQuestions = generateMockQuiz(subject || 'general', 5);

// AFTER (real API):
const quizResponse = await fetch('http://localhost:8080/api/generate-quiz', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    notes: result.summary,  // The AI-generated study notes
    subject: subject || 'general',
    num_questions: 5
  })
});

const quizQuestions = await quizResponse.json();
```

### Step 3: Remove Mock Data

Once the backend is working, remove:
```bash
rm src/utils/mockQuizGenerator.ts
```

---

## 🎨 UI Screenshots

### Notes Tab
```
┌─────────────────────────────────────────────┐
│ Your Study Materials                        │
│ lecture.mp3 • 45 min 30 sec                 │
│                                             │
│ [📝 Study Notes] [🎯 Quiz (5)]             │
├─────────────────────────────────────────────┤
│                                             │
│ • Introduction to Cell Biology              │
│   - Prokaryotic vs Eukaryotic cells         │
│   - Cell membrane structure...              │
│                                             │
└─────────────────────────────────────────────┘
```

### Quiz Tab
```
┌─────────────────────────────────────────────┐
│ Question 1 of 5              ✅ All answered │
│ [████████░░] 40%                            │
├─────────────────────────────────────────────┤
│                                             │
│ What is the primary function of             │
│ mitochondria?                               │
│                                             │
│ ○ Energy production through ATP (selected)  │
│ ○ Protein synthesis                         │
│ ○ DNA replication                           │
│ ○ Waste disposal                            │
│                                             │
│ [Check Answer]      [← Previous] [Next →]  │
└─────────────────────────────────────────────┘
```

### Results View
```
┌─────────────────────────────────────────────┐
│         Quiz Complete! 🎉                   │
│                                             │
│              80%                            │
│                                             │
│   You got 4 out of 5 correct                │
│   Good job! You understand most concepts 👍 │
│                                             │
│ ───────────────────────────────────────────│
│ Review Your Answers:                        │
│                                             │
│ ✅ 1. What is the primary function...       │
│    Your answer: Energy production ✓         │
│    💡 Mitochondria are the powerhouse...    │
│                                             │
│ ❌ 2. Which bone is the longest...          │
│    Your answer: Humerus                     │
│    Correct answer: Femur                    │
│    💡 The femur is the longest bone...      │
│                                             │
│         [🔄 Retake Quiz]                    │
└─────────────────────────────────────────────┘
```

---

## 💡 Question Quality Guidelines

When implementing LLM-generated questions, ensure:

### Good Questions:
✅ **Test understanding, not memorization**
```
Good: "Why does the mitochondria need a double membrane?"
Bad: "What year was the mitochondria discovered?"
```

✅ **Have plausible distractors**
```
Good distractors:
- Mitochondria produces ATP (correct)
- Mitochondria stores glucose (related but wrong)
- Mitochondria synthesizes DNA (plausible misconception)
- Mitochondria filters waste (sounds reasonable)

Bad distractors:
- Mitochondria dances
- Mitochondria is purple
```

✅ **Clear and unambiguous**
```
Good: "What is the MAIN function of red blood cells?"
Bad: "What do red blood cells do sometimes maybe?"
```

✅ **Educational explanations**
```
Good: "The correct answer is B because mitochondria use
oxygen to break down glucose in cellular respiration,
producing 36-38 ATP molecules per glucose."

Bad: "B is right."
```

---

## 🧪 Testing the Feature

### Manual Testing Checklist

- [ ] **Upload audio** → Process → Click Quiz tab
- [ ] **Verify 5 questions** appear
- [ ] **Select answers** for all questions
- [ ] **Check answer** shows correct/incorrect
- [ ] **Submit quiz** shows score
- [ ] **Review answers** shows all Q&A with explanations
- [ ] **Retake quiz** resets state correctly
- [ ] **Different subjects** show different questions
- [ ] **Quiz badge** shows question count (🎯 Quiz (5))

### Unit Testing

```typescript
// src/components/Quiz/QuizComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import QuizComponent from './QuizComponent';

test('displays all questions', () => {
  const questions = [/* mock questions */];
  render(<QuizComponent questions={questions} />);
  expect(screen.getByText(/Question 1 of 5/)).toBeInTheDocument();
});

test('calculates score correctly', () => {
  // Test scoring logic
});
```

---

## 📊 Analytics (Future)

Track quiz performance to improve question quality:

```typescript
interface QuizAnalytics {
  quiz_id: string;
  lecture_id: string;
  subject: string;
  score: number;
  time_taken: number;
  questions_answered: number;
  retake_count: number;
}

// Send to analytics backend
await fetch('/api/analytics/quiz', {
  method: 'POST',
  body: JSON.stringify(analytics)
});
```

---

## 🔮 Future Enhancements

### v2.0 (LLM Integration)
- [ ] Real-time question generation from notes
- [ ] Adjustable difficulty slider
- [ ] More question types (true/false, fill-in-blank, matching)
- [ ] Hint system

### v3.0 (Advanced Features)
- [ ] Spaced repetition scheduling
- [ ] Performance tracking over time
- [ ] Export quizzes to Anki/Quizlet
- [ ] Quiz sharing with classmates
- [ ] Timed quiz mode
- [ ] Question difficulty ratings

---

## 🐛 Troubleshooting

**Quiz tab shows "No quiz questions available"**
- Check that quiz data is in the result object
- Verify `generateMockQuiz()` is being called
- Check browser console for errors

**Questions don't match lecture content**
- This is expected with mock data!
- Questions are subject-based, not content-specific
- Will be fixed when LLM integration is complete

**Quiz won't submit**
- Ensure all questions are answered
- Check for JavaScript errors in console
- Verify state management is working

---

## 📚 Resources

- [Quiz Component Code](./src/components/Quiz/QuizComponent.tsx)
- [Mock Data Generator](./src/utils/mockQuizGenerator.ts)
- [Results Panel Integration](./src/components/Dashboard/ResultsPanel.tsx)

---

**Created:** December 2024
**Last Updated:** December 2024
**Status:** ✅ UI Complete | ⏳ Backend Pending
