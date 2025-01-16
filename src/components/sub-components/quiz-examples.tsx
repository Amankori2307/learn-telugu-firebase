interface QuizExamplesProps {
    examples: string[];
}

const QuizExamples = (props: QuizExamplesProps) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Examples:</h3>
            <ul className="list-disc list-inside">
                {props.examples.map((example) => (
                    <li key={example} className="mt-1">
                        {example}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default QuizExamples