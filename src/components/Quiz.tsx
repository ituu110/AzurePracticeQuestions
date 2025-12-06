import React, { useState } from 'react';
import type { Question } from '../types';
import { Timer } from './Timer';

interface QuizProps {
  questions: Question[];
  timeLimitMinutes: number;
  onFinish: (userAnswers: Record<number, number[]>) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, timeLimitMinutes, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isFinished) return;
    
    // Check if it's a multiple choice question based on correctAnswers length
    const isMultipleChoice = currentQuestion.correctAnswers.length > 1;

    setUserAnswers(prev => {
      const currentSelected = prev[currentQuestion.id] || [];
      
      if (isMultipleChoice) {
         if (currentSelected.includes(optionIndex)) {
           return { ...prev, [currentQuestion.id]: currentSelected.filter(i => i !== optionIndex) };
         } else {
           return { ...prev, [currentQuestion.id]: [...currentSelected, optionIndex] };
         }
      } else {
         // Single choice behavior
         return { ...prev, [currentQuestion.id]: [optionIndex] };
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    onFinish(userAnswers);
  };

  const handleTimeUp = () => {
    alert('時間切れです！採点画面に移動します。');
    finishQuiz();
  };

  return (
    <div className="quiz-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '1.1rem' }}>問題 {currentIndex + 1} / {questions.length}</span>
        <Timer initialMinutes={timeLimitMinutes} onTimeUp={handleTimeUp} isActive={!isFinished} />
      </div>

      <div className="card" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>{currentQuestion.text}</h3>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {currentQuestion.correctAnswers.length > 1 ? '(複数選択)' : '(単一選択)'}
        </p>
        <div className="options" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQuestion.options.map((option, idx) => {
            const isSelected = userAnswers[currentQuestion.id]?.includes(idx);
            return (
              <div 
                key={idx} 
                onClick={() => handleOptionSelect(idx)}
                style={{
                  padding: '15px',
                  border: '2px solid',
                  borderColor: isSelected ? '#646cff' : '#ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#f0f0ff' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: currentQuestion.correctAnswers.length > 1 ? '4px' : '50%', 
                        border: '2px solid #ccc',
                        marginRight: '10px',
                        backgroundColor: isSelected ? '#646cff' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {isSelected && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                    </div>
                    {option}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="navigation" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>前へ</button>
        {currentIndex === questions.length - 1 ? (
            <button onClick={finishQuiz} style={{ backgroundColor: '#28a745' }}>終了して採点</button>
        ) : (
            <button onClick={handleNext}>次へ</button>
        )}
      </div>
    </div>
  );
};
