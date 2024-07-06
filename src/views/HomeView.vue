<template>
  <router-view />
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import {ref} from "vue";
const currentView = ref("index");

</script>

<style scoped>

</style>