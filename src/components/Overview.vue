<template>
  <div>
    <div class="header">
      <h1>Speech and Text Translator</h1>
    </div>
    <div class="fields">
      <div class="field-content">
        <md-autocomplete v-model="selectedLanguage_one" :md-options="languages">
          <label>Language</label>
        </md-autocomplete>
        <md-field class="field">
          <label>Insert text...</label>
          <md-textarea v-model="left_text" />
          <md-icon @click="record_voice">
            mic
          </md-icon>
        </md-field>
      </div>
      <div class="field-content">
        <md-autocomplete
          v-model="selectedLanguage_second"
          :md-options="languages"
        >
          <label>Language</label>
        </md-autocomplete>
        <md-field class="field">
          <md-textarea v-model="right_text" />
          <md-icon v-if="right_text">
            volume_up
          </md-icon>
        </md-field>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Overview",
  data() {
    return {
      left_text: "",
      right_text: "",
      selectedLanguage_one: "German",
      selectedLanguage_second: "English",
      languages: [
        "English",
        "French",
        "German",
        "Italian",
        "Spanish",
        "Portuguese",
        "Russian",
        "Chinese",
        "Japanese",
        "Korean",
        "Arabic",
      ],
    };
  },
  methods: {
    record_voice() {
      console.log("record_voice");
    },
  },
};
</script>
<style scoped>
.header {
  text-align: center;
  margin-top: 20px;
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

.field {
}
</style>
