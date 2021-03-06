<template>
  <div class="login">
    <div class="flex items-center bg-gray-200 justify-center h-screen">
      <div class="w-full max-w-xs">
        <form class="form form--login" @submit.prevent="submit">
          <div class="form-input">
            <label for="email">Email</label>
            <input
              v-validate="'required|email'"
              name="email"
              id="email"
              type="email"
              v-model="email"
              autofocus
              placeholder="Email"
            />
            <p class="form-error">{{ errors.first('email') }}</p>
          </div>

          <div class="form-input">
            <label for="password">Password</label>
            <input
              v-validate="'required|min:6'"
              name="password"
              id="password"
              type="password"
              v-model="password"
              placeholder="Password"
            />
            <p class="form-error">{{ errors.first('password') }}</p>
          </div>

          <div class="flex items-center justify-between">
            <button class="form-submit" type="submit" :disabled="isLoading">Sign In</button>
          </div>

          <router-link
            to="register"
            class="mt-4 text-center block text-sm text-blue-500 align-baseline hover:text-blue-800"
            >Don't have an account? Signup</router-link
          >
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Lumen Starter Project. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from '../../api/user';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    $t(field) {
      return field;
    },
    async submit() {
      const { email, password } = this;
      if (email && password) {
        this.isLoading = true;
        const data = await signInWithEmailAndPassword(email, password);

        const { token, user } = data;
        this.$store.dispatch('user/login', { token, user });
        this.$router.push('/');
      }
    },
  },
};
</script>
