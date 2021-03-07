<template>
  <div class="Board">
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      :get-child-payload="getColumnPayload(board.id)"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable
        v-for="taskGroup in board.board.task_groups"
        :key="taskGroup.id"
      >
        <div class="TaskGroup">
          <div class="TaskGroup-Head">
            <h3
              class="TaskGroup-Head__Title"
              @click="$modal.show('board-modal', taskGroup)"
            >
              {{ taskGroup.name }}
            </h3>
          </div>
          <div class="text-sm mt-2">
            <Container
              group-name="col"
              @drop="onDrop($event, taskGroup.id)"
              :get-child-payload="getCardPayload(taskGroup.id)"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              :drop-placeholder="dropPlaceholderOptions"
            >
              <Draggable v-for="task in taskGroup.tasks" :key="task.id">
                <Task :task="task" />
              </Draggable>
            </Container>

            <p
              class="Card-Text Card-Text--with-icon"
              @click="
                $modal.show('modal-create-task', {
                  boardId: board.board.id,
                  taskGroupId: taskGroup.id,
                })
              "
            >
              <unicon name="plus" class="icon"></unicon> Add another card
            </p>
          </div>
        </div>
      </Draggable>

      <div class="TaskGroup-card TaskGroup-card--create">
        <div class="text-sm">
          <p
            class="py-1 px-2 text-white cursor-pointer"
            @click="
              $modal.show('modal-create-task-group', {
                boardId: board.board.id,
              })
            "
          >
            Add another card
          </p>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'

import { applyDrag } from '../../_services/dnd'

import { reOrder as CardReorder } from '../../api/task'
import { reOrder as GroupReorder } from '../../api/taskGroup'

import Task from './Task.vue'

export default {
  components: {
    Container,
    Draggable,
    Task,
  },
  props: {
    board: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  methods: {
    ...mapActions('ui', ['setLoading']),

    /**
     * On drop a card
     */
    async onDrop(event, taskGroupId) {
      this.setLoading(true)
      if (event === null) return
      if (event.removedIndex !== null || event.addedIndex !== null) {
        const board = { ...this.board.board }
        const column = board.task_groups.filter((p) => p.id === taskGroupId)[0]
        const columnIndex = board.task_groups.indexOf(column)
        const newColumn = { ...column }
        newColumn.tasks = applyDrag(newColumn.tasks, event)
        board.task_groups.splice(columnIndex, 1, newColumn)
        // this.board.board = board;
        if (event.addedIndex !== event.removedIndex) {
          const currentIndex = board.task_groups[columnIndex].tasks.findIndex(
            (group) => group.id === event.payload.id
          )

          const prevItem =
            board.task_groups[columnIndex].tasks[currentIndex - 1]
          const nextItem =
            board.task_groups[columnIndex].tasks[currentIndex + 1]

          await CardReorder(event.payload, prevItem, nextItem, taskGroupId)

          this.$store.dispatch('board/refreshBoard', board.id)
        }
      }
      this.setLoading(false)
    },

    /**
     * On move a column
     */
    async onColumnDrop(dropResult) {
      this.setLoading(true)

      const board = { ...this.board.board }
      board.task_groups = applyDrag(board.task_groups, dropResult)
      // this.board.board = board;

      if (dropResult.addedIndex !== dropResult.removedIndex) {
        const currentGroup = board.task_groups.findIndex(
          (group) => group.id === dropResult.payload.id
        )

        const prevItem = board.task_groups[currentGroup - 1]
        const nextItem = board.task_groups[currentGroup + 1]

        await GroupReorder(dropResult.payload, prevItem, nextItem)

        this.$store.dispatch('board/refreshBoard', board.id)
      }

      this.setLoading(false)
    },

    getColumnPayload() {
      return (index) => this.board.board.task_groups[index]
    },

    /**
     * Get Card payload
     */
    getCardPayload(columnId) {
      // eslint-disable-next-line arrow-body-style
      return (index) => {
        return this.board.board.task_groups.filter(
          (taskGroup) => taskGroup.id === columnId
        )[0].tasks[index]
      }
    },
  },
}
</script>

<style lang="postcss">
.Board {
  @apply flex pb-8 items-start;
}

.TaskGroup {
  @apply rounded bg-gray-200 w-64 p-2 mr-3;
}

.TaskGroup-Head {
  @apply flex justify-between py-1 px-2 cursor-pointer;

  .TaskGroup-Head__Title {
    @apply text-sm font-semibold text-gray-700;
  }
}
</style>
