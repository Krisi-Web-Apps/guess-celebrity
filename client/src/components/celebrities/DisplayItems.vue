<template>
  <custom-dialog @close="functions.handleClose">
    <div class="p-5 mt-5" v-if="!celebrity.loading">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl text-center">
          Знаменитости ({{ celebrity.items.length }})
        </h2>
        <base-button
          label="Добави Нова"
          @click="() => functions.handleOpenCelebrityForm({ new: true })"
        />
      </div>
      <ul class="mt-5 max-h-[60vh] overflow-y-scroll">
        <li
          v-for="(item, index) in celebrity.items"
          :key="index"
          :title="`Актуализиране на (${item.famous_name})`"
          class="relative w-full py-2 px-2 border rounded mb-1 hover:bg-gray-200"
        >
          <ellipsis-vertical-icon
            class="absolute top1 right-1 cursor-pointer hover:text-gray-500"
            title="Опции"
            @click="
              () => {
                isOpenOptionsId =
                  typeof isOpenOptionsId !== 'number' ? item.id : null;
              }
            "
          />
          <options-dialog
            :options="options"
            v-if="isOpenOptionsId === item.id"
          />
          <div class="flex items-center">
            <div class="w-12 rounded shadow overflow-hidden">
              <img
                :src="item.image_url"
                :alt="item.name"
                class="w-full h-full"
              />
            </div>
            <span class="ml-3">{{ item.famous_name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div>Зареждане...</div>
    </div>
  </custom-dialog>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

//stores
import { useCelebrityStore } from "../../stores/celebrity";
import { useEnvStore } from "../../stores/env";

// dialogs
import { CustomDialog, OptionsDialog } from "../dialogs";

// icons
import { XMarkIcon, EllipsisVerticalIcon } from "../../icons";

// buttons
import { BaseButton } from "../buttons";

export default {
  name: "DisplayItems",
  components: {
    // dialogs
    CustomDialog,
    OptionsDialog,

    // icons
    XMarkIcon,
    EllipsisVerticalIcon,

    // buttons
    BaseButton,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    const toast = useToast();

    celebrity.getItems();

    const data = {
      isOpenOptionsId: ref(),
      options: [
        {
          label: "Редактиране",
          classNames: "bg-white text-black hover:bg-gray-200",
          cb: () => {
            functions.handleOpenCelebrityForm({
              new: false,
              id: data.isOpenOptionsId.value,
            });
          },
        },
        {
          label: "Изтриване",
          classNames: "text-red hover:text-white hover:bg-red-500",
          cb: () => {
            if (confirm("Сигурен ли сте, че искате да изтриете този запис от базата данни?")) {
              celebrity.item.id = data.isOpenOptionsId.value;

              const cb = (status, message) => {
                data.isOpenOptionsId.value = null;
                if (status === "success") toast.success(message);
                if (status === "error") toast.error(message);
              }

              celebrity.deleteItem(cb);
            }
          },
        },
      ],
    };

    const functions = {
      handleClose: () => {
        env.dialogs.celebrityList = false;
        env.navbars.rightSideNavbar = true;
      },
      handleOpenCelebrityForm: (params) => {
        env.dialogs.celebrityForm = true;
        env.dialogs.celebrityList = false;
        if (params.new) {
          celebrity.item = {};
        } else {
          celebrity.item.id = params.id;
          celebrity.getItem();
        }
      },
    };

    return { env, celebrity, ...data, functions };
  },
};
</script>

<style lang="scss" scoped></style>
