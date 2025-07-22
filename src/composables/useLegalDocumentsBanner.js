import { ref, computed, onMounted } from 'vue'

export function useLegalDocumentsBanner() {
  // Dates de dernière modification des documents légaux (format ISO)
  const lastModifiedDates = {
    termsAndConditions: '2025-07-21T00:00:00Z',
    privacyPolicy: '2025-07-21T00:00:00Z',
    legalMentions: '2025-07-21T00:00:00Z',
    ecoDesignPolicy: '2025-07-22T00:00:00Z'
  }

  const bannerDismissed = ref(false)
  const BANNER_DURATION_DAYS = 7

  // Clé pour le localStorage basée sur la date de modification la plus récente
  const getStorageKey = () => {
    const latestDate = Math.max(...Object.values(lastModifiedDates).map(date => new Date(date).getTime()))
    return `legal_banner_dismissed_${latestDate}`
  }

  // Calculer si la bannière doit être affichée
  const shouldShowBanner = computed(() => {
    if (bannerDismissed.value) return false

    const now = new Date()
    const latestModificationDate = Math.max(
      ...Object.values(lastModifiedDates).map(date => new Date(date).getTime())
    )

    const daysSinceModification = (now.getTime() - latestModificationDate) / (1000 * 60 * 60 * 24)

    return daysSinceModification <= BANNER_DURATION_DAYS
  })

  // Obtenir le document le plus récemment modifié
  const getLatestModifiedDocument = () => {
    let latestDate = 0
    let latestDocs = []

    // Trouver la date la plus récente
    Object.entries(lastModifiedDates).forEach(([doc, date]) => {
      const timestamp = new Date(date).getTime()
      if (timestamp > latestDate) {
        latestDate = timestamp
        latestDocs = [doc]
      } else if (timestamp === latestDate) {
        latestDocs.push(doc)
      }
    })

    const docNames = {
      termsAndConditions: 'Conditions Générales d\'Utilisation',
      privacyPolicy: 'Politique de Confidentialité',
      legalMentions: 'Mentions Légales',
      ecoDesignPolicy: 'Politique d\'Écoconception'
    }

    // Si plusieurs documents ont été modifiés à la même date
    if (latestDocs.length > 1) {
      const docNamesList = latestDocs.map(doc => docNames[doc])
      return {
        name: docNamesList.join(', '),
        date: new Date(latestDate).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        isMultiple: true
      }
    }

    // Un seul document modifié
    return {
      name: docNames[latestDocs[0]],
      date: new Date(latestDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      isMultiple: false
    }
  }

  // Fermer la bannière
  const dismissBanner = () => {
    bannerDismissed.value = true
    localStorage.setItem(getStorageKey(), 'true')
  }

  // Vérifier si la bannière a été fermée au chargement
  onMounted(() => {
    const dismissed = localStorage.getItem(getStorageKey())
    bannerDismissed.value = dismissed === 'true'
  })

  return {
    shouldShowBanner,
    dismissBanner,
    getLatestModifiedDocument
  }
}
