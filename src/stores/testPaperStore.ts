import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

/**
 * 登录用户信息全局状态
 */
export const useTestPaperStore = defineStore('testPaperStore', () => {
    // 当前创建的一个测试信息
    const currentCreatingTestPaper = ref<API.TestPaperAddRequestDTO>({
    questionContent: [
        {
            questionDesc: '',
            options: [{
                key: 'A',
                optionDesc: '',
                score: 0,
                result: ''
            }]
        }
    ]
    });
    const currentCreatingTestPaperId = ref<number>();
    // 当前创建的测试的评分结果集合
    const currentCreatingTestPaperScoringResults = ref<API.ScoringResultAddRequestDTO>({scoringResults: [], testPaperId: currentCreatingTestPaperId.value})
    const isUpdate = ref<boolean>(false);
    // 用户当前正在查看的测试信息
    const currentViewingTestPaper = reactive<API.TestPaperVO>({})
    const start = ()=>{
        currentCreatingTestPaper.value = {
            questionContent: [
            ]
        }
        currentCreatingTestPaperId.value = undefined;
        currentCreatingTestPaperScoringResults.value = {scoringResults: [], testPaperId: currentCreatingTestPaperId.value};
        isUpdate.value = false;
    }

    return { currentCreatingTestPaper,currentCreatingTestPaperScoringResults,currentCreatingTestPaperId, currentViewingTestPaper
    , isUpdate, start };
})
