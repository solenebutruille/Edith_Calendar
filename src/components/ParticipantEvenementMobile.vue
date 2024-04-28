<template fluid>
  <v-card
    class="mx-auto"
  >
    <v-list>
      <v-list-group
        prepend-icon="mdi-account-circle"
        no-action
        v-model="listOpen"
      >
        <template v-slot:activator>
          <v-list-item-title>Participants</v-list-item-title>
        </template>
        <v-list>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
            @change="updateSelectedParticipant($event)"
          >
          <template v-for="(item, index) in items">
              <v-list-item :key="item.title"  @click="listOpen = false">
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
                   @click="removeParticipant(item.title)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-list-item>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
          <v-hover
            v-slot="{ hover }"
          >
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="grey darken-1"> mdi-circle </v-icon>
            </v-list-item-icon>
              <v-text-field
                  single-line
                  placeholder="New Participant Name"
                  @input="updateName($event)"
                  :value="addingName"
              ></v-text-field>
              <v-btn
                icon
                color="green"
                v-show="hover"
                 @click="addParticipant"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </v-list-item>
          </v-hover>
        </v-list-item-group>

      </v-list>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script src="../utils/participantsMobile" />
