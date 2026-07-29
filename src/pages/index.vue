<template>
  <main text="center" min-h-100vh min-w-100vw bg-gray:10 font="sans bold">
    <div pt-10>
      <div ma w-fit flex items-center>
        <ValueTable />
        <div ml-10>
          <div v-for="kind in equalityOrder" :key="kind" w-fit flex="~ justify-center gap-2">
            <span :class="[equalityMeta[kind].icon, equalityMeta[kind].class]" inline-block h-6 w-6 />
            <span>{{ equalityMeta[kind].label }}</span>
          </div>
        </div>
      </div>
      <TheFooter />
    </div>
  </main>
</template>
