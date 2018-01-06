# Vue File Input
This is a small component for handling file input for Vue.

- Drag and drop support
- Paste from clipboard support
- Built-in image preview 

## Installation
`npm i vue-file-input --save-dev`

## Example
````
<vue-file-input :accept="image/*" :detectPaste="true" :fullWindow="true" :imagePreview="true" :multiple="false" @change="onFileInputChange">
    Drag your files here
</vue-file-input>
````

## Props
**accept**: string - just like html5 file input "accept" property  
**detectPaste**: boolean - if true, pasting images from clipboard will be handled by this component  
**fullWindow**: boolean - if true, files can be pasted and drag'n'dropped anywhere in window  
**imagePreview**: boolean - if true, selected image will be set as background for div.image-preview. See Styling below.  
**multiple**: boolean - if true, multiple files can be selected

## Events
**@change** - fired when file selection has been changed. e.detail contains an array of currently selected files.

## Styling
Modify `div.vue-file-input` to style this component.
Modify `div.vue-file-input.drag-over` to style its dragOver state.