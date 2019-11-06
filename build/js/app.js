const nav = '/js/json/nav.json';

Vue.component('site-navigation', {
    props: [ 'navlist' ],
    template: `<nav id="sitenav"><ul class="sitenav"><li v-for="(n, index) in navlist" :key="index"><template v-if="n.children"><a class="drop-list" :href="n.link" :title="n.title" @click="n.isOpen = !n.isOpen"><span v-html="n.icon"></span> {{ n.title }} <svg class="arrow" viewBox="0 0 451.847 451.847" width="10"><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/></svg></a><div class="dropdown" :class="{ isOpen : n.isOpen }" @mouseover="n.isOpen = true" @mouseleave="n.isOpen = false"><ul class="subnav"><li v-for="(i, index) in n.children" :key="index"><template v-if="i.blank"><span v-html="i.icon"></span><a :href="i.link" :title="i.title" target="_blank" rel="noopener noreferrer">{{ i.title }}</a></template><template v-else><a :href="i.link" :title="i.title"><span v-html="i.icon"></span> {{ i.title }}</a></template></li></ul></div></template><template v-else><a :href="n.link" :title="n.title"> <span v-html="n.icon"></span> {{ n.title }}</a></slot></li></ul></nav>`,
});

const 
    counterts = '/js/json/count.json',
    all_skills = '/js//json/skills.json',
    certs = '/js/json/certs.json',
    cases = '/js/json/cases.json',
    coding = '/js/json/coding.json',
    tline = '/js/json/timeline.json',
    pricing = '/js/json/pricing.json',
    siteisit = '/js/json/siteisit.json',
    bnr = '/js/json/bnr.json';

var wrapper = new Vue({
    el: '#wrapper',
    data() {
        return {
            isactive: false,
            overflow: false,
            show: false,
            scale: false,
            navlist: [],
            count: [],
            bars: [
                {
                    max: 75,
                    text: 'Designing Skills'
                },
                {
                    max: 68,
                    text: 'Programming Skills'
                },
                {
                    max: 45,
                    text: 'Marketing Skills'
                },
            ],
            skills: [],
            selected: null,
            cert: [],
            caselist: [],
            codelist: [],
            fullImage: false,
            timeline: [],
            pricelist: [],
            isitselect: false,
            isitopen: [],
            banners: []
        }
    },
    created() {
        axios.get(nav).then((response) => {this.navlist = response.data }),
        axios.get(counterts).then((response) => {this.count = response.data }),
        axios.get(all_skills).then((response) => {this.skills = response.data}),
        axios.get(certs).then((response) => {this.cert = response.data}),
        axios.get(cases).then((response) => {this.caselist = response.data}),
        axios.get(coding).then((response) => {this.codelist = response.data}),
        axios.get(tline).then((response) => {this.timeline = response.data}),
        axios.get(pricing).then((response) => {this.pricelist = response.data}),
        axios.get(siteisit).then((response) => {this.isitopen = response.data}),
        axios.get(bnr).then((response) => {this.banners = response.data});
    }
});

const d = document,
    cur = d.getElementById('cursor'),
    wrap = d.getElementById('wrapper');

wrap.addEventListener('mousemove', (e) => {
    (cur.style.left = e.clientX + "px"),
    (cur.style.top = e.clientY + "px");
});

d.getElementById('year').innerHTML = new Date().getFullYear();