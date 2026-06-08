<script>
import { defineComponent, h } from 'vue'

export const TaiwanDecorations = defineComponent({
  name: 'TaiwanDecorations',
  render() {
    return h('div', { class: 'absolute inset-0 overflow-hidden pointer-events-none' }, [
      h('div', { class: 'absolute top-10 right-10 text-8xl opacity-20 animate-float' }, '🏔️'),
      h('div', { class: 'absolute top-20 left-20 text-7xl opacity-20 animate-float', style: { animationDelay: '0.5s' } }, '🚂'),
      h('div', { class: 'absolute bottom-32 left-10 text-7xl opacity-20 animate-float', style: { animationDelay: '1s' } }, '🏮'),
      h('div', { class: 'absolute bottom-20 right-32 text-7xl opacity-20 animate-float', style: { animationDelay: '1.5s' } }, '🧋'),
      h('div', { class: 'absolute top-1/3 right-20 text-7xl opacity-20 animate-float', style: { animationDelay: '0.3s' } }, '🐻'),
      h('div', { class: 'absolute bottom-40 right-20 text-7xl opacity-20 animate-float', style: { animationDelay: '1.2s' } }, '🐹'),
    ])
  },
})

export const Card = defineComponent({
  name: 'Card',
  props: {
    className: { type: String, default: '' },
    onClick: Function,
  },
  setup(props, { slots }) {
    return () => h(
      'div',
      {
        class: ['rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer hover:scale-105', props.className],
        onClick: props.onClick,
      },
      slots.default?.(),
    )
  },
})

export const PrimaryButton = defineComponent({
  name: 'PrimaryButton',
  props: {
    className: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    onClick: Function,
  },
  setup(props, { slots }) {
    return () => h(
      'button',
      {
        class: ['px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed', props.className],
        style: {
          backgroundColor: props.disabled ? '#ccc' : 'var(--primary, #2D5016)',
        },
        disabled: props.disabled,
        onClick: props.onClick,
      },
      slots.default?.(),
    )
  },
})

export const SecondaryButton = defineComponent({
  name: 'SecondaryButton',
  props: {
    className: { type: String, default: '' },
    onClick: Function,
  },
  setup(props, { slots }) {
    return () => h(
      'button',
      {
        class: ['px-6 py-3 rounded-xl font-bold border-2 bg-white transition-all hover:scale-105 active:scale-95', props.className],
        style: { borderColor: 'var(--primary, #2D5016)', color: 'var(--primary, #2D5016)' },
        onClick: props.onClick,
      },
      slots.default?.(),
    )
  },
})

export const Badge = defineComponent({
  name: 'Badge',
  props: {
    icon: { type: String, required: true },
    text: { type: String, required: true },
    className: { type: String, default: '' },
  },
  setup(props) {
    return () => h(
      'div',
      {
        class: ['inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white text-center', props.className],
        style: { backgroundColor: 'var(--primary, #2D5016)' },
      },
      [h('span', { class: 'text-xl' }, props.icon), h('span', null, props.text)],
    )
  },
})
</script>
