# fede2
  
使用方法与[fede](https://github.com/keenwon/fede)相同，仅将AMD改为CommonJS，并且使用webpack打包

###demo

```shell
demo
├── lazyLoad.hbs     #按需加载
├── library.hbs      #打包功能模块，可以和lazy load和code splitting结合使用
├── normal.hbs       #常规用法，所有文件打包在一起
├── shimming.hbs     #简单的shim，shim情况复杂，需要结合实际情况
├── splitting1.hbs   #单独打包公用js
└── splitting2.hbs   #单独打包公用js
```
