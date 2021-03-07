<template>
  <div>
    <div class="bg-white rounded overflow-hidden shadow-lg">
      <div class="text-center p-6 border-b">
        <img
          class="h-24 w-24 rounded-full mx-auto"
          src="https://randomuser.me/api/portraits/men/24.jpg"
          alt="Randy Robertson"
        />
        <p class="pt-2 text-lg font-semibold">
          {{ user.full_name || 'Phuong Phung' }}
        </p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
      </div>

      <div class="mt-2">
        <span
          @click="logout"
          class="cursor-pointer block px-4 py-2 pb-4 hover:bg-gray-100 flex"
        >
          <p class="text-sm font-medium text-gray-800 leading-none">Logout</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    logout() {
      this.$store.dispatch('ui/setLoading', true)
      this.$store.dispatch('user/logout')
      return this.$router.go({ name: 'login' })
    },
  },
}
</script>
