<template>
  <el-container>
    <el-header>
      <el-row>
        <el-switch
          v-model="svalue"
          active-text="答题"
          inactive-text="录入" @change="chswitch">
        </el-switch>
      </el-row>
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="答案" v-show="avalue">
          <el-input v-model="form.answer"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="next">下一题</el-button>
          <el-button v-show="svalue" @click="check">查看答案</el-button>
          <el-button type="danger" v-show="!svalue" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      svalue: true,
      avalue: false,
      form: {
        name: '',
        answer: ''
      }
    }
  },
  methods: {
    chswitch () {
      if (!this.svalue) {
        this.form.name = ''
        this.form.answer = ''
        this.avalue = true
      } else {
        this.avalue = false
        this.update()
      }
    },
    check () {
      this.avalue = true
    },
    next () {
      this.update()
      this.avalue = false
    },
    submit () {
      this.$store.dispatch('Submit', this.form).then(resp => { this.$message.success(resp); this.chswitch() }).catch(err => { this.$message.error(err) })
    },
    update () {
      this.$store.dispatch('Getall').then(resp => { this.$message.success(resp); this.$set(this.form, 'name', this.$store.getters.name); this.$set(this.form, 'answer', this.$store.getters.answer) }).catch(err => { this.$message.error(err) })
    }
  },
  created () {
    this.update()
  }
}
</script>
<style>
</style>
