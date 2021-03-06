<template>
  <div class="login">
    <div class="flex items-center bg-gray-200 justify-center h-screen">
      <div class="w-full max-w-sm">
        <form class="form form--register" @submit.prevent="submit">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 form-input">
              <label for="grid-first-name">First Name</label>
              <input
                id="grid-first-name"
                type="text"
                v-validate="'min:2'"
                v-model="user.firstName.value"
                placeholder="Jane"
                name="lastName"
              />
              <p class="form-error">{{ errors.first('lastName') }}</p>
            </div>
            <div class="w-full md:w-1/2 pl-3 form-input">
              <label for="grid-last-name">Last Name</label>
              <input
                id="grid-last-name"
                v-validate="'min:2'"
                v-model="user.lastName.value"
                type="text"
                name="firstName"
                placeholder="Doe"
              />
              <p class="form-error">{{ errors.first('firstName') }}</p>
            </div>
          </div>
          <div class="form-input">
            <label for="email">Email</label>
            <input
              v-validate="'required|email'"
              name="email"
              id="email"
              type="email"
              v-model="user.email.value"
              autofocus
              placeholder="Email"
            />
            <p class="form-error">{{ errors.first('email') }}</p>
            <p v-if="resErrors.email" class="form-error">
              {{ resErrors.email[0] }}
            </p>
          </div>

          <div class="form-input">
            <label for="password">Password</label>
            <input
              v-validate="'required|min:8'"
              name="password"
              id="password"
              type="password"
              v-model="user.password.value"
              placeholder="Password"
            />
            <p class="form-error">{{ errors.first('password') }}</p>
            <p v-if="resErrors.password" class="form-error">
              {{ resErrors.password[0] }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <button class="form-submit" type="submit">Sign In</button>
          </div>

          <router-link
            to="/login"
            class="mt-4 text-center block text-sm text-blue-500 align-baseline hover:text-blue-800"
            >Already have an account? Login</router-link
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
import { signUp } from '../../api/user';

export default {
  data() {
    return {
      resErrors: {
        email: [],
        password: [],
      },
      user: {
        firstName: {
          value: '',
        },
        lastName: {
          value: '',
        },
        email: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    };
  },
  methods: {
    $t(field) {
      return field;
    },
    async submit() {
      this.$store.dispatch('ui/setLoading', true);
      const validator = await this.$validator.validateAll();
      if (validator) {
        // eslint-disable-next-line object-curly-newline
        const { email, password, firstName, lastName } = this.user;

        const res = await signUp({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
        });

        if (res.status === 1) {
          this.resErrors = [];
          const { token, user } = res.data;
          this.$store.dispatch('user/login', { token, user });
          this.$router.push('/');
        } else if (res.status === 0) {
          this.resErrors = res.message;
        }
      }
      this.$store.dispatch('ui/setLoading', false);
    },
  },
};
</script>
