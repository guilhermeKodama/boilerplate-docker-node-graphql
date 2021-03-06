import { initResources, fetch, closeResources } from './utils'

describe('Server', () => {
  beforeAll(initResources)

  it('is running', async() => {
    const res = await fetch('/')
    expect(res.status).toEqual(200)
  })

  afterAll(closeResources)
})
