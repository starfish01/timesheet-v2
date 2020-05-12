<template>
  <div class="column">
    <h1 class="title has-text-centered">Confirmation</h1>

    <b-field label="Send timesheet to">
      <b-select placeholder="Select a name">
        <option v-for="option in supervisors" :value="option.id" :key="option.id">{{ option.title }}</option>
      </b-select>
    </b-field>

    <p>By signing below I confirm the detail in this timesheet are true and correct:</p>
    <VueSignaturePad
      style="margin-bottom:10px; background: #f3f3f3"
      saveType="image/svg+xml"
      height="200px"
      ref="signaturePad"
    />
    {{canSubmit}}
    <div class="buttons">
      <b-button @click="save">Save</b-button>
      <b-button @click="undo">Undo</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SignaturePad",
  data() {
    return {
      signaturePad: false
    };
  },
  mounted() {
    this.signaturePad = this.$refs.signaturePad;
  },
  computed: {
    canSubmit() {
      if (!this.signaturePad || this.signaturePad.isEmpty()) {
        return false;
      }
      return true;
    },
    ...mapGetters({
      supervisors: "appData/getSupervisors"
    })
  },
  methods: {
    undo() {
      this.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>