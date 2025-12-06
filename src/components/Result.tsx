import React from 'react';
import type { Question } from '../types';

interface ResultProps {
  questions: Question[];
  userAnswers: Record<number, number[]>;
  onRetry: () => void;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ questions, userAnswers, onRetry, onReset }) => {
  let score = 0;

  const results = questions.map(q => {
    const userAns = userAnswers[q.id] || [];
    const correctAns = q.correctAnswers;
    
    // Check if arrays have same elements (assuming sorted or strict equality doesn't matter as long as content matches)
    const isCorrect = userAns.length === correctAns.length && 
                      userAns.every(val => correctAns.includes(val));
    
    if (isCorrect) score++;

    return { ...q, userAns, isCorrect };
  });

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="result-container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>結果発表</h2>
      <div className="score-card" style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: percentage >= 70 ? '#e6fffa' : '#fff5f5',
          borderRadius: '10px',
          marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '2rem', margin: '10px 0' }}>{score} / {questions.length}</h3>
        <p style={{ fontSize: '1.2rem' }}>正答率: {percentage}%</p>
        <p style={{ fontWeight: 'bold', color: percentage >= 70 ? 'green' : 'red' }}>
            {percentage >= 70 ? '合格ラインです！おめでとうございます！' : 'もう少し頑張りましょう。'}
        </p>
      </div>

      <div className="actions" style={{ marginBottom: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={onRetry}>もう一度同じ問題を解く</button>
        <button onClick={onReset} style={{ backgroundColor: '#666' }}>別の問題を選択する</button>
      </div>

      <div className="review-section">
        {results.map((item, index) => (
          <div key={item.id} className={`review-card`} 
               style={{ 
                   borderLeft: `5px solid ${item.isCorrect ? 'green' : 'red'}`, 
                   backgroundColor: 'white',
                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                   marginBottom: '20px', 
                   padding: '20px', 
                   borderRadius: '4px' 
               }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ 
                    backgroundColor: item.isCorrect ? 'green' : 'red', 
                    color: 'white', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    marginRight: '10px'
                }}>
                    {item.isCorrect ? '正解' : '不正解'}
                </span>
                <h4 style={{ margin: 0 }}>Q{index + 1}</h4>
            </div>
            
            <p style={{ fontWeight: 'bold', marginTop: '0' }}>{item.text}</p>
            
            <div className="options-review" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {item.options.map((opt, idx) => {
                    const isSelected = item.userAns.includes(idx);
                    const isAnswer = item.correctAnswers.includes(idx);
                    
                    let bgColor = 'transparent';
                    let borderColor = 'transparent';
                    
                    if (isAnswer) {
                        bgColor = '#e6fffa';
                        borderColor = 'green';
                    } else if (isSelected && !isAnswer) {
                        bgColor = '#fff5f5';
                        borderColor = 'red';
                    }
                    
                    return (
                        <div key={idx} style={{ 
                            padding: '8px', 
                            borderRadius: '4px',
                            backgroundColor: bgColor,
                            border: `1px solid ${borderColor === 'transparent' ? '#eee' : borderColor}`,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>
                                {isAnswer ? '● ' : '○ '} {opt}
                            </span>
                            {isSelected && <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#666' }}>(あなたの回答)</span>}
                        </div>
                    );
                })}
            </div>
            
            {item.explanation && (
                <div className="explanation" style={{ marginTop: '15px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', fontSize: '0.9rem' }}>
                    <strong>解説:</strong>
                    <p style={{ margin: '5px 0 0 0', whiteSpace: 'pre-wrap' }}>{item.explanation}</p>
                </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="actions" style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={onRetry}>もう一度同じ問題を解く</button>
        <button onClick={onReset} style={{ backgroundColor: '#666' }}>別の問題を選択する</button>
      </div>
    </div>
  );
};
