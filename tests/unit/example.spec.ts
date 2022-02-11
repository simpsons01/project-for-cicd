import Foo from '@/views/Foo.vue';
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

describe('Foo.vue', () => {
  it('renders props.text when passed', () => {
    const msg = 'hello'
    const wrapper = shallowMount(Foo, {
      propsData: { text: msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
