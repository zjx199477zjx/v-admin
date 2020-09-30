<template>
  <div class="home">

    <chart-bar></chart-bar>
    <baidu-map></baidu-map>
  </div>
</template>
<script>
  import baiduMap from '../baiduMap/baiduMap';
  import chartBar from '../charts/bar';

  export default {
    components: {
      'baidu-map': baiduMap,
      'chart-bar': chartBar
    }
  }
</script>
<style>
</style>

