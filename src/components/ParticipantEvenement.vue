<template>
  <v-card class="ml-2" min-height="660">
    <ConfirmParticipantDeleteModal
      v-model="showModalEvent"
      :participantToDelete="participantToDelete"
    > </ConfirmParticipantDeleteModal>
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>{{ $root.currentMessages.participants }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        fab
        small
        dark
        color="indigo"
        @click.stop="dialog = true"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">{{ $root.currentMessages.newParticipant }}</v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
              :label=$root.currentMessages.name
              placeholder="Jean-Filou"
              filled
              @input="updateName($event)"
              :value="addingName"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="addParticipant($event)"
            >
              {{ $root.currentMessages.add }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-list style = "height:600px; width: 250px; overflow-y:auto; overflow-x:auto;">
      <v-list-item-group
        color="primary"
        :key="forceRender"
      >
      <template v-for="(item, index) in items">
        <v-hover :key="item.title" v-slot:default="{ hover }">
          <v-list-item :key="item.title" @click="updateSelectedParticipant(index)" :class="index === getSelectedParticipantIndex(index) ? 'v-list-item--active': ''">
            <v-list-item-icon>
              <v-icon :color="item.color"> mdi-circle </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
            <v-btn
              icon
              color="red"
              v-show="hover"
               @click="removeParticipant(item.title)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-list-item>
        </v-hover>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
  </v-card>
</template>

<script src="../utils/participants" />
