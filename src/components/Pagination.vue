<template>
  <div v-if="totalPages() > 0" class="pagination-wrapper">
    <span
      v-if="showPreviousLink()"
      class="pagination-btn"
      v-on:click="updatePage(currentPage - 1)"
    >prev</span>
    {{ currentPage }} of {{ totalPages() }}
    <span
      v-if="showNextLink()"
      class="pagination-btn"
      v-on:click="updatePage(currentPage + 1)"
    >next</span>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["total", "currentPage", "pageSize"],
  methods: {
    updatePage(pageNumber) {
      this.$emit("page:update", pageNumber);
    },
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage == 1 ? false : true;
    },
    showNextLink() {
      return this.currentPage == this.totalPages() ? false : true;
    }
  }
};
</script>
