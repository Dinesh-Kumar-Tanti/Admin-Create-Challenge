import { getChallengeStatus } from "./dateUtils";

export const getAllChallenges = () => {
    let challenges = JSON.parse(localStorage.getItem('challenge')) || [];
    return challenges.map((challenge) => ({
        ...challenge,
        status: getChallengeStatus({ startDate: challenge.startDate, endDate: challenge.endDate }),
    }));
}

export const getChallengeById = (id) => {
    const allChallenges = getAllChallenges();
    return allChallenges.find(challenge => challenge.id === id);
}
