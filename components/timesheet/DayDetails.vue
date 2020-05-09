<template>
  <div class="column">
    <h1 class="title has-text-centered">Days Worked</h1>
    <section>
      <b-collapse
        class="card"
        animation="slide"
        v-for="(collapse, index) of collapses"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <div slot="trigger" slot-scope="props" class="card-header" role="button">
          <p class="card-header-title">{{ collapse.title }}</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <Details :isWeekend="collapse.isWeekend" />
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script>
import Details from "@/components/timesheet/includes/Details";

export default {
  components: {
    Details
  },
  data() {
    return {
      isOpen: 0,
      collapses: [
        {
          title: "Title 1",
          text: "Text 1",
          isWeekend: false
        }
      ]
    };
  },
  props: {}
};
</script>