<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500">
      <v-form ref="form" v-model="valid">
        <v-card>
          <v-toolbar color="red" dark>
            <v-toolbar-title> {{ $root.currentMessages.participantDeletion }} </v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <p class="font-weight-medium text-center" style="margin-top: 15px;">
            {{ $root.currentMessages.delete }} {{ this.participantToDelete }} {{ $root.currentMessages.andEvents }}
          </p>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" @click="cancel">
              {{ $root.currentMessages.cancel }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="deleteParticipant">
              {{ $root.currentMessages.delete }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
  import { deleteParticipant } from '../../models/participants.js';

  export default {
    props:  {
     value: Boolean,
     participantToDelete: String,
   },
   computed: {
     show: {
       get () { return this.value },
       set (value) { this.$emit('input', value)}
     }
   },
    data () {
      return {
        valid: true,
      }
    },
    methods: {
      cancel() {
        this.show = false;
      },
      async deleteParticipant() {
        deleteParticipant(this.participantToDelete);
        this.show = false;
      }
    }
  }
</script>
