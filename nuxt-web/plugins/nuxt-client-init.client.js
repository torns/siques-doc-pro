// nuxt-client-init.client.js
export default async (context) => {
  await context.store.dispatch('nuxtClientInit', context)
}
