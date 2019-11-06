const cont = '/js/json/contacts.json';
Vue.component('site-contact-info', {
    template: `<div class="contacts"><div class="card" v-for="(item, index) in contacts" :key="index"><h5>{{ item.name }}</h5><p><slot v-if="item.icon"><img :src="item.icon" loading='lazy' :alt="item.name"></slot>{{ item.content }}</p><p v-if="item.add"><slot>{{ item.add }}</slot></p></div><slot><div class="svg-card"><svg style="cursor: pointer" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus" @click="addItem()"><g clip-path="url(#d)" stroke="url(#gradient)" stroke-width="5.67" stroke-miterlimit="10" stroke-linecap="round"><path d="M12.207 6.038l5.154 17.559M23.433 12.33L6.066 17.428"/><defs><linearGradient id="gradient" x1="50%" y1="0" x2="50%" y2="100%"><stop offset="0%" stop-color="var(--sub-color)"></stop><stop offset="100%" stop-color="#78D1E5"></stop></linearGradient><clipPath id="d"><path fill="#fff" transform="rotate(-16.357 23.317 3.351)" d="M0 0h23.8v23.9H0z"/></clipPath></defs></g></svg></div></slot></div>`,
    data() {
        return {
            contacts: []
        }
    },
    methods: {
        addItem() {
            this.contacts.push({name: '', content: ''})
        }
    },
    created() {
        axios.get(cont).then((response) => {
            this.contacts = response.data
        });
    },
});

const soc = '/js/json/soc.json';
Vue.component('site-social-links', {
    template: `<div class="social-link"><ul class="list"><li v-for="(item, index) in socList" :key="index"><a :href="item.link" :title="item.title" target="_blank" rel="noopener noreferrer" :data-title="item.title"><span v-html="item.icon"></span></a></li></ul></div>`,
    data() {
        return {
            socList: []
        }
    },
    created() {
        axios.get(soc).then((response) => {
            this.socList = response.data
        });
    },
});