import { mount } from '@vue/test-utils'
import Title from '@/components/icons/Title.vue'

describe('Title', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Title, {
      stubs: {
        NuxtLink: true,
        // Any other component that you want stubbed
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
