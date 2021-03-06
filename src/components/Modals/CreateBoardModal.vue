<template>
  <modal
    :name="modal.name"
    transition="pop-out"
    :width="500"
    height="auto"
    @before-open="beforeOpen"
  >
    <div class="w-full">
      <div
        v-show="submitErr"
        class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p class="font-bold">Be Warned</p>
        <p>{{ submitErr.message }}</p>
      </div>
      <form class="form p-6" @submit.prevent="submit">
        <div class="form-input">
          <label for="name">Title</label>
          <input
            name="name"
            v-validate="'required|max:255'"
            type="text"
            v-model="name.value"
            autofocus
            placeholder="Board name"
          />
          <p v-show="errors.has('name')" class="form-error">{{ errors.first('name') }}</p>
        </div>

        <div class="form-input">
          <label for="name">Background URL</label>
          <input
            name="background"
            type="text"
            v-model="backgroundUrl.value"
            autofocus
            placeholder="https://imgur.com/oino2.png"
          />
        </div>

        <div class="form-input">
          <label for="password">Description</label>
          <textarea
            name="description"
            rows="10"
            type="text"
            v-model="description.value"
            placeholder="Write a description..."
          />
          <p class="form-error"></p>
        </div>

        <div class="flex items-center justify-between">
          <button class="form-submit" type="submit">Create</button>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import { create } from '../../api/board';

export default {
  data() {
    return {
      modal: {
        name: 'modal-create-board',
      },
      submitErr: '',
      name: {
        value: '',
      },
      description: {
        value: '',
      },
      backgroundUrl: {
        value: '',
      },
    };
  },
  methods: {
    ...mapActions('ui', ['setLoading']),
    beforeOpen() {},
    async submit() {
      this.setLoading(true);

      const validator = await this.$validator.validateAll();
      if (validator) {
        try {
          await create({
            name: this.name.value,
            description: this.description.value,
            backgroundUrl: this.backgroundUrl.value,
          });
          this.$store.dispatch('board/reload');
          this.$modal.hide(this.modal.name);
        } catch (err) {
          this.submitErr.message = err;
        }
      }

      this.setLoading(false);
    },
  },
};
</script>
