<template>
  <v-card class="bkop-light px-8 elevation-4 mt-2">
    <v-row
      align="start"
      align-content="start"
    >
      <v-col
        cols="12"
        sm="7"
        md="8"
        lg="9"
        xl="10"
      >
        <StagePattern :stage-id="stage.stageId" />
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card-title class="py-4 pl-0">
          <v-icon left>
            mdi-information
          </v-icon>
          {{ $t('stage.about') }}
        </v-card-title>

        <!--        <FactTable class="mb-4">-->
        <!--          <FactTableItem-->
        <!--            title="章节"-->
        <!--            :content="zone.zoneName"-->
        <!--          />-->
        <!--          <FactTableItem-->
        <!--            title="作战"-->
        <!--            :content="stage.code"-->
        <!--          />-->
        <!--        </FactTable>-->

        <FactTable class="mb-6">
          <FactTableItem
            :title="$t('stats.headers.apCost')"
            :content="stage.apCost"
          />
          <FactTableItem
            :title="$t('stats.headers.clearTime')"
            :content="formatDuration(stage.minClearTime)"
          />
        </FactTable>

        <BackdropCard
          v-for="link in links"
          :key="link.id"
          small
          hover
          dense
          :href="link.href"
          class="bkop-medium mb-2 py-3 "
        >
          <template #backdrop>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </template>

          <h2 class="heading d-flex flex-row align-center px-6">
            <span class="text-left text-no-wrap">
              {{ $t('stage.actions.links.' + link.id) }}
            </span>
            <v-divider class="flex-grow-1 ml-2 mr-1" />
            <span class="caption monospace ml-1 flex-shrink-1">
              <v-icon
                small
              >
                mdi-open-in-new
              </v-icon>

              {{ link.hostname }}
            </span>
          </h2>
        </BackdropCard>

        <v-card-title class="py-4 pl-0">
          <v-icon left>
            mdi-chevron-double-right
          </v-icon>
          {{ $t('stage.actions._name.panel') }}
        </v-card-title>

        <v-hover>
          <template #default="{ hover }">
            <v-btn
              v-haptic
              large
              block
              color="yellow"
              :outlined="!isFavorite"
              :light="isFavorite"
              class="mb-2 flex-grow-1"
              :class="{'text--darken-4': !dark && !isFavorite}"
              @click="toggleFavorite"
            >
              <v-slide-y-transition leave-absolute>
                <div v-if="isFavorite">
                  <v-scroll-x-transition
                    leave-absolute
                  >
                    <span
                      v-if="hover"
                      key="is-favorite-hover"
                      class="d-flex flex-row caption favorite-hover-border"
                    >
                      <v-icon
                        left
                        small
                      >
                        mdi-star-off
                      </v-icon>
                      {{ $t('stage.actions.star.deactivate') }}
                    </span>
                    <span
                      v-else
                      key="is-favorite"
                      class="d-flex flex-row"
                    >
                      <v-icon left>
                        mdi-star
                      </v-icon>
                      {{ $t('stage.actions.star.activated') }}
                    </span>
                  </v-scroll-x-transition>
                </div>
              </v-slide-y-transition>
              <v-slide-y-reverse-transition leave-absolute>
                <span
                  v-if="!isFavorite"
                  key="not-favorite"
                  class="d-flex flex-row"
                >
                  <v-icon left>
                    mdi-star-outline
                  </v-icon>
                  {{ $t('stage.actions.star.activate') }}
                </span>
              </v-slide-y-reverse-transition>
            </v-btn>
          </template>
        </v-hover>

        <v-btn
          v-haptic
          block
          large
          color="orange"
          outlined
          :class="{'orange--text text--darken-4': !dark}"
          class="mb-2 black--text"

          :to="{ name: 'AdvancedQuery', query: { stage: stage.stageId } }"
        >
          <v-icon left>
            mdi-database-search
          </v-icon>
          {{ $t('stage.actions.advanced.activator') }}
        </v-btn>

        <Share :stage="stage" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import timeFormatter from '@/utils/timeFormatter'
import FactTable from '@/components/stats/fact-table/FactTable'
import FactTableItem from '@/components/stats/fact-table/FactTableItem'
import BackdropCard from '@/components/global/BackdropCard'
import Theme from '@/mixins/Theme'
import mirror from '@/utils/mirror'
import StagePattern from '@/components/stats/details/StagePattern'
import Share from '@/components/stats/details/Share'

export default {
  name: 'StageDetails',
  components: { Share, StagePattern, BackdropCard, FactTableItem, FactTable },
  mixins: [Theme],
  props: {
    stage: {
      type: Object,
      required: true
    },
    zone: {
      type: Object,
      required: true
    },
    stats: {
      type: Array,
      required: true
    }
  },
  computed: {
    links () {
      const links = [
        {
          id: 'prts-wiki',
          icon: 'mdi-file-document',
          href: `http://prts.wiki/w/${this.stage.stageId}`
        }
      ]

      if (!this.stage.isGacha) {
        links.push({
          id: 'map-arknights-com',
          icon: 'mdi-map',
          href: mirror.adapter({
            cn: `https://mapcn.ark-nights.com/map/${this.stage.stageId}`,
            io: `https://map.ark-nights.com/map/${this.stage.stageId}`
          })
        })
      }

      return links
        .map(el => ({
          ...el,
          hostname: new URL(el.href).hostname
        }))
    },
    isFavorite () {
      return this.$store.getters['stagePreferences/hasFavorite'](this.stage.stageId)
    }
  },
  methods: {
    formatDuration (s) {
      return timeFormatter.duration(s)
    },
    toggleFavorite () {
      this.$store.commit('stagePreferences/toggleFavorite', this.stage.stageId)
    }
  }
}
</script>

<style scoped>
.favorite-hover-border {
  border-color: rgba(0, 0, 0, 1);
  border-width: 0 0 0 2px;
  border-style: solid;
  padding-left: 12px;
}
</style>
