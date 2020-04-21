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

        .repos
          .repos__info(v-for="repo in repos" :key="repo.id")
            .repo__item 
              a.link( target="_blank" :href="repo.html_url") {{ repo.name }}
              span ⭐ {{repo.stargazers_count}}




</template>


<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {

  components: {search},

  data () {
    return {
      search: '',
      repos: null,
    }
  },
  methods: {
    getRepo(){
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
          .then(res => {
            this.repos = res.data
          })
          .catch(err => {
            console.log(err)
          })
    }
  }

}
</script>


<style lang="scss">
  .container{
    padding: 0 15px;
  }
  
</style>