<template>
  <div class="fixed w-full top-0 z-10">
    <div class="bg-blue-900">
      <div class="container mx-auto px-4">
        <div class="flex items-center md:justify-between py-4">
          <div class="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
            <router-link to="/">Starter</router-link>
          </div>

          <on-click-outside :do="handleClickOutside">
            <div class="w-1/4 md:w-auto text-right">
              <div class="md:flex cursor-pointer" @click="open = !open">
                <div>
                  <img
                    class="inline-block h-8 w-8 rounded-full"
                    src="https://randomuser.me/api/portraits/men/24.jpg"
                    alt
                  />
                </div>
                <div class="sm:hidden md:block md:flex md:items-center ml-2">
                  <span class="text-white text-sm mr-1">{{ user.user.email }}</span>
                  <div>
                    <unicon name="angle-down" fill="#fff" class="align-middle ml-2" />
                  </div>
                </div>
              </div>
              <div v-show="open" class="Dropdown-menu">
                <UserDropdown :user="user.user" />
              </div>
            </div>
          </on-click-outside>
        </div>
      </div>
    </div>
    <div class="text-blue-900 sm:hidden md:block md:bg-white md:border-b">
      <div class="container mx-auto px-4">
        <div class="md:flex">
          <div class="flex -mb-px mr-8">
            <router-link
              to="/"
              class="no-underline text-blue-900 font-semibold flex items-center py-4"
            >
              <unicon name="layer-group" class="fill-current mr-2" />Board
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OnClickOutside from '../Plugins/OnClickOutSide.vue';
import UserDropdown from './UserDropdown.vue';

export default {
  data() {
    return {
      open: false,
    };
  },
  components: {
    OnClickOutside,
    UserDropdown,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    handleClickOutside() {
      if (this.open) {
        this.open = false;
      }
    },
  },
};
</script>
