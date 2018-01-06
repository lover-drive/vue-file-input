import VueFileInput from './components/VueFileInput.vue'

const VueFileInputPlugin = {
  install (Vue, options) {
    Vue.component(VueFileInput.name, VueFileInput)
  }
}

export default VueFileInputPlugin
