/**
 * Vuex store example
 */
export default {
  /** Application state */
  state: {
    languages: [
      { key: "en-US", code: "en", name: "English" },
      { key: "ru-RU", code: "ru", name: "Russian" },
      { key: "de-AT", code: "de", name: "German" },
      { key: "fr-FR", code: "fr", name: "French" },
      { key: "es-ES", code: "es", name: "Spanish" },
      { key: "it-IT", code: "it", name: "Italian" },
      { key: "pt-PT", code: "pt", name: "Portuguese" },
      { key: "zh-CN", code: "zh", name: "Chinese" },
      { key: "ja-JP", code: "ja", name: "Japanese" },
      { key: "ko-KR", code: "ko", name: "Korean" },
      { key: "ar-SA", code: "ar", name: "Arabic" },
      { key: "he-IL", code: "he", name: "Hebrew" },
      { key: "tr-TR", code: "tr", name: "Turkish" },
      { key: "pl-PL", code: "pl", name: "Polish" },
      { key: "cs-CZ", code: "cs", name: "Czech" },
    ],
  },

  /** Methods that read the application state */
  getters: {},

  /** Methods that change the application state synchronously */
  mutations: {
    getLanguageObject(state, name) {
      //   state.languages.forEach((language) => {
      //     if (language.name === name) {
      //       return language;
      //     }
      //   });
        console.log(name)
      return name;
    },
  },

  /** Methods that change the application state asynchronously */
  actions: {},
};
