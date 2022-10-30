Vue.component('site-counters', {
    props: [ 'count' ],
    template: `<div class="counter"><div class="counter_block" v-for="(c, index) in count" :key="index"><p class="counter__num">{{ c.num }}+</p><p class="counter__text"><span>{{ c.text }}</span> {{ c.span }}</p></div></div>`,
});

Vue.component('skill-progress-bars', {
    props: ['max', 'text'],
    template: `<div class="progress-bar"><p class="progress-bar-name">{{ text }} <span>{{ val }}%</span></p><div class="progress-bar-status"><div class="progress-platform"></div><div class="progress-value" :style="'width:' + val + '%'"></div></div></div>`,
    data: () => ({
        val: 0,
    }),
    methods: {
      onScroll() {
        if (this.$el.offsetTop + this.$el.offsetHeight < window.scrollY + window.innerHeight) {
          this.removeScrollHandler();
          const interval = setInterval(() => {
            if (++this.val === this.max) {
              clearInterval(interval);
            }
          }, 3000 / this.max);
        }
      },
      removeScrollHandler() {
        window.removeEventListener('scroll', this.onScroll);
      },
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    },
    beforeDestroy() {
      this.removeScrollHandler();
    },
});

Vue.component('site-skill-list', {
    props: [ 'skills' ],
    template: `<div id="skillsLanguage" v-for="(item, index) in skills" :key="index" v-dragscroll.x="true"><div class="skill-container" v-for="(i, index) in item.all" :key="index"><p class="lang_name">{{ i.langName }}</p><div class="skill-block"><img :src="'/static/skills/' + i.image" loading='lazy' :alt="i.langName"></div></div></div>`,
});

Vue.component('projects-list', {
  props: [ 'caselist' ],
  template: `<div class="grid-projects"><template v-for="cd in caselist.slice(0, 1)" :key="cd.id"><div class="project"><p class="upper bold to">{{ cd.to }}</p><div style="position: relative; width: 100%;"><div class="project-image" role="button"><template v-if="cd.img"><img :src="cd.img" loading='lazy' :alt="cd.caption"></template><template v-else><img src="/static/coming_soon.png" loading='lazy' alt="coming soon"></template></div></div>  <div class="project-about"><h3>{{ cd.projectName }}</h3><template v-for="(p, index) in cd.task" :key="index"><template v-if="p.taskName"><p class="project-caption">{{ p.taskName }}</p></template><template v-else><p class="project-caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo illum repellendus harum magnam neque ipsam, rem saepe amet, quo eaque provident distinctio fugiat aliquid laboriosam quis modi.</p></template></template></div>  </div></template></div>`,
});

Vue.component('site-cert-preview', {
  props: [ 'cert' ],
  template: `<div class="cert-grid"><template v-for="(c, index) in cert" :key="index"><div class="c-block"><template v-for="f in c.figures.slice(0, 1)" :key="c.id"><picture><source media="(min-width: 62em)" :srcset="f.large"><source media="(min-width: 48em)" :srcset="f.medium"><source media="(min-width: 36em)" :srcset="f.small"><img :src="f.medium" :alt="f.caption"></picture></template><p class="text-center"><strong>{{ c.title }}</strong></p></div></template></div>`,
});

Vue.component('site-timeline', {
  props: [ 'timeline' ],
  template: `<div class="timeline-wrapper"><div class="timeline-content" v-for="(item, index) in timeline.slice(0, 3)" :key="index"><div class="timeline-meta"><div class="timeline-head"><small><time :datetime="item.date" :title="item.date" class="timeline-data">{{ item.date }}</time></small><strong class="timeline-title">{{ item.title }}</strong></div><div class="timeline-tag" :class="item.tag">{{ item.tag }}</div></div><p class="timeline-desc">{{ item.desc }}</p><p v-if="item.linkUrl" class="timeline-more"><a :href="item.linkUrl" :title="item.linkText" target="_blank" rel="noopener noreferrer">{{ item.linkText }}</a></p><div class="timeline-bg-white"></div><div class="timeline-dots"></div></div></div>`,
});