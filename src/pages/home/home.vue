<template>
  <div class="home">

    <baidu-map></baidu-map>
    <chart-bar></chart-bar>
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

