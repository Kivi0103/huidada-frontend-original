import {defineStore} from "pinia";
import {ref} from "vue";

export const useAnswerStore = defineStore( 'answerStore', () =>{
        const viewingAnswer = ref();
        return {viewingAnswer}
    }
)
