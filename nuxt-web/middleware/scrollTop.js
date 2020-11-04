export default async function({ store, redirect, route }) {
  // console.log(route)
  if (typeof window !== 'undefined' && route.fullPath === '/') {
    const top = await store.dispatch('getScrollTop', route.path)
    setTimeout(() => {
      window.scrollTo(top, top)
    }, 200)
  } else if (typeof window !== 'undefined' && route.fullPath !== '/' && !route.fullPath.includes('#')) {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 200)
  }
}
