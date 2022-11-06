/**
 * Vuex store example
 */
export default {
  /** Application state */
  state: {
    languages: [
      { code: "en", key: "UK English Female", name: "English" },
      { code: "ru", key: "Russian Female", name: "Russian" },
      { code: "de", key: "Deutsch Male", name: "German" },
      { code: "fr", key: "French Male", name: "French" },
      { code: "es", key: "Spanish Female", name: "Spanish" },
      { code: "it", key: "Italian Male", name: "Italian" },
      { code: "pt", key: "Portuguese Male", name: "Portuguese" },
      { code: "zh", key: "Chinese Male", name: "Chinese" },
      { code: "ja", key: "Japanese Male", name: "Japanese" },
      { code: "ko", key: "Korean Female", name: "Korean" },
      { code: "ar", key: "Arabic Male", name: "Arabic" },
      { code: "tr", key: "Turkish Female", name: "Turkish" },
      { code: "pl", key: "Polish Female", name: "Polish" },
      { code: "cs", key: "Czech Female", name: "Czech" },
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
