<template>
  <div class="wrapper">

    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">github finder</div>
          </div>
        </div>
      </div>
    </header>

    <router-view></router-view>

    <footer>

    </footer>

  </div>
</template>



<script>

export default {

  components: {

  },

  data() {
    return {

    }
  },

  computed: {
   
  },

  methods: {
    
  }

}
</script>

<style lang="scss">
  
  .navbar-link{
    &.router-link-exact-active{
      color: #5247e7
    }
  }
</style>
