<template>
  <custom-dialog @close="functions.handleClose" size="w-3/4 h-3/4">
    <div class="p-5 h-full">
      <div class="flex items-center gap-5 pb-5">
        <users-icon />
        <h2 class="text-2xl">Потребители ({{ user.items.length }})</h2>
      </div>
      <ul v-if="user.items.length !== 0" class="w-full h-[90%] flex flex-col gap-2 overflow-y-scroll">
        <li v-for="(item, index) in user.items" :key="index">
          <div class="py-2 px-5 border rounded">
            <div>{{ item.email }}</div>
            <div class="text-sm text-gray-500">{{ item.role_as }}</div>
          </div>
        </li>
      </ul>
      <div v-else>
        <div class="mt-5">
            <p class="p-5 bg-gray-100 rounded">Няма намерени резултати.</p>
        </div>
      </div>
    </div>
  </custom-dialog>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

// dialogs
import { CustomDialog } from "../dialogs";
import UsersIcon from "../../icons/UsersIcon.vue";

export default {
  name: "UsersView",
  components: {
    // dialogs
    CustomDialog,
    UsersIcon
},
  setup() {
    const env = useEnvStore();
    const user = useUserStore();
    const toast = useToast();

    const functions = {
      handleClose: () => {
        env.dialogs.usersView = false;
      },
      showNotification: (status, message) => {
        if (status === "error") toast.error(message);
      },
    };

    user.getItems(functions.showNotification);

    return { env, user, functions };
  },
};
</script>

<style lang="scss" scoped></style>
