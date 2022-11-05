import Overview from './components/Overview.vue';
export default [
    // Insert additional routes here
    { name: 'info', path: '/info', component: { name: 'InfoView', render: h => h('div', 'Info view') }, props: true },
    { name: 'default', path: '*', component: Overview, props: true }
]
