<template>
  <div class="editor-container">
    <AceEditor :value="code" />
  </div>
</template>

<script>
import AceEditor from '@/components/Editor/AceEditor.vue';


export default {
  components: {
    AceEditor,
  },
  data() {
    return {
      code: '<html>\n\t<head>\n\t\t<title>Vue.js Ace Editor</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello, Ace Editor in Vue.js!</h1>\n\t</body>\n</html>',
    };
  },
};
</script>

<style>
.editor-container {
  margin-top: 100px; 
}
</style>