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
    };
  },

  mounted() {
    this.language_names = this.$store.state.languages.map((language) => {
      return language.name;
    });
  },

  methods: {
    record_voice() {
      console.log("record_voice");
    },
    text_to_speech() {
      if ("speechSynthesis" in window) {
        let msg = new SpeechSynthesisUtterance();
        msg.text = this.right_text;
        msg.lang = this.getLanuguageObject(this.selectedLanguage_second).key;
        console.log(msg.lang)
        window.speechSynthesis.speak(msg);
      } else {
        alert("Sorry, your browser doesn't support text to speech!");
      }
    },

    async translate() {
      const response = await axios.post("https://libretranslate.de/translate", null, {
        params: {
          q: this.left_text,
          source: this.getLanuguageObject(this.selectedLanguage_one).code,
          target: this.getLanuguageObject(this.selectedLanguage_second).code,
        },
      });
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
