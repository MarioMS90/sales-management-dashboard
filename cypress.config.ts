import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    env: {
      AUTHJS_CSRF_TOKEN:
        'db7356f0252ebf7fa1d072261c5cba89e3d7aaa0d99ed7600d4522491d0db48b%7C8adde6d4ef56cf2614d66985e557142a4add144b9d90ec88bb59c3e361cca3e8',
      AUTHJS_SESSION_TOKEN:
        'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoieGFRTXpSUldkLXJCNG5NWWdkM19NQktmNlRoc242eXJYeTNFdzJzaDNCZEZ6Vk94N1EteVlCWFdKbThFdEsxR2RFYXBEREdENkdvdi1TRE1zSXM4LUEifQ..rPClb68WU_4TZEtxSa8zYQ.jmvjaOxpd_Aft87j8q-NCbnNb-mt0AxK8Op8NzN-OSCBcEbdDVMM1yhMMY5h-jQkxLR4DzIcPjKi6dcLnENtbjTPjztZRMTmzctX709VOSAOjFWlnOQFHM4UX04KXRsZTZtWz5OzPL-Y5eKwT1f7oRvljJk4_B4Av-0ujpQHfyk4lN4AFs8SJYuOsh8BrsOo2iqgNv9jNXASPN5g4XBlbVqImnTS0eXsFKdpI4dfHtk.K0L5F8TlPmoK4TFfVKwwOhSxYN2j9avrS4-RXb75tC0',
    },
  },
});
