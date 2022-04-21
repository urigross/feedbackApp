import { Component } from "react";
import { feedbackService } from "../services/feedbackService";
import { FeedbackList } from "../components/FeedbackList";

export class FeedbackHome extends Component{
    state={
        feedbacks:[
        ],
        currFeedback:{
            wasHelpful: false,
            comment: '',
            id:''
        }
    }
    setFeedbackData = async () =>{
        const feedbacks = await feedbackService.getFeedbacks();
        this.setState({feedbacks});
    }

    onFeedbackUpdate = async (feedback) =>{
        await feedbackService.updateFeedback(feedback);
        this.setFeedbackData();     
    }

 

    componentDidMount(){
        this.setFeedbackData();
    }

    render(){
        const {feedbacks} = this.state;
        if(!feedbacks) return <div className="page-loading-screen">Loading...</div>
        return(
            <section className="feedback-home">
                <div className="feeback-home-container">
                    <FeedbackList feedbacks={feedbacks} onFeedbackUpdate={this.onFeedbackUpdate}></FeedbackList>
                </div>
            </section>
        )
    }
}