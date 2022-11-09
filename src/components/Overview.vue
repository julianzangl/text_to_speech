<template>
  <div>
    <div class="header">
      <h1>Speech and Text Translator</h1>
    </div>
    <div class="fields">
      <div class="field-content">
        <div class="input-mic">
          <input v-model="selectedLanguageone" type="text" @change="changeLanguageleft">
          <md-field class="lang">
            <label>From</label>
            <md-select
              v-model="selectedLanguageone"
              placeholder="Select Language"
              @change="changeLanguageleft"
            >
              <md-option
                v-for="language in language_names"
                :key="language"
                :value="language"
              >
                {{ language }}
              </md-option>
            </md-select>
          </md-field>
          <md-icon
            class="microphone"
            @click.native="record_voice"
          >
            mic
          </md-icon>
        </div>
        <md-field class="field">
          <label>Insert text...</label>
          <md-textarea v-model="left_text" @change="changeLanguageleft"/>
          <md-icon
            v-if="left_text"
            class="speaker"
            @click.native="text_to_speech_left"
          >
            volume_up
          </md-icon>
        </md-field>
      </div>
      <div class="translate">
        <md-button
          class="translate"
          md-raised
          md-theme="primary"
          @click="switch_languages"
        >
          <md-icon>
            swap_horiz
          </md-icon>
        </md-button>
        <md-button
          class="translate"
          md-raised
          md-theme="primary"
          @click="translate"
        >
          <md-icon>
            send
          </md-icon>
        </md-button>
      </div>
      <div class="field-content">
        <md-field class="lang">
          <md-select
            v-model="selectedLanguage_second"
            placeholder="Select Language"
          >
            <md-option
              v-for="language in language_names"
              :key="language"
              :value="language"
            >
              {{ language }}
            </md-option>
          </md-select>
        </md-field>
        <md-field class="field">
          <md-textarea
            v-model="right_text"
            :disabled="right_text == ''"
          />
          <md-icon
            v-if="right_text"
            class="speaker"
            @click.native="text_to_speech"
          >
            volume_up
          </md-icon>
        </md-field>
      </div>
    </div>
    <div>
      <md-button
        class="md-raised"
        @click="load_example"
      >
        Load example
      </md-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Overview",
  data() {
    return {
      left_text: "",
      right_text: "",
      selectedLanguageone: "German",
      selectedLanguage_second: "English",
      language_names: [],
    };
  },

  created() {
    this.$watch('selectedLanguageone', function (newVal, oldVal) {
      console.log("newVal", newVal);
    });
  },

  watch: {
    selectedLanguageone(newLanguage) {
      console.log("Language changed to: " + newLanguage);
    },
    left_text(newText) {
      console.log("Text changed to: " + newText);
    },
  },

  mounted() {
    //save all languages in lanugage_names with mop from store
    this.$store.state.languages.forEach((language) => {
      this.language_names.push(language.name);
    });
  },

  methods: {
    record_voice() {
      let _this = this;
      let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = SpeechRecognition ? new SpeechRecognition() : false;
      recognition.onstart = function() {
        _this.left_text = "Now listening...";
        console.log("Voice is activated, you can speak to microphone");
      };
      recognition.onspeechend = function() {
        console.log(
          "You were quiet for a while so voice recognition turned itself off"
        );
      };
      recognition.onerror = function(event) {
        if (event.error == "no-speech") {
          _this.left_text =
            "No speech was detected. You may need to adjust your microphone";
        }
      };
      recognition.onresult = function(event) {
        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;
        _this.left_text = transcript;
      };
      recognition.start();
    },

    switch_languages() {
      let temp = this.selectedLanguage_one;
      this.selectedLanguage_one = this.selectedLanguage_second;
      this.selectedLanguage_second = temp;
      this.left_text = this.right_text;
      this.right_text = "";
    },

    text_to_speech() {
      let spoken_language = this.$store.state.languages.find(
        (language) => language.name == this.selectedLanguage_second
      ).key;
      responsiveVoice.speak(this.right_text, spoken_language);
    },
    text_to_speech_left() {
      let spoken_language = this.$store.state.languages.find(
        (language) => language.name == this.selectedLanguage_one
      ).key;
      responsiveVoice.speak(this.left_text, spoken_language);
    },

    load_example() {
      //make long example in german
      this.left_text =
        "Guten Tag! Ich bin ein Computerprogramm, das für dich Texte übersetzt. Du kannst mir entweder Text eingeben oder ich höre dir zu. Du kannst auch auf das Mikrofon klicken und mir etwas sagen.";
    },
    changeLanguageleft() {
      console.log("test")
      this.left_text = "";
      this.right_text = "";
    },

    async translate() {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        null,
        {
          params: {
            q: this.left_text,
            source: this.getLanguageObject(this.selectedLanguage_one).code,
            target: this.getLanguageObject(this.selectedLanguage_second).code,
            format: "text",
          },
        }
      );
      // const response2 = await axios.post(
      //   "https://cors.modus-operandi.workers.dev/proxy/?apiurl=https://libretranslate.de/translate?q=" +
      //     this.left_text +
      //     "?source=" +
      //     this.getLanuguageObject(this.selectedLanguage_one).code +
      //     "?target=" +
      //     this.getLanuguageObject(this.selectedLanguage_second).code +
      //     "?format=text"
      // );
      // console.log(response2);
      this.right_text = response.data.translatedText;
    },

    getLanguageObject(name) {
      return this.$store.state.languages.find((language) => {
        return language.name === name;
      });
    },
  },
};
</script>
<style scoped>
.header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 5em;
}

.fields {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.field-content {
  width: 45%;
  margin: 20px;
  margin: 0 !important;
}
.microphone {
  border-radius: 50%;
  padding: 0.8em;
  scale: 1.3;
  margin: 0;
  border-radius: 50%;
  transition: all 0.6s ease;
}
.microphone:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(107, 107, 107, 0.25),
    0 5px 5px rgba(111, 111, 111, 0.22);
}

.speaker {
  border-radius: 50%;
  transition: all 0.6s ease;
}

.speaker:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(107, 107, 107, 0.25),
    0 5px 5px rgba(111, 111, 111, 0.22);
}

.translate {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lang {
  width: 40%;
}

.input-mic {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
</style>
