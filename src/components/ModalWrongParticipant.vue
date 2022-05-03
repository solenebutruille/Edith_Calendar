<template>
  <div class="text-center">
    <v-dialog
       transition="dialog-top-transition"
       max-width="600"
       v-model="show"
     >
       <template v-slot:default="dialog">
         <v-card>
           <v-alert
             dense
             outlined
             type="error"
           >
            {{ field.errorMessage }}
           </v-alert>
           <v-card-actions class="justify-end">
             <v-btn
               color="primary"
               @click="dialog.value = false"
             >Close</v-btn>
           </v-card-actions>
         </v-card>
       </template>
     </v-dialog>
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
