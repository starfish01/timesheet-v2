<template>
  <div class="column">
    <h1 class="title has-text-centered">Confirmation</h1>
    
    <ReviewDetails />
    
    <b-field label="Send timesheet to">
      <b-select placeholder="Select a name" v-model="selectSuper">
        <option v-for="option in supervisors" :value="option.id" :key="option.id">{{ option.title }}</option>
      </b-select>
    </b-field>
    <p>By signing below I confirm the detail in this timesheet are true and correct:</p>
    <VueSignaturePad
      style="margin-bottom:10px; background:#f3f3f3"
      saveType="image/svg+xml"
      ref="signaturePad"
      height="200px"
      v-show="showSignaturePad"
      :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}"
    />
    <span style="display:none">{{canSubmit}}</span>
    <div class="buttons">
      <!-- <b-button @click="save">Save</b-button> -->
      <b-button @click="undo">Undo</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReviewDetails from "@/components/timesheet/includes/ReviewDetails";

export default {
  name: "SignaturePad",
  components: {
    ReviewDetails
  },
  data() {
    return {
      signaturePad: false,
      showSignaturePad: false,
      selectSuper: null
    };
  },
  mounted() {
    this.signaturePad = this.$refs.signaturePad;
    this.showSignaturePad = true;
  },
  computed: {
    canSubmit() {
      if (
        !this.signaturePad ||
        this.signaturePad.isEmpty() ||
        !this.selectSuper
      ) {
        this.$store.dispatch("userData/updateConfirmationDetails", {
          signature: null,
          supervisor: null
        });
        return false;
      }
      this.$store.dispatch("userData/updateConfirmationDetails", {
        signature: this.$refs.signaturePad.saveSignature().data,
        supervisor: this.selectSuper
      });
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