import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { Component, createRef } from 'react';

export class FeedbackPreview extends Component {
    inputRef = createRef()

    state = {
        feedback: {},
        isEditMode: false,
        prevFeedback: {},
    }

    async componentDidMount() {
        await this.loadFeedback();
    }

    async loadFeedback() {
        try {
            const { feedback } = this.props;
            var prevFeedback = JSON.parse(JSON.stringify(feedback));
            this.setState({ feedback });
            this.setState({ prevFeedback });

        }
        catch (error) {
            console.log(`Couldn't find feedback ${error}`);
        }
    }

    thumbUpClass(term) {
        if (term === undefined) {
            return '';
        }
        return term ? 'chosen' : 'disabled';
    }
    thumbDownClass(term) {
        if (term === undefined) {
            return '';
        }
        return term ? 'disabled' : 'chosen';
    }

    handleChange = ({ target }) => {
        const field = target.id
        const value = target.value
        this.setState(prevState => ({ feedback: { ...prevState.feedback, [field]: value } }))
    }
    handleClick = ()=>{
        this.inputRef.current.focus();
        this.onEditMode();
    }

    onSaveFeedback = async (ev) => {
        ev.preventDefault();
        const { feedback } = this.state;
        this.props.onFeedbackUpdate(feedback);
        this.onExitEditMode();
    }

    onEditMode = () =>{
        var isEditMode = true;
        this.setState({ isEditMode });
    }

    onExitEditMode = () =>{
        var isEditMode = false;
        this.setState({ isEditMode });
    }

    toggleEditMode = () => {
        var { isEditMode } = this.state;
        isEditMode = !isEditMode;
        this.setState({ isEditMode });
    }

    onThumbClick = (direction) => {
        var { feedback } = this.state;
        var { wasHelpful } = feedback;
        if (direction !== wasHelpful) {
            feedback.wasHelpful = direction;
            this.setState({ feedback });
        }
    }

    onSkip = (ev) => {
        ev.preventDefault();
        const { prevFeedback } = this.state;
        const feedback = JSON.parse(JSON.stringify(prevFeedback));
        this.setState({ feedback });

    }

    render() {
        const { feedback } = this.state;
        const { comment } = feedback || '';
        if (!feedback) return <div>Loading...</div>
        return (
            <form className="feedback-preview">
                <div className="feedback-container">
                </div>
                <div className="title-container">
                    <p>Is this page helpful?</p>
                </div>
                <div className="thumb-btn-container">
                    <div className="thumb-up-container">
                        <div className="up-container">
                            <FontAwesomeIcon
                                className={'thumb-up-icon ' + this.thumbUpClass(feedback.wasHelpful)}
                                onClick={() => this.onThumbClick(true)}
                                icon={faThumbsUp} />
                        </div>
                    </div>
                    <div className="thumb-up-text-container">
                        <span>Yes</span>
                    </div>
                    <div className="thumb-down-container">
                        <FontAwesomeIcon
                            className={'thumb-down-icon ' + this.thumbDownClass(feedback.wasHelpful)}
                            onClick={() => this.onThumbClick(false)}
                            icon={faThumbsDown} />
                    </div>
                    <div className="thumb-down-text-container">
                        <span>No</span>
                    </div>
                </div>
                <div className='skip-btn'><button onClick={this.onSkip}>Skip</button></div>
                <div className="submit-btn-container">
                    <button className='submit-btn' onClick={this.onSaveFeedback}>Submit</button>
                </div>
                <div className="feedback-text-container"
                    onFocus={this.onEditMode} 
                    onBlur={this.onExitEditMode} 
                >
                    <textarea ref={this.inputRef} 
                    type="textarea" 
                    id="comment"
                    value={comment} 
                    onChange={this.handleChange}></textarea>
                </div>
                {!comment && !this.state.isEditMode && <div className="text-area-placeholder-container">
                    <p
                       onClick={this.handleClick} 
                    >Any additional feedback?</p>
                </div>}
            </form>
        )
    }
}