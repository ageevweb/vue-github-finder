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

        .repos(v-if="repos")
          .repos__filter
            .filt-title(@click="sort('name')") title &#8593;&#8595;
            .filt-title(@click="sort('stargazers_count')") stars &#8593;&#8595;

          .repos__info(v-for="repo in reposSort" :key="repo.id")
            .repos__item 
              a.link( target="_blank" :href="repo.html_url") {{ repo.name }}
              span ⭐ {{repo.stargazers_count}}
          .pagination
            button.pagination__btn.btn.btnPrimary(@click="prevPage") &larr;
            p page: {{this.page.current}} / {{Math.ceil(this.repos.length / this.page.length) }}
            button.pagination__btn.btn.btnPrimary(@click="nextPage") &rarr;

</template>


<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {

  components: {search},

  data () {
    return {
      search: '',
      userInfo: null,
      repos: null,
      error: null,
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 5
      }
    }
  },

  methods: {
    getRepo(){
      let gitUser = new Promise((res, rej) =>{
        axios
          .get(`https://api.github.com/users/${this.search}`)
            .then(data => {res(data)})
            .catch((err) => {
              this.error = true;
              this.userInfo = null;
              this.repos = null;
            })
      });
      let gitUserRepos = new Promise((res, rej) =>{
        axios
          .get(`https://api.github.com/users/${this.search}/repos`)
            .then(data => {res(data)})
            .catch((err) => {
              this.error = true;
              this.userInfo = null;
              this.repos = null;
            })

      });
      Promise.all([gitUser, gitUserRepos]).then(value => {
        this.error = null;
        this.userInfo = value[0].data;
        this.repos = value[1].data;
      })
      
    },

    sort(e){
      if(e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },

    prevPage() {
      if(this.page.current > 1) this.page.current -= 1;
    },
    nextPage() {
      if((this.page.current * this.page.length) < this.repos.length) this.page.current += 1;
    }
  },

  computed: {
    reposSort(){
      return this.repos.sort((a,b) => {
        let mod = 1;
        if(this.currentSortDir === 'desc') mod = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * mod;
      }).filter((row, index) => {
        let start = (this.page.current-1)*this.page.length
        let end = this.page.current * this.page.length
        if(index >= start && index < end) return true
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
  .repos{
    &__item{
      display:flex;
      justify-content: space-between;
      margin-bottom: 15px;
      
      span{
        color: goldenrod;
        margin-left: 20px;
        white-space: nowrap;
      }
    }

    &__filter{
      font-size: 25px;
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
      margin-bottom: 15px;
      
      .filt-title{
        cursor: pointer;
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

  .pagination{
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    button{
      margin: 5px;
    }
    p{
      margin: 0 10px;
    }
  }

  .error{
    font-size: 25px;
    margin-bottom: 30px;
  }
  
</style>




