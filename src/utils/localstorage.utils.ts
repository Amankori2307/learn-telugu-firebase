import { IVocabularyEntry } from "../interfaces/vocab.interfaces";

const localStorageUtils = {
  initializeMetrics: (vocabList: IVocabularyEntry[]) => {
    vocabList.forEach((vocab) => {
      const metrics = localStorage.getItem(`metrics-${vocab.id}`);
      if (!metrics) {
        localStorage.setItem(
          `metrics-${vocab.id}`,
          JSON.stringify({ timesShown: 0, timesCorrect: 0, timesIncorrect: 0 })
        );
      }
    });
  },
  resetMetrics: (vocabularyEntryList: Array<IVocabularyEntry>) => {
    const lastReset = localStorage.getItem("lastReset");
    const now = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    if (!lastReset || lastReset !== now) {
      // Reset metrics for all vocabulary entries
      vocabularyEntryList.forEach((vocab) => {
        localStorage.setItem(
          `metrics-${vocab.id}`,
          JSON.stringify({ timesShown: 0, timesCorrect: 0, timesIncorrect: 0 })
        );
      });
      localStorage.setItem("lastReset", now);
    }
  },
  getWeightedRandomQuestion: (
    vocabList: IVocabularyEntry[]
  ): IVocabularyEntry => {
    const weights = vocabList.map((vocab) => {
      const metrics = JSON.parse(
        localStorage.getItem(`metrics-${vocab.id}`) || "{}"
      );
      const timesShown = metrics.timesShown || 0;
      const timesIncorrect = metrics.timesIncorrect || 0;
      // Higher weight for questions shown fewer times or answered incorrectly more often
      return 1 / (timesShown + 1) + timesIncorrect;
    });

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < vocabList.length; i++) {
      cumulativeWeight += weights[i];
      if (random < cumulativeWeight) {
        return vocabList[i];
      }
    }

    // Fallback: Return a random question if something goes wrong
    return vocabList[Math.floor(Math.random() * vocabList.length)];
  },
  updateMetrics: (vocabId: string, isCorrect: boolean) => {
    const metrics = JSON.parse(
      localStorage.getItem(`metrics-${vocabId}`) || "{}"
    );
    metrics.timesShown += 1;
    if (isCorrect) {
      metrics.timesCorrect += 1;
    } else {
      metrics.timesIncorrect += 1;
    }
    localStorage.setItem(`metrics-${vocabId}`, JSON.stringify(metrics));
  },
};
export default localStorageUtils;
