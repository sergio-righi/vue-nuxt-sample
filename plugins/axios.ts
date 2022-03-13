import { Plugin } from '@nuxt/types'
import { initializeAxios } from 'utils/api'

const accessor: Plugin = ({ $axios, app }: any) => {
  initializeAxios($axios) // register api

  // axios error handler
  $axios.onError((error: any) => {
    if (error.response === undefined) {

      app.notify({
        title: 'Network Error: Please refresh and try again.',
        type: 'error',
        duration: -1,
      })

      throw error
    }

    throw error
  })
}

export default accessor