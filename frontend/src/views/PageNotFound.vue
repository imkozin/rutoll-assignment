<template>
    <div class="page-not-found">
        <h1 class="title">Page Not Found 404</h1>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound"
    }
</script>

<style scoped>
.page-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
}
.title {
    font-size: 3em;
    text-transform: uppercase;
}
</style>