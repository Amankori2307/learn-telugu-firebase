import { IVocabularyEntry } from "../interfaces/vocab.interfaces";

const localStorageUtils = {
  initializeMetrics: (vocabList: IVocabularyEntry[]) => {
    vocabList.forEach((vocab) => {
      const metrics = localStorage.getItem(`metrics-${vocab.id}`);
      if (!metrics) {
        localStorage.setItem(
          `metrics-${vocab.id}`,
          JSON.stringify({
            timesShown: 0,
            timesCorrect: 0,
            timesIncorrect: 0,
            lastSeen: null, // Last time the vocab was shown
            confidenceLevel: 5, // Default confidence level (0–10)
            interval: 1, // Default interval (in days)
          })
        );
      }
    });
  },

  resetMetrics: (vocabularyEntryList: Array<IVocabularyEntry>) => {
    const lastReset = localStorage.getItem("lastReset");
    const now = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    if (!lastReset || lastReset !== now) {
      // Reset metrics for vocabulary entries that haven't been seen in a while or have low confidence
      vocabularyEntryList.forEach((vocab) => {
        const metrics = JSON.parse(
          localStorage.getItem(`metrics-${vocab.id}`) || "{}"
        );
        const daysSinceLastSeen =
          metrics.lastSeen &&
          Math.floor(
            (new Date(now).getTime() - new Date(metrics.lastSeen).getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (
          !metrics.lastSeen ||
          daysSinceLastSeen > 30 ||
          metrics.confidenceLevel <= 3
        ) {
          localStorage.setItem(
            `metrics-${vocab.id}`,
            JSON.stringify({
              timesShown: 0,
              timesCorrect: 0,
              timesIncorrect: 0,
              lastSeen: null,
              confidenceLevel: 5,
              interval: 1,
            })
          );
        }
      });
      localStorage.setItem("lastReset", now);
    }
  },

  getWeightedRandomQuestion: (
    vocabList: IVocabularyEntry[]
  ): IVocabularyEntry => {
    const now = new Date();
    const weights = vocabList.map((vocab) => {
      const metrics = JSON.parse(
        localStorage.getItem(`metrics-${vocab.id}`) || "{}"
      );
      const confidenceLevel = metrics.confidenceLevel || 5;
      const lastSeen = metrics.lastSeen
        ? new Date(metrics.lastSeen)
        : new Date(0); // Default to very old date if not set
      const interval = metrics.interval || 1;

      // Calculate days since last seen
      const daysSinceLastSeen = Math.floor(
        (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Weight calculation:
      // Higher weight for vocab with:
      // - Low confidence level
      // - Long time since last seen
      // - Due for review (daysSinceLastSeen >= interval)
      const weight =
        (10 - confidenceLevel) * 2 + // Low confidence has higher weight
        daysSinceLastSeen * 1.5 + // Longer since last seen has higher weight
        (daysSinceLastSeen >= interval ? 10 : 0); // Due for review has highest weight

      return weight;
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
    const now = new Date().toISOString();

    // Update basic metrics
    metrics.timesShown += 1;
    if (isCorrect) {
      metrics.timesCorrect += 1;
      metrics.confidenceLevel = Math.min(10, metrics.confidenceLevel + 1); // Increase confidence
      metrics.interval = Math.ceil(metrics.interval * 1.5); // Increase interval (spaced repetition)
    } else {
      metrics.timesIncorrect += 1;
      metrics.confidenceLevel = Math.max(0, metrics.confidenceLevel - 2); // Decrease confidence
      metrics.interval = Math.max(1, Math.ceil(metrics.interval / 2)); // Decrease interval
    }

    // Update last seen date
    metrics.lastSeen = now;

    // Save updated metrics
    localStorage.setItem(`metrics-${vocabId}`, JSON.stringify(metrics));
  },
};

export default localStorageUtils;
