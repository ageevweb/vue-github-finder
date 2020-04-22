<template lang="pug">
  .wrapper-content.wrapper-content--fixed
    section
      .container
        .error(v-if="error")
          h1 Can't find the user :(
        search(
          :value="search" 
          placeholder="type github's name..."
          @search="search = $event"
        )
        button.btn.btnPrimary(@click="getRepo") search

        .users
          

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
      error: null,
    }
  },
  methods: {
    getRepo(){
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
          .then(res => {
            this.repos = res.data;
            this.error = null;

          })
          .catch(err => {
            this.repos = null;
            this.error = true;
            console.log(err);
          })
    }
  }

}
</script>


<style lang="scss">
  .container{
    padding: 0 15px;
    max-width: 600px;
  }
  h1{
    margin-bottom: 30px;
    text-align: center;
  }
  .btn{
    margin: 0 auto;
    display: block !important;
  }
  .repo{
    &__item{
      display:flex;
      justify-content: space-between;
      margin-bottom: 5px;
      
      span{
        color: goldenrod;
      }
    }
  }
  
</style>