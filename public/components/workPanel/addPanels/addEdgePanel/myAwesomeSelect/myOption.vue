<!--extends md-option component with extras slot, which wont be included in parent component when selected -->

<template>
  <md-menu-item
    class="my-option"
    :class="classes"
    @click="selectOption"
    tabindex="-1">
    <md-checkbox class="md-primary" v-model="check" v-if="parentSelect.multiple">
      <span ref="item" class="content">
        <slot></slot>
      </span>
      <span>
        <slot name="extras" class="content"></slot>
      </span>
    </md-checkbox>

    <div v-else>
      <span ref="item" class="content">
        <slot></slot>
      </span>
      <span class="content">
        <slot name="extras"></slot>
      </span>
    </div>

  </md-menu-item>
</template>

<script>
//  import getClosestVueParent from '../../../../../../node_modules/vue-material/src/core/utils/getClosestVueParent';

  let getClosestVueParent = ($parent, cssClass) => {
      if (!$parent || !$parent.$el) {
          return false;
      }

      if ($parent._uid === 0) {
          return false;
      }

      if ($parent.$el.classList.contains(cssClass)) {
          return $parent;
      }

      return getClosestVueParent($parent.$parent, cssClass);
  };

  export default {
    props: {
      value: [String, Boolean, Number]
    },
    data: () => ({
      parentSelect: {},
      check: false,
      index: 0
    }),
    computed: {
      isSelected() {
        if (this.value && this.parentSelect.value) {
          let thisValue = this.value.toString();

          if (this.parentSelect.multiple) {
            return this.parentSelect.value.indexOf(thisValue) >= 0;
          }

          return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
        }

        return false;
      },
      classes() {
        return {
          'md-selected': this.isSelected,
          'md-checked': this.check
        };
      }
    },
    methods: {
      isMultiple() {
        return this.parentSelect.multiple;
      },
      setParentOption() {
        if (!this.isMultiple()) {
          this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
        } else {
          this.check = !this.check;
        }
      },
      selectOption($event) {
        this.setParentOption();
        this.$emit('selected', $event);
      }
    },
    watch: {
      isSelected(selected) {
        if (this.isMultiple()) {
          this.check = selected;
        }
      },
      check(check) {
        if (check) {
          this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
        } else {
          this.parentSelect.selectMultiple(this.index);
        }
      }
    },
    mounted() {
      this.parentSelect = getClosestVueParent(this.$parent, 'md-select');
      this.parentContent = getClosestVueParent(this.$parent, 'md-menu-content');

      if (!this.parentSelect) {
        throw new Error('You must wrap the my-option in a md-select');
      }

      this.parentSelect.optionsAmount++;
      this.index = this.parentSelect.optionsAmount;

      this.parentSelect.multipleOptions[this.index] = {};
      this.parentSelect.options[this.index] = this;

      if (this.isMultiple() && this.parentSelect.value.indexOf(this.value) >= 0 || this.parentSelect.value === this.value) {
        this.setParentOption();
      }
    },
    beforeDestroy() {
      if (this.parentSelect) {
        delete this.parentSelect.options[this.index];
        delete this.parentSelect.multipleOptions[this.index];
      }
    }
  };
</script>
<style>
  .content{
    margin: 0px; /* remove all margins to fit two divs in the container */
    display: inline-block; /* display block elements in one line */
  }
</style>
