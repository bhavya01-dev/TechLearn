import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './QuestionPanel.css';

const QuestionPanel = ({ question }) => {
    if (!question) return null;

    return (
        <div className="question-panel">
            <div className="question-header">
                <h2 className="question-title">{question.title}</h2>
                <div className="question-meta">
                    <span className={`meta-difficulty ${question.difficulty.toLowerCase()}`}>
                        {question.difficulty}
                    </span>
                </div>
            </div>

            <div className="question-description">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {question.description}
                </ReactMarkdown>
            </div>

            {question.examples && question.examples.length > 0 && (
                <div className="question-examples">
                    <h3>Examples</h3>
                    {question.examples.map((example, index) => (
                        <div key={index} className="example-block">
                            <div className="example-label">Example {index + 1}:</div>
                            <div className="example-content">
                                <div className="example-row">
                                    <span className="example-key">Input:</span>
                                    <code>{example.input}</code>
                                </div>
                                <div className="example-row">
                                    <span className="example-key">Output:</span>
                                    <code>{example.output}</code>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionPanel;
