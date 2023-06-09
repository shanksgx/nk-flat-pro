module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'], // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    // 0：禁用规则，不会对提交类型进行验证。
    // 1：警告级别，对提交类型进行验证，但不会阻止提交。
    // 2：错误级别，对提交类型进行验证，如果不符合规则将阻止提交。
    // 'always'：规则始终适用于提交消息中的提交类型。无论提交消息的内容如何，都会应用该规则进行验证。
    // 'never'：规则永远不适用于提交消息中的提交类型。无论提交消息的内容如何，都不会应用该规则进行验证。
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ], // subject 大小写不做校验
    'subject-case': [0]
  }
}
