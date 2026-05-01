import apiClient from "./apiClient";

// ✅ get questions by setId
export const getQuestionsBySet = async (setId) => {
    return await apiClient(`/questions/public?setId=${setId}`);
};