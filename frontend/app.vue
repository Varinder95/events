<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  head() {
    return {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js",
        }
      ]
    }
  }
}
</script>
