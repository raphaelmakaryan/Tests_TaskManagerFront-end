import { describe, it, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import {api} from "@/services/api.js";

vi.mock('@/services/api.js', () => ({
    api: {
        getHello: vi.fn()
    }
}))

describe('HelloWorld', () => {
    it('renders properly', async () => {
        const welcomeMessage = "Welcome to the Task Manager API!"
        api.getHello.mockResolvedValue({data: welcomeMessage})

        const wrapper = mount(HelloWorld)
        await flushPromises()
        expect(wrapper.text()).toContain(welcomeMessage)
    })
})
