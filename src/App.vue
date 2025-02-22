<template>
  <v-app
    :class="appEnvironment"
  >
    <ServerNotifyOverlay />
    <ModuleLoadingOverlay v-if="!environment.runtime.isApp" />
    <UpgradeNotifier />
    <GlobalSnackbar />
    <MirrorSelector />
    <v-navigation-drawer
      v-model="drawer"
      app
      :style="{'filter': isInSpecialUI ? 'grayscale(1)' : ''}"
      class="safe-area--navigation-drawer"
      width="300px"
    >
      <Logo />
      <v-list
        dense
        nav
        expand
        class="safe-area--navigation"
      >
        <GlobalSearchNavigation />

        <Navigation
          v-for="route in routes"
          :key="route.name"
          :route="route"
        />

        <v-divider class="mt-2 mb-1" />

        <v-container style="margin-bottom: 360px">
          <v-row
            justify="space-around"
          >
            <v-btn
              v-haptic
              outlined
              text
              class="flex-grow-1 mr-1"
              :loading="pending"
              @click="refreshData"
            >
              <v-icon left>
                mdi-database-refresh
              </v-icon>
              {{ $t('menu.refreshData') }}
            </v-btn>

            <SettingsDialog />
          </v-row>
          <v-row
            justify="center"
            class="mt-2"
          >
            <v-expand-transition>
              <div
                v-if="lowData"
                class="text-center overline"
              >
                {{ $t('settings.optimization.lowData.active') }}
              </div>
            </v-expand-transition>
          </v-row>
        </v-container>
      </v-list>

      <template v-if="$store.state.ui.activeThemeStyle === 'miku2021'">
        <v-img
          :src="cdnDeliver('/images/themes/miku2021/portrait.png')"
          style="position: absolute; bottom: 0; z-index: 0"
          position="bottom right"
          height="calc(250px + 10vh)"
          width="100%"
          :aspect-ratio="1"
          class="v-image--fade-down fallthrough"
        />

        <v-theme-provider dark>
          <v-hover>
            <template #default="{ hover }">
              <div
                style="position: absolute; width: 100%; height: 48px; bottom: 0; right: 0; z-index: 0; user-select: none; background: linear-gradient(to top, #39c5bb, rgba(57,197,187, 0)); text-shadow: 0 0 4px rgba(0, 0, 0, .5)"
                class="d-flex align-center justify-center text-center overline cursor-default"
              >
                <span class="d-flex flex-row align-center justify-center white--text pt-1">
                  <v-slide-x-reverse-transition>
                    <span
                      v-if="hover"
                      class="degraded-opacity"
                    >❤</span>
                  </v-slide-x-reverse-transition>
                  <span class="mx-1">{{ $t('specials.mikubirthday2021.caption') }}</span>
                  <v-slide-x-transition>
                    <span
                      v-if="hover"
                      class="degraded-opacity"
                    >❤</span>
                  </v-slide-x-transition>
                </span>
              </div>
            </template>
          </v-hover>
        </v-theme-provider>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      id="penguin-toolbar"
      elevate-on-scroll
      app
      dark
      color="primary darken-1"
      :style="{'filter': isInSpecialUI ? 'grayscale(1)' : ''}"
      class="x--safe-area toolbar--safe-area flex-column transition-all overflow-hidden"
    >
      <v-app-bar-nav-icon
        v-haptic
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title class="pl-2">
        <transition
          name="fade-transition"
          mode="out-in"
        >
          <v-avatar
            :size="32"
            class="mr-2"
          >
            <v-img
              :src="randomizedLogo"
              class="randomizedLogo"
            />
          </v-avatar>
        </transition>
        <span class="title force-lang-font">
          {{ $t($route.meta.i18n) }}
        </span>
      </v-toolbar-title>

      <v-spacer />

      <ServerSelector />

      <AccountManager />

      <!--      <v-progress-linear-->
      <!--        :active="pending"-->
      <!--        :indeterminate="pending"-->
      <!--        absolute-->
      <!--        bottom-->
      <!--        class="width: 100%"-->
      <!--        color="deep-purple accent-4"-->
      <!--      />-->
    </v-app-bar>
    <RandomBackground />
    <v-content
      :style="{'filter': isInSpecialUI ? 'grayscale(1)' : ''}"
      class="safe-area--v-content"
    >
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <router-view />
      </transition>
      <Footer v-if="!environment.runtime.isApp" />
    </v-content>
    <NetworkStateIndicator />
  </v-app>
</template>

<script>
import RandomBackground from '@/components/global/RandomBackground'
import GlobalSnackbar from '@/components/global/GlobalSnackbar'

import AccountManager from '@/components/toolbar/AccountManager'
import NetworkStateIndicator from '@/components/toolbar/NetworkStateIndicator'

import Navigation from '@/components/drawer/Navigation'

import GlobalEntry from '@/mixins/hooks/GlobalEntry'

import './styles/global.css'
import './styles/modules.scss'
import './styles/fonts.css'
import './styles/theme-adapt.scss'
import Footer from '@/components/global/Footer'
import CDN from '@/mixins/CDN'
import Mirror from '@/mixins/Mirror'
import SpecialUI from '@/mixins/SpecialUI'
import SettingsDialog from '@/components/drawer/SettingsDialog'
import MirrorSelector from '@/components/global/MirrorSelector'
import Logo from '@/components/drawer/Logo'
import { mapGetters } from 'vuex'
import UpgradeNotifier from '@/components/global/UpgradeNotifier'
import ServerSelector from '@/components/toolbar/ServerSelector'
import ServerNotifyOverlay from '@/components/global/ServerNotifyOverlay'
import GlobalSearchNavigation from '@/components/search/GlobalSearchNavigation'
import ModuleLoadingOverlay from '@/components/global/ModuleLoadingOverlay'
import Environment from '@/mixins/Environment'

export default {
  name: 'App',
  components: {
    ModuleLoadingOverlay,
    GlobalSearchNavigation,
    ServerNotifyOverlay,
    ServerSelector,
    UpgradeNotifier,
    Logo,
    MirrorSelector,
    SettingsDialog,
    Footer,
    Navigation,
    GlobalSnackbar,
    NetworkStateIndicator,
    RandomBackground,
    AccountManager
  },
  mixins: [GlobalEntry, CDN, Mirror, SpecialUI, Environment],
  data () {
    return {
      routes: [],
      drawer: !this.$vuetify.breakpoint.xsOnly,
      showLicenseDialog: false
    }
  },
  computed: {
    ...mapGetters('settings', ['lowData']),
    ...mapGetters('ajax', ['pending'])
  },
  created () {
    this.routes = this.$router.options.routes.filter(el => !el.meta.hide)
    this.$store.dispatch('data/fetch', false)
  },
  methods: {
    async refreshData () {
      await this.$store.dispatch('data/fetch', true)
    }
  }
}
</script>
