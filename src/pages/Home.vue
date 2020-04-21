<template lang="pug">
  .wrapper-content.wrapper-content--fixed
    section
      .container
        search(:value="search" placeholder="type github's name...")

</template>


<script>
import search from '@/components/Search.vue'

export default {

  components: {search},

  data () {
    return {
      search: '',
    }
  },

}
</script>


<style lang="scss">

  
</style>