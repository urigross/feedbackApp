import { FeedbackPreview } from "./FeedbackPreview";

export function FeedbackList({ feedbacks, onFeedbackUpdate }) {
    return (
        <div className="feeback-list">
            {feedbacks.map(feedback=>(
                <FeedbackPreview feedback={feedback} key={feedback.id} onFeedbackUpdate={onFeedbackUpdate}/>
            ))}
        </div>
    )
}