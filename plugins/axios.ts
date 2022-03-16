import { Plugin } from '@nuxt/types'
import { initializeAxios } from 'utils/api'

const accessor: Plugin = ({ $axios }: any) => {
  initializeAxios($axios) // register api

  // axios error handler
  $axios.onError((error: any) => {
    if (error.response === undefined) {
      console.log('Network Error: Please refresh and try again.');
      throw error
    }
    throw error
  })
}

export default accessor