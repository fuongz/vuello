<template>
  <div>
    <modal
      name="board-modal"
      transition="pop-out"
      :width="500"
      height="auto"
      @before-open="beforeOpen"
    >
      <form @submit.prevent="submit">
        <div class="w-full p-4">
          <div class="w-full">
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
            border rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white"
              v-model="name.value"
              placeholder="Enter group name"
            />
          </div>
        </div>
      </form>
    </modal>

    <modal
      name="modal-create-task"
      transition="pop-out"
      :width="500"
      height="auto"
      @before-open="beforeCreateTaskOpen"
    >
      <form @submit.prevent="submitCreateTask">
        <div class="w-full p-4">
          <div class="w-full">
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
            border rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white"
              v-model="createTaskFields.name.value"
              placeholder="Enter task name"
            />
          </div>
        </div>
      </form>
    </modal>

    <modal
      name="modal-create-task-group"
      transition="pop-out"
      :width="500"
      height="auto"
      @before-open="beforeCreateTaskGroupOpen"
    >
      <form @submit.prevent="submitCreateTaskGroup">
        <div class="w-full p-4">
          <div class="w-full">
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700
            border rounded py-3 px-4 leading-tight focus:outline-none
            focus:bg-white"
              name="name"
              type="text"
              autofocus
              v-model="createTaskGroupFields.name.value"
              placeholder="Enter task group name"
            />
          </div>
        </div>
      </form>
    </modal>
  </div>
</template>
<script>
import { updateName, create as CreateTaskGroup } from '../api/taskGroup';
import { create } from '../api/task';

export default {
  name: 'BoardModal',
  data() {
    return {
      createTaskFields: {
        name: {
          value: '',
        },
        description: {
          value: 'Hello world',
        },
        taskGroupId: {
          value: 0,
        },
      },
      createTaskGroupFields: {
        name: {
          value: '',
        },
        description: {
          value: 'Hello world',
        },
      },
      name: {
        value: '',
      },
      boardId: 0,
      data: {},
    };
  },
  methods: {
    beforeOpen(event) {
      this.data = event.params;
      this.name.value = event.params.name;
    },
    beforeCreateTaskOpen(event) {
      this.createTaskFields.taskGroupId.value = event.params.taskGroupId;
      this.boardId = event.params.boardId;
    },
    beforeCreateTaskGroupOpen(event) {
      this.boardId = event.params.boardId;
    },
    async submit() {
      await updateName(this.data.id, {
        name: this.name.value,
        board_id: this.data.board_id,
        description: this.data.description,
      });
      this.$store.dispatch('board/refreshBoard', this.data.board_id);
      this.$modal.hide('board-modal');
    },
    async submitCreateTask() {
      await create({
        name: this.createTaskFields.name.value,
        description: this.createTaskFields.description.value,
        taskGroupId: this.createTaskFields.taskGroupId.value,
      });
      this.$store.dispatch('board/refreshBoard', this.boardId);
      this.createTaskFields = {
        name: {
          value: '',
        },
        description: {
          value: 'Hello world',
        },
        taskGroupId: {
          value: 0,
        },
      };
      this.$modal.hide('modal-create-task');
    },
    async submitCreateTaskGroup() {
      await CreateTaskGroup({
        name: this.createTaskGroupFields.name.value,
        description: this.createTaskGroupFields.description.value,
        boardId: this.boardId,
      });
      this.createTaskGroupFields = {
        name: {
          value: '',
        },
        description: {
          value: 'Hello world',
        },
      };
      this.$store.dispatch('board/refreshBoard', this.boardId);
      this.$modal.hide('modal-create-task-group');
    },
  },
};
</script>
