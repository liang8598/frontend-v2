<template>
  <v-select
    v-model="themeStyle"
    hide-details
    filled
    :items="themes"
    :label="$t('menu.settings.themeStyles.name')"
    transition="slide-y-transition"
  >
    <template #item="{ item }">
      <div
        style="height: 20px; width: 20px"
        class="mr-2"
        v-html="item.icon"
      />
      {{ item.text }}
      <v-spacer />
      <v-icon v-if="item.value === themeStyle">
        mdi-check
      </v-icon>
    </template>
    <template #selection="{item}">
      <div
        style="height: 20px; width: 20px"
        class="mr-1"
        v-html="item.icon"
      />
      {{ item.text }}
    </template>
  </v-select>
</template>

<script>
import ThemeStyle from "@/mixins/ThemeStyle";
import specialPeriods from "@/utils/specialPeriods";

export default {
  name: 'ThemeStyleSwitcher',
  mixins: [ThemeStyle],
  computed: {
    themeStyle: {
      get () {
        return this.$store.state.ui.activeThemeStyle
      },
      set (value) {
        this.changeThemeStyle(value, true)
        this.$ga.event(
          'settings',
          'themeStyle',
          value
        )
      }
    },
    themes () {
      return [
        {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 342"><g fill="currentColor"><path d="M182.3 331.5c.5-3.3.4-3.5-2.3-3.5-1.6 0-4.1-.5-5.5-1-1.9-.7-3.9-.7-6.5.1-3.1.9-4.7.9-8.6-.5-2.6-.9-6.3-1.6-8.1-1.6-1.8 0-3.3-.4-3.3-.9 0-1.7-8.9 2.1-9.6 4.1-.6 2-.6 1.9-1.8-.2-1.1-2.3-4.6-3.7-4.6-1.9 0 .5-.9.9-1.9.9-2.6 0-15-3.8-18.3-5.5-2.3-1.4-2.9-1.3-5.7.2-2.1 1.2-2.9 2.3-2.5 3.5.4 1.4.1 1.5-3.1.5-2.8-.8-3.8-.8-4.4.2-.5.8-1.7-.9-3.3-4.6-4.3-10-4.8-11.5-6.3-23.3-2.1-16.8-2.4-17.8-4.9-18.2-1.5-.2-2-.9-1.8-2.5.2-1.5-1.1-3.6-4.3-6.7-4.3-4.4-4.8-4.6-10.2-4.6-5.3 0-5.5-.1-4-1.8 1.4-1.5 1.5-2.4.5-5.6-1.1-3.5-1-3.9 1.1-5.6 1.4-1 2.1-2.2 1.7-2.9-.4-.7-1.1-4.2-1.4-7.9-.7-6.7-.7-6.7-6.9-8.2-5.6-1.4-10.3-4.1-10.3-6.1 0-.4-1.2-2.1-2.6-3.6-1.4-1.5-3.9-4.5-5.6-6.5-2.9-3.7-2.9-3.7-.1-2.9 1.5.5 6.1 1.5 10.1 2.2 4.6.8 7.8 1.9 8.5 2.9.7 1 3.2 4.1 5.7 7 2.5 2.9 5 6 5.6 6.8 2.5 3.5 11.4-.3 11.4-4.9 0-1-1.7-5.1-3.8-9.1-2.1-4-4.1-8.4-4.5-9.6-.4-1.9-1-2.2-2.8-1.7-4 1.3-13.6 2.1-15.5 1.4-1.1-.4-1.3-.8-.6-.8 2.1-.1 11.4-9.3 12.8-12.7 1-2.3 1-4.8.3-10.5-.6-4-1.1-14-1.2-22.1-.1-8.2-.3-14.8-.5-14.8s-1.6 2.8-3.2 6.3c-4 8.3-3.8 6.4 1-8.9 7.9-25.7 17.9-48.6 27.2-62 4.8-7 17.1-19.7 23.4-24.2 3.7-2.5 19.3-8.4 35.4-13.3 6.4-2 26.6-1.7 36 .5 4.1 1 9.8 2.1 12.6 2.6 8.4 1.4 21.1 6.9 30.5 13.2 17.2 11.5 25.7 21.4 35.9 41.8 5.5 11 16.3 37 15.7 37.7-.2.2-2.9-3.8-6-8.9-3-5.1-6.2-10.2-7.1-11.3-1.5-1.9-1.5-1.9-1.6 1.2 0 5.5 6.8 39.3 10 49.3 1.6 5.2 3.9 11 5 12.8 1.9 3 2.3 3.2 5.7 2.6 3.7-.7 3.7-.7 1.5 3-2.8 4.7-2.8 5.3.5 10 2.6 3.9 2.6 3.9-2 .6-4.4-3.1-4.8-3.2-6.5-1.7-2.4 2.2-8.6 4.7-11.7 4.7-1.4 0-2.5.4-2.5.9 0 1.8 6.1 6 9.8 6.7 3.5.7 3.5.8 1.2 1.5-7 2-16.7.3-21.2-3.8-2.5-2.2-3.3-1-1.9 2.8.6 1.8 1.1 5.4 1.1 8 0 2.7.5 4.9 1 4.9 2.6 0 8.8-5.1 9.5-7.7.7-2.8.7-2.8 2.2-.5.9 1.2 2.3 2.2 3.3 2.2.9 0 2 .3 2.4.8.4.4 1.1.7 1.4.7 1.4.1 5.2 2.6 5.2 3.4 0 .4-1.7 1.3-3.8 1.9-2.1.7-4.7 2.4-6 4.1-1.1 1.6-3.5 3.6-5.3 4.5-5.3 2.6-15.8 11-15.9 12.6 0 1.7-8.5 7.3-11.3 7.6-1 .1-4.8 1.4-8.5 2.9-15.9 6.4-14.9 5.8-13.3 8.4.7 1.2 1.7 1 5.3-1.1 6.1-3.6 11.8-4.9 21.7-5.1 6.1 0 9.6.4 11.9 1.5 3 1.5 3.2 1.5 3.2-.1 0-.9-.7-2.7-1.7-4-.9-1.3-1.2-2.2-.7-2 3.4 1.6 8.3 4.8 10.7 7.2 2.4 2.3 2.8 3.3 2.3 5.8s0 3.5 2.9 6c4.3 3.8 4.7 6.1.4 2.5-3.5-3-6-3.5-3.6-.8 1.3 1.5 1.4 2.1.4 3.1-.9 1-.7 1.7 1.3 3.3 2.5 2.1 2.5 2.1.1 1.3-2.1-.6-2.3-.5-1.6 1.1.4 1.1 1.2 3.3 1.7 4.9 1.3 3.5 2.7 5.5 4 5.5.5 0 .4-.9-.2-1.9-1.6-3-1.2-4.1 1.4-4.1 1.4 0 2.8-.5 3.1-1 .4-.6 1-.8 1.5-.5.4.3 1.1-.2 1.4-1.1.3-.9 1.3-1.4 2.1-1 .8.3 1.7 0 2.1-.6.4-.6 1.2.1 1.9 1.8 1.4 3.4.4 5.4-2.9 5.4-1.3 0-2.7 1.1-3.7 2.9-2.5 4.3-13.5 12.6-20.9 15.7-7.2 3.1-8 3.8-7.2 6.6.4 1.8-.1 1.9-5.9 1.8-7.5-.1-11.3.3-15.2 1.9-4.9 1.9-6 1.5-5.5-2.4.3-2.8.1-3.2-1-2.3-.7.7-1.2 2.2-.9 3.5.4 2.2.2 2.3-5.7 2.3-3.6 0-6.8-.5-7.5-1.2-1.1-1.1-1.3-1-.9.2.3.8-.1 2.3-.9 3.2-1.2 1.3-2 1.5-4.1.7-2.9-1.1-8.2.5-8.2 2.5 0 .6-1.3 1.7-3 2.3-1.6.6-3 1.8-3 2.7 0 1.1-.9 1.6-3.1 1.6-3.1 0-3.1-.1-2.6-3.5zm-83.5-70.6c3.7-2.2 7.1-3.4 13.1-4.2 4.5-.7 8-1.6 7.9-2.2-.2-.5.7-1.4 1.9-2 3.4-1.5 4.6-5.9 3.2-12.2-.7-2.9-1.6-5.3-2-5.3-.5 0-1.8 1.9-2.9 4.2-2 4.3-2 4.3.1 7.2 2.2 2.9 2.2 2.9-2 .5-4-2.2-4.3-2.2-5.2-.6-1.5 2.6-3 2.1-2.3-.8.4-1.6.2-2.5-.5-2.5-.6 0-4.7-3.4-9-7.5s-8.3-7.5-9-7.5c-.6 0-1.6 1.1-2.1 2.4-.5 1.3-1.8 2.7-2.9 3.1-1.2.3-2.1 1.3-2.1 2.1s-.5 1.2-1.1.9c-1.4-.9-6.1.4-5.4 1.5.3.5 5.1 2.4 10.6 4.2 5.6 1.8 10.4 3.9 10.7 4.7.5 1.3-3.2 5.3-6 6.4-1 .4-1 .8.2 1.6s1.1 1.4-1 3.5c-1.3 1.5-3.1 2.6-3.9 2.6-1.3.1-1.2.3.3 1.5 2.8 2.1 3.8 1.9 9.4-1.6zm15.6-28.1c1.1-4.2.6-5.9-2.1-8.3-2.9-2.5-5.3-3.2-5.3-1.5 0 1.5 5.3 12 6.1 12 .4 0 .9-1 1.3-2.2zm123.1-1.9c1.9-1.2 4.3-1.8 5.2-1.5 2.5 1 8.3-1.3 8.2-3.2 0-2.3-5.1-12.5-6.4-12.9-.9-.3-4.5 7-4.5 9.1 0 .4 1.1.6 2.5.4 3.7-.8 3 .1-2 2.3-4 1.8-7.5 5.1-7.5 7.1 0 1.2.5 1 4.5-1.3zm32.5-42.6c0-1.4-4.5-9.3-5.2-9.3-.5 0-.9 1.1-.9 2.5-.1 1.4-.2 3-.3 3.7-.1.7 1 1.8 2.4 2.5 2.9 1.5 4 1.6 4 .6z"/><path d="M76.7 296.6c-.3-.8.1-1.7.9-2 2.6-1 3.2-.7 2.7 1.4-.6 2.3-2.8 2.7-3.6.6zM53.6 295.2c-.3-.5 2.6-4 6.4-7.6 6.7-6.3 7.3-6.6 12-6.6 2.8 0 5 .2 5 .5 0 .2-.7 1.9-1.6 3.8-1.3 2.8-2.8 3.8-8.8 6-4 1.5-7.9 2.7-8.7 2.7-.8 0-2 .5-2.6 1.1-.7.7-1.3.7-1.7.1zM296.1 283.3c-5.8-.4-7.2-.9-12.8-4.9-6.1-4.3-8.2-7.1-4.5-6 1 .3 4.4.7 7.6.7 4.9.1 7.1.9 14.2 4.9 8.3 4.6 9.5 6.2 4.5 5.8-1.4-.1-5.5-.3-9-.5zM59.7 273.1c-.3-1.3.1-2.1 1.3-2.4 2.5-.6 4.2.7 3.4 2.6-.8 2.3-4.1 2.1-4.7-.2zM290.7 266c-.6-2.2 1-4 2.9-3.3 2.1.8 1.7 4-.5 4.6-1.3.3-2.1-.1-2.4-1.3zM262.7 254.8c-4.2-1.1-4.3-2.3-.6-5 1.6-1.2 5.1-2 10.9-2.4 8.5-.6 8.5-.6 4.6 2.7-7.1 6.1-8.2 6.5-14.9 4.7zM56 249.1c0-2.1 1.3-4.1 2.6-4.1 1.9 0 1.8 1.5-.2 3.4-1.8 1.8-2.4 2-2.4.7zM296.7 240.9c-2-1.2-2.3-3.9-.3-3.9.7 0 1.6 1 1.9 2.2.8 2.7.6 2.9-1.6 1.7zM279.5 228.1c.3-1.4 1.4-3.7 2.3-5.1.9-1.4 1.9-3.4 2.2-4.5.5-1.5 3-2.8 10.5-5.3 5.5-1.7 10.9-3.4 12-3.6 1.1-.2 2.9-.8 4-1.2 1.9-.7 1.9-.6-.1 1.7-1.2 1.3-3.4 3.9-5 5.8-8.3 9.7-10.6 11.2-22.2 13.9-4.4 1-4.4 1-3.7-1.7zM66.4 221.5c-.3-.8-.3-1.9 0-2.4.9-1.3 3.6-.2 3.6 1.4 0 1.9-3 2.7-3.6 1zM284.6 212.2c-.3-.6.3-1.2 1.5-1.5 1.2-.3 1.9-.1 1.6.6-.5 1.5-2.4 2-3.1.9zM196 41.6c-.3-.2-3.7-.7-7.5-1-8.2-.7-24-4.6-33.2-8.3-8.1-3.2-20.3-11.1-22.6-14.6-3-4.6-2.3-6.3 3.6-8.3 15-5 65.5 2 84.9 11.7 10.7 5.4 13.4 10.5 7.3 14-4.4 2.6-31.1 7.9-32.5 6.5zm15.2-9.9c3.2-.8 6.1-1.1 6.4-.8.4.3.4 0 0-.6-2.1-3.7-21.1-9.8-36.4-11.8-9.3-1.2-27-2.1-32.4-1.6-4.1.3-1.2 3.2 7.5 7.5 18.2 8.9 37.5 11.5 54.9 7.3z"/></g></svg>',
          text: this.$t('menu.settings.themeStyles.default'),
          value: 'default',
          disabled: specialPeriods.miku2021()
        },
        {
          icon: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path fill="none" d="M0 0h512v512H0z"/><path d="M92.7 205.2c6.6 0 12.5-1 18.1-2.7 5.4-1.7 10-4 14.3-7.1a32.3 32.3 0 0013-26c0-11.3-4-19.4-11.8-24.3a63.7 63.7 0 00-32.2-7.2H78.4v-11.7L126.8 65H53.4V47.4h97V65L102 121.7h4c7.5 0 14.4 1 20.5 3.2a52.2 52.2 0 0116.2 9.1 41.4 41.4 0 0114.5 33.2 50.2 50.2 0 01-19.1 40.7 58.6 58.6 0 01-20.6 10.5 111.6 111.6 0 01-64-2.7l4.8-17.1c4.2 2 9.3 3.4 15 4.6 5.6 1.5 12.2 2 19.4 2zM194 99.2a61 61 0 013.7-21.4A47.4 47.4 0 01209 60.4c5-5 11-8.8 18.4-11.8 7.4-2.7 16-4.2 25.8-4.2 9 0 17.4 1.5 24.5 4.5 7.1 2.9 13.3 7 18.4 12.2a56 56 0 0111.3 19.4c2.7 7.6 4 16.2 4 25.5 0 18.4-2.3 34.4-7 48.4-4.6 14-11 25.8-19 35.3a89 89 0 01-29 22.6 107.6 107.6 0 01-36.6 9.8l-3.7-15.4a88.3 88.3 0 0029-7.9 76.6 76.6 0 0037.3-37.8c4-8.3 6.6-17.2 8-26.7a39.7 39.7 0 01-17 11.5c-3 1.2-6.7 2-10.7 2.5-3.9.4-8.3.7-13.4.7-7.7 0-14.8-1.2-21.4-3.4a49.2 49.2 0 01-17.4-10.1A47 47 0 01194 99.2zm20.2-2c0 11.8 3.6 20.6 10.8 26.5a42.7 42.7 0 0028.2 8.8c9.3 0 17.4-1.4 24.3-4.4a30.1 30.1 0 0014.2-10.5c.3-2.2.5-4.2.5-5.7v-4.6a50.1 50.1 0 00-9.6-32 35.7 35.7 0 00-12.5-10.7 41 41 0 00-18.6-4 37.9 37.9 0 00-27.5 9.6c-6.7 6.4-9.8 15.5-9.8 27zM438.7 66c-2.7-1.2-5.9-2-9-2.7a89 89 0 00-12.3-.7c-6.7 0-13.3 1.2-19.7 3.7a41.4 41.4 0 00-17.1 12c-5.2 5.6-9.1 12.8-12 21.8-3.3 9.1-4.7 20.2-4.7 33.2 0 11.8 1.4 22 4.1 31a62.5 62.5 0 0011.3 22 44 44 0 0017.5 13.2c6.6 3 14.2 4.5 22.5 4.5a62.4 62.4 0 0022.1-4.2v-24.5h18.2v33l.2.6a63 63 0 01-18.6 9.3c-7.6 2.7-16.7 4-27.5 4a71.8 71.8 0 01-28.5-5.5 59.3 59.3 0 01-22.8-16 72.8 72.8 0 01-14.7-27.7c-3.7-11-5.4-24.3-5.4-39.7 0-16 2-29.7 5.9-41 3.9-11 9.3-20.4 16-27.5a58 58 0 0123.5-15.5c8.8-3.1 18.4-4.9 28.4-4.9 5.7 0 10.4.3 14.5.5 4.2.5 7.6 1.3 10.8 1.7a37 37 0 018.4 3c2.2 1.2 4.6 2.4 6.8 4h.3v38.7h-18.2V66zM94.6 450.4c6.2 0 12-.8 17.2-2.5 5.2-1.4 9.8-3.9 13.5-7 3.7-3.3 6.4-7.2 8.6-11.9 2-4.6 3-10.3 3-16.7 0-11.7-4.2-20.8-12.6-27-8.6-5.8-20.1-9-34.6-9l-23 1.2v-84.7h84.1v17.7H85.1v49.8l12.2-.5c18.2 0 32.4 4.4 43 13.3 10.5 8.8 15.7 21.3 15.7 37.8 0 9-1.5 17.1-4.7 24.3a55.1 55.1 0 01-32.9 28.7c-7.8 2.4-16 3.7-25 3.7a85.4 85.4 0 01-35.3-7.4c-3-1.2-4.7-2.2-6-3.2l8-16a60.8 60.8 0 0034.6 9.3zM307.2 332a44.4 44.4 0 01-7.9 24.4 38.4 38.4 0 01-10 9.8c-4.2 2.7-8.9 5-14.5 6.4v1a59 59 0 0114.2 4.1 38.8 38.8 0 0120.1 20.7c2.2 4.9 3.2 10.8 3.2 17.4a44.9 44.9 0 01-19.9 38.8c-6 4.1-13 7-20.6 9a94 94 0 01-23.5 3h-9.8c-3.7 0-7.7 0-11.8-.3-4.2-.2-8.1-.7-12.3-1a96 96 0 01-10.8-2v-169a318.5 318.5 0 0147.4-3.4c6.4 0 12.7.4 19.6 1.4a59.4 59.4 0 0118 6.2c5.3 3.2 9.7 7.3 13.4 12.7a38 38 0 015.2 20.9zm-57 117a63 63 0 0015.2-2 34.7 34.7 0 0022-15.7 28 28 0 003.3-14c0-6.7-1.2-12-3.9-16.2a28.1 28.1 0 00-10.6-9.6 47 47 0 00-14.7-4.7 120 120 0 00-16.2-1.2H224v61.6c1.2.2 2.7.5 4.9.7 2.2.3 4.4.3 6.9.5 2.4.3 4.9.3 7.6.3 2.7.2 4.9.2 6.8.2zm-13.5-80.6c2.7 0 6.2 0 10.1-.2l9.8-.8A56 56 0 00277 356c2.7-2.7 4.6-5.7 6.4-8.8 1.4-3.2 2.2-7 2.2-10.8 0-5.4-1-9.9-3-13.5-2.2-3.7-4.9-6.4-8.3-8.6a31 31 0 00-11.8-4.5c-4.4-.7-8.8-1.2-13.5-1.2-5.4 0-10.3 0-14.7.3-4.7.2-8.1.7-10.3 1.2v58.4h12.7zM454.4 332a44.4 44.4 0 01-7.8 24.4 38.4 38.4 0 01-10 9.8c-4.3 2.7-9 5-14.6 6.4v1a59 59 0 0114.3 4.1 38.8 38.8 0 0120.1 20.7c2.2 4.9 3.2 10.8 3.2 17.4a44.9 44.9 0 01-19.9 38.8c-6.1 4.1-13 7-20.6 9a94 94 0 01-23.6 3h-9.8c-3.7 0-7.6 0-11.8-.3-4.1-.2-8-.7-12.2-1a96 96 0 01-10.8-2v-169a318.5 318.5 0 0147.3-3.4c6.4 0 12.8.4 19.7 1.4a59.4 59.4 0 0117.9 6.2c5.4 3.2 9.8 7.3 13.5 12.7a38 38 0 015.1 20.9zm-57 117a63 63 0 0015.3-2 34.7 34.7 0 0022-15.7 28 28 0 003.3-14c0-6.7-1.2-12-4-16.2a28.1 28.1 0 00-10.5-9.6 47 47 0 00-14.7-4.7 120 120 0 00-16.2-1.2h-21.4v61.6c1.3.2 2.7.5 5 .7 2.1.3 4.4.3 6.8.5 2.5.3 5 .3 7.6.3 2.7.2 5 .2 6.9.2zM384 368.3c2.7 0 6.1 0 10-.2l9.9-.8a56 56 0 0020.3-11.5c2.7-2.7 4.7-5.7 6.4-8.8 1.5-3.2 2.2-7 2.2-10.8 0-5.4-1-9.9-3-13.5-2.1-3.7-4.8-6.4-8.3-8.6a31 31 0 00-11.7-4.5c-4.5-.7-8.9-1.2-13.5-1.2-5.4 0-10.3 0-14.8.3-4.6.2-8 .7-10.3 1.2v58.4H384z" fill="currentColor" fill-rule="nonzero"/></svg>',
          text: this.$t('menu.settings.themeStyles.miku2021'),
          value: 'miku2021'
        }
      ]
        .map(el => {
          if (el.disabled) el.text += ` ${this.$t('menu.settings.themeStyles.disabled')}`
          return el
        })
    }
  }
}
</script>

<style scoped>

</style>
