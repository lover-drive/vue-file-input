<template lang="pug">
  div.vue-file-input(:class="{ 'drag-over': isDragOver }", @click="onClick", @drop="onDrop", @dragleave="onDragEnd", @dragover="onDragOver")
    input(type="file", :accept='accept', :multiple="multiple", @change="onFileChange", ref="input")
    div(:style="previewStyle").image-preview
    p(v-if="!hasDefaultSlot") Upload
    slot
</template>

<script>
  export default {
    components: {},
    name: 'vue-file-input',
    props: {
      accept: {
        type: String,
        required: false
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      },
      detectPaste: {
        type: Boolean,
        required: false,
        default: true
      },
      fullWindow: {
        type: Boolean,
        required: false,
        default: false
      },
      imagePreview: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        previewStyle: null,
        isDragOver: false
      }
    },
    computed: {
      hasDefaultSlot () {
        return !!this.$slots.default
      }
    },
    methods: {
      fireEvent (_files) {
        let _e = new CustomEvent('change', {
          detail: {
            'files': _files
          }
        })
        this.$emit('change', _e)
      },
      onClick (_e) {
        this.$refs.input.click()
      },
      onDragOver (_e) {
        this.isDragOver = true
        _e.preventDefault()
      },
      onDragEnd (_e) {
        this.isDragOver = false
        _e.preventDefault()
      },
      onDrop (_e) {
        this.fireEvent(this.itemsToFiles(_e.dataTransfer.items))
        _e.preventDefault()
      },
      onFileChange (_e) {
        let _result = []
        let _files = _e.target.files

        for (let i = 0; i < _files.length; i++) {
          _result.push(_files[i])
        }
        if (this.imagePreview) {
          this.setImagePreview(_result[0])
        }
        this.fireEvent(_result)
      },
      onPaste (_e) {
        this.fireEvent(this.itemsToFiles(_e.clipboardData.items))
      },
      itemsToFiles (_items) {
        let _result = []
        for (let i = 0; i < _items.length; i++) {
          _result.push(_items[i].getAsFile())

          if (!this.multiple) {
            break
          }
        }
        if (this.imagePreview) {
          this.setImagePreview(_result[0])
        }
        return _result
      },
      setImagePreview (_file) {
        let _reader = new FileReader()

        _reader.onload = (_e) => {
          this.previewStyle = {
            'backgroundImage': 'url(\'' + _e.target.result + '\')'
          }
        }

        _reader.readAsDataURL(_file)
      }
    },
    mounted () {
      this.$nextTick(function () {
        if (this.fullWindow) {
          window.addEventListener('paste', this.onPaste)
          window.addEventListener('paste', this.onPaste)
          window.addEventListener('drop', this.onDrop)
          window.addEventListener('dragover', this.onDragOver)
        }
      })
    }
  }
</script>

<style scoped>
    div.vue-file-input input {
        display: none;
    }

  div.vue-file-input.default-style {
    height:          200px;
    border:          2px dashed black;
    background:      white;

    display:         flex;
    align-items:     center;
    justify-content: center;

    cursor:          pointer;
    position:        relative;

    transition:      border 1s;
  }

  div.vue-file-input.default-style.drag-over {
    border: 2px solid grey;
  }

  div.vue-file-input.default-style div.image-preview {
    width:               100%;
    height:              100%;
    position:            absolute;
    top:                 0;
    left:                0;

    background-size:     cover;
    background-position: center;
    opacity:             0.5;
    z-index:             1;
  }

  div.vue-file-input.default-style * {
    z-index: 2;
  }
</style>
