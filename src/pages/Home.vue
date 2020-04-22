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

        .users(v-if="userInfo")
          a.users__pic(:href="userInfo.html_url")
            img(:src="userInfo.avatar_url")
          .users__i
            .users__login {{userInfo.login}}
            .users__email {{userInfo.email}}
            a.users__login(:href="userInfo.html_url") {{userInfo.html_url}}
            .users__name {{userInfo.name}}
            .users__location {{userInfo.location}}
            .users__repos quantity of repos: {{repos.length}}

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
      search: 'github',
      userInfo: null,
      repos: null,
      error: null,
    }
  },
  methods: {
    getRepo(){

      let gitUser = new Promise((res, rej) =>{
        axios
          .get(`https://api.github.com/users/${this.search}`)
            .then(data => {res(data);});
      });

      let gitUserRepos = new Promise((res, rej) =>{
        axios
          .get(`https://api.github.com/users/${this.search}/repos`)
            .then(data => {res(data)});
      });

      Promise.all([gitUser, gitUserRepos]).then(value => {
        this.error = null;
        this.userInfo = value[0].data;
        this.repos = value[1].data;
      })
    } 
  }

}
</script>


<style lang="scss">
  .container{
    padding: 0 15px;
    max-width: 600px !important;
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
        margin-left: 20px;
        white-space: nowrap;
      }
    }
  }

  .users{
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &__pic{
      max-width: 150px;
      border: 2px solid #494ce8;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 30px;
    }
  }
  
</style>




