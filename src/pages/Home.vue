<template lang="pug">
  .wrapper-content.wrapper-content--fixed
    section
      .container
        search(
          :value="search" 
          placeholder="type github's name..."
          @search="search = $event"
        )
        button.btn.btnPrimary(@click="getRepo") search


</template>


<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {

  components: {search},

  data () {
    return {
      search: '',
    }
  },
  methods: {
    getRepo(){
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }

}
</script>


<style lang="scss">

  
</style>