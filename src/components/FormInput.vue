<template>
  <div class="form-input flex flex-col gap-1">
    <div v-if="name" class="label-holder flex flex-row items-center gap-1">
      <label class="text-lightblack" :for="name">{{ name }}</label>
    </div>
    <input
      v-if="!props.isSelect"
      v-model="output"
      :type="type"
      :placeholder="placeholder"
      class="rounded-lg border border-mutedborder p-2 outline-none"
      @change.stop="$emit('content', output)"
    />
    <select
      v-else
      class="rounded-lg border border-mutedborder p-2 outline-none"
      :class="props.customClasses"
      v-model="output"
      @change.prevent="$emit('content', output)"
    >
      <option
        v-for="(item, index) in props?.selectOptions"
        :key="index"
        :value="item.value || item"
      >
        {{ item.name || item }}
      </option>
    </select>
    <small v-if="$props.error" class="text-[#E71842]">Error Message: {{ error }}</small>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: null,
  },
  labelIcon: {
    type: String,
    default: '',
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  externalInput: {
    type: String,
    default: null,
    required: false,
  },
  selectOptions: {
    type: Array,
    default: null,
  },
  error: {
    type: String,
    default: null,
    required: false,
  },
  customClasses: {
    type: String,
    required: false,
    default: '',
  },
})
onMounted(() => {
  if (props.externalInput) {
    output.value = props.externalInput
  }
})
const output = ref('')
</script>

<style lang="scss" scoped>
.icon {
  width: 18px;
  height: 18px;
}
</style>
