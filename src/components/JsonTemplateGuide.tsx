import React from 'react';

export const JsonTemplateGuide: React.FC = () => {
    const sampleJson = {
        title: "問題集のタイトル",
        timeLimitMinutes: 10,
        questions: [
            {
                id: 1,
                text: "問題文をここに記述します",
                options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
                correctAnswers: [0],
                explanation: "解説文（任意）"
            }
        ]
    };

    return (
        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '800px', margin: '20px auto' }}>
            <details style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                <summary style={{ cursor: 'pointer', color: '#646cff', fontWeight: 'bold' }}>
                    使い方・JSONファイルの形式について
                </summary>
                <div style={{ padding: '15px 0' }}>
                    <h3>JSONファイルの作成方法</h3>
                    <p>ご自身で問題を作成する場合は、以下の形式のJSONファイルを用意してください。</p>

                    <div style={{ position: 'relative' }}>
                        <pre style={{
                            backgroundColor: '#1e1e1e',
                            color: '#d4d4d4',
                            padding: '15px',
                            borderRadius: '4px',
                            overflowX: 'auto',
                            textAlign: 'left',
                            fontSize: '14px'
                        }}>
                            {JSON.stringify(sampleJson, null, 2)}
                        </pre>
                    </div>

                    <h4>各項目の説明</h4>
                    <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
                        <li><strong>title</strong> (必須): 問題集のタイトルです。画面上部に表示されます。</li>
                        <li><strong>timeLimitMinutes</strong> (任意): 制限時間（分）です。省略すると10分になります。</li>
                        <li><strong>questions</strong> (必須): 問題オブジェクトの配列です。
                            <ul style={{ marginTop: '5px', color: '#555' }}>
                                <li><strong>id</strong>: 問題の一意なID (数値)</li>
                                <li><strong>text</strong>: 問題文</li>
                                <li><strong>options</strong>: 選択肢のリスト (文字列の配列)</li>
                                <li><strong>correctAnswers</strong>: 正解となる選択肢のインデックス (0から始まる数値の配列)。複数回答可。</li>
                                <li><strong>explanation</strong>: 解説文 (任意)</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </details>
        </div>
    );
};
