<template>
  <div v-if="jsonLd" style="display: none;" v-html="jsonLdScript"></div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  type: {
    type: String,
    default: 'WebSite'
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const route = useRoute()
const jsonLd = ref(null)

const defaultData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naurellia',
  url: 'https://www.naurellia.com',
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://www.naurellia.com/#logo',
    url: 'https://www.naurellia.com/logo.webp',
    width: '512',
    height: '512',
    caption: 'Logo Naurellia'
  },
  description: 'Découvrez l\'Île de Ré de manière responsable. Informations, conseils et ressources pour un tourisme durable et respectueux.',
  potentialAction: {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://www.naurellia.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.naurellia.com/#organization',
  name: 'Naurellia',
  url: 'https://www.naurellia.com',
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://www.naurellia.com/#logo',
    url: 'https://www.naurellia.com/logo.webp',
    width: '512',
    height: '512',
    caption: 'Logo Naurellia'
  }
}

watch(() => props.data, updateJsonLd, { immediate: true })
watch(() => props.type, updateJsonLd)
watch(() => route.path, updateJsonLd)

function updateJsonLd() {
  if (props.type === 'Organization') {
    jsonLd.value = { ...organizationData, ...props.data }
  } else {
    const data = { ...defaultData, ...props.data }
    data['@type'] = props.type
    jsonLd.value = data
  }
}

const jsonLdScript = computed(() => {
  if (!jsonLd.value) return ''
  return `<script type="application/ld+json">${JSON.stringify(jsonLd.value)}<\/script>`
})
</script>
