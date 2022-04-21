import axios from "axios";

export const feedbackService = {
    getFeedbacks,
    updateFeedback
}

async function getFeedbacks(){
    try{
        const res = await axios.get('https://625f988b92df0bc0f336ed82.mockapi.io/api/feedbackApp/feedbacks');
        return res.data;
    }
    catch(err){
        console.log('There was an error getting feedbacks',err);
    }
}

async function updateFeedback(feedback){
    const {id} = feedback;
    try{
       await axios.put(`https://625f988b92df0bc0f336ed82.mockapi.io/api/feedbackApp/feedbacks/${id}`,feedback)
       .then(response => { console.log(response) });        
    }
    catch(err){
        console.log('There was an error updating feedback: ',err);
    }
}