<script setup lang="ts">
import {computed} from "vue";
import {RouterLink} from "vue-router";

type Props = {
  to?: string | Record<string, any>;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
};

const props = withDefaults(defineProps<Props>(), {type: 'button'});

const tag = computed(() => (props.to ? (RouterLink) : (props.href ? 'a' : 'button')));
</script>

<template>
  <component :is="tag" class="btn" :type="tag === 'button' ? type : undefined" :to="tag === RouterLink ? to : undefined"
             :href="tag === 'a' ? href : undefined">
    <slot/>
  </component>
</template>