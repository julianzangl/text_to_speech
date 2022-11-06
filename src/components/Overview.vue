<template>
  <div>
    <div class="header">
      <h1>Speech and Text Translator</h1>
    </div>
    <div class="fields">
      <div class="field-content">
        <div class="input-mic">
          <md-autocomplete
            v-model="selectedLanguage_one"
            :md-options="language_names"
            class="lang"
            @change.native="resetText"
          >
            <label>Language</label>
          </md-autocomplete>
          <md-icon @click.native="record_voice" class="microphone">
            mic
          </md-icon>
        </div>
        <md-field class="field">
          <label>Insert text...</label>
          <md-textarea v-model="left_text" />
        </md-field>
      </div>
      <div class="translate">
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
        <md-autocomplete
          v-model="selectedLanguage_second"
          :md-options="language_names"
          class="lang"
          @change.native="resetText"
        >
          <label>Language</label>
        </md-autocomplete>
        <md-field class="field">
          <md-textarea v-model="right_text" :disabled="right_text == ''" />
          <md-icon
            v-if="right_text"
            @click.native="text_to_speech"
            class="speaker"
          >
            volume_up
          </md-icon>
        </md-field>
      </div>
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
      selectedLanguage_one: "German",
      selectedLanguage_second: "English",
      language_names: [],
      recognition: null,
    };
  },

  mounted() {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = SpeechRecognition ? new SpeechRecognition() : false;
    recognition.onstart = function() {
      this.left_text = "Voice is activated, you can speak to microphone";
    };
    recognition.onspeechend = function() {
      this.left_text =
        "You were quiet for a while so voice recognition turned itself off";
    };
    recognition.onerror = function(event) {
      if (event.error == "no-speech") {
        this.left_text =
          "No speech was detected. You may need to adjust your microphone";
      }
    };
    recognition.onresult = function(event) {
      let current = event.resultIndex;
      let transcript = event.results[current][0].transcript;
      this.left_text = transcript;
    };
  },

  methods: {
    record_voice() {
      let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = SpeechRecognition ? new SpeechRecognition() : false;
    recognition.onstart = function() {
      console.log("Voice is activated, you can speak to microphone");
      this.left_text = "Voice is activated, you can speak to microphone";
    };
    recognition.onspeechend = function() {
      console.log(
        "You were quiet for a while so voice recognition turned itself off"
      );
      this.left_text =
        "You were quiet for a while so voice recognition turned itself off";
    };
    recognition.onerror = function(event) {
      if (event.error == "no-speech") {
        this.left_text =
          "No speech was detected. You may need to adjust your microphone";
      }
    };
    recognition.onresult = function(event) {
      let current = event.resultIndex;
      let transcript = event.results[current][0].transcript;
      this.left_text = transcript;
    };
      recognition.start();
    },

    text_to_speech() {
      let spoken_language = this.$store.state.languages.find(
        (language) => language.name == this.selectedLanguage_second
      ).key;
      responsiveVoice.speak(this.right_text, spoken_language);
    },
    resetText() {
      this.right_text = "";
    },

    async translate() {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        null,
        {
          params: {
            q: this.left_text,
            source: this.getLanuguageObject(this.selectedLanguage_one).code,
            target: this.getLanuguageObject(this.selectedLanguage_second).code,
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

    getLanuguageObject(name) {
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
