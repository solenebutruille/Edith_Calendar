<template>
  <div class="text-center">
    <v-snackbar
      v-model="show"
      :timeout="3000"
      tile
      color="red accent-2"
    >
      {{ field.errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="show = false"
        >
          {{ $root.currentMessages.close }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    props:  {
     value: Boolean,
     fields: Object,
   },
   computed: {
     show: {
       get () { return this.value },
       set (value) { this.$emit('input', value)}
     }
   },
    data () {
      return {
        field: this.fields,
      }
    },
    created() {
      this.$emit("fields", this.field);
    }
  }
</script>
