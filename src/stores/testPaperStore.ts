import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'

/**
 * 登录用户信息全局状态
 */
export const useTestPaperStore = defineStore('testPaperStore', () => {
    // 当前创建的一个测试信息
    const currentCreatingTestPaper = reactive<API.TestPaperAddRequestDTO>({
    });
    const currentCreatingTestPaperId = ref<number>();
    // 当前创建的测试的评分结果集合
    const currentCreatingTestPaperScoringResults = reactive<API.ScoringResultAddRequestDTO>({scoringResults: [], testPaperId: currentCreatingTestPaperId.value})

    // 用户当前正在查看的测试信息
    const currentViewingTestPaper = reactive<API.TestPaperVO>({})
    return { currentCreatingTestPaper,currentCreatingTestPaperScoringResults,currentCreatingTestPaperId, currentViewingTestPaper };
})
