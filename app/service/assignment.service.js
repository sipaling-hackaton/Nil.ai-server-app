const dataValidator = require('../helpers/validator');
const utils = require('../helpers/utils');

const validateQuestions = (questions) => {

        const assignmentID = utils.generateRandomId(10);

        let rubrics = [];    

        let errorMessage = null;

        const processedQuestions = [];

        for (let index = 0; index < questions.length; index++) {
            const data = questions[index];
            const questionID = `${assignmentID}-${index.toString()}`;

            if (errorMessage) break;

            if (!data.question){
                errorMessage = "Question description must be provided."
                break;
            }            

            if (!data.rubric) {
                errorMessage = "Question rubric must be provided."
                break;
            }
            
            // rubric's data
            for (let rubric of data.rubric) {

                if (!rubric.description){
                    errorMessage = "Rubric description must be provided."
                    break;
                }

                if (!rubric.point){
                    errorMessage = "Rubric point / weight must be provided."
                    break;
                }

                if (!dataValidator.isInteger(rubric.point)){
                    errorMessage = "Rubric point / weight must be a valid integer."
                    break;                    
                }

                rubrics.push(
                    {
                        id: `${questionID}-${utils.generateRandomId(8)}`,
                        question_id: questionID,
                        description: rubric.description,
                        point: rubric.point
                    }
                );
            }
            
            // question's data
            processedQuestions.push({
                id: questionID,
                question: data.question,
                assignment_id: assignmentID
            });
        }


        if (errorMessage) {
            return {error : errorMessage}
        }

        return {
            questions : processedQuestions, 
            rubrics,
            assignment_id : assignmentID
        }


}

module.exports = {
    validateQuestions
}