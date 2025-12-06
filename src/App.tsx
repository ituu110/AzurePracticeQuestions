import { useState } from 'react'
import './App.css'
import { FileUpload } from './components/FileUpload'
import { Quiz } from './components/Quiz'
import { Result } from './components/Result'
import type { QuizData } from './types'
function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]> | null>(null);

  const handleUpload = (data: QuizData) => {
    setQuizData(data);
    setUserAnswers(null);
  };
  
  const handleLoadSample = async () => {
    try {
        const response = await fetch('/sample-questions.json');
        const data = await response.json();
        setQuizData(data);
        setUserAnswers(null);
    } catch (e) {
        console.error(e);
        alert('サンプル問題の読み込みに失敗しました');
    }
  };

  const handleFinish = (answers: Record<number, number[]>) => {
    setUserAnswers(answers);
  };

  const handleRetry = () => {
    setUserAnswers(null);
  };

  const handleReset = () => {
    setQuizData(null);
    setUserAnswers(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Azure Fundamentals Practice Tool</h1>
        {quizData && <span className="subtitle">{quizData.title}</span>}
      </header>
      
      <main className="app-main">
        {!quizData && (
          <FileUpload onUpload={handleUpload} onLoadSample={handleLoadSample} />
        )}

        {quizData && !userAnswers && (
          <Quiz 
            questions={quizData.questions} 
            timeLimitMinutes={quizData.timeLimitMinutes || 10} 
            onFinish={handleFinish} 
          />
        )}

        {quizData && userAnswers && (
          <Result 
            questions={quizData.questions} 
            userAnswers={userAnswers} 
            onRetry={handleRetry} 
            onReset={handleReset}
          />
        )}
      </main>
      
      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
        <p>Azure Fundamentals Practice Tool</p>
      </footer>
    </div>
  )
}

export default App
