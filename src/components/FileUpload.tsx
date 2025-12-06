import React, { type ChangeEvent } from 'react';
import type { QuizData } from '../types';

interface FileUploadProps {
  onUpload: (data: QuizData) => void;
  onLoadSample: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, onLoadSample }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.questions || !Array.isArray(json.questions)) {
          throw new Error("Invalid format: 'questions' array is missing");
        }
        onUpload(json);
      } catch (error) {
        alert('無効なJSONファイルです: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <h2>問題設定</h2>
      <p>問題ファイル(JSON)を選択するか、サンプル問題をロードしてください。</p>
      
      <div style={{ margin: '20px 0' }}>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileChange} 
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <p>- または -</p>
        <button onClick={onLoadSample}>
          サンプル問題をロード
        </button>
      </div>
    </div>
  );
};
