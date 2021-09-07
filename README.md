# mw2-antd

基于 antd 的 midwayjs V2 静态项目 函数计算发布案例

## 官方文档

https://www.yuque.com/midwayjs/midway_v2/migrate_static

主要就是 配置 f.yml 再加上 `@midwayjs/cli` 依赖，再配置指令 `"deploy": "npm run build && midway-bin deploy --skipBuild"` 就可以了，但是实际跑起来根本不是这样。

```yml
service: my-static-demo  			## 应用发布到云平台的名字

provider:
  name: aliyun       					## 发布的云平台，aliyun，tencent 等

deployType: static

package:
  include:
  	- build										## 需要拷贝的目录
  exclude:
    - package-lock.json				## 忽略 package-lock.json 文件

custom:
  customDomain:
    domainName: auto					## 自动生成域名
```

## 背景

项目是使用了 `antd` `TS` `umi` 技术栈，但是`midway-bin deploy` 在 ts 项目中根本不可以。

主要遇见编译问题

- error TS5055 Cannot write file '{0}' because it would overwrite input file. 无法写入文件“{0}”，因为它会覆盖输入文件。
- error TS6059 File '{0}' is not under 'rootDir' '{1}'. 'rootDir' is expected to contain all source files. 文件“{0}”不在 "rootDir"“{1}”下。"rootDir" 应包含所有源文件。
- error TS2724
- 构建包过大，需要通过 fun 发布，添加 fun 配置项

完全没有读取项目的 `tsconfig.json` 配置，还有的说模块未输出，没有修改的思路，有的竟然还读取了 `node_modules` 中的包 exports 问题，弄了一下午，发现需要改的包越来越多这样也不利于之后升级。

![image](https://user-images.githubusercontent.com/18508817/132235903-5368264b-5887-4a46-ba2a-f24c00b6e807.png)

## 解决思路

### ts 编译问题

> 修改 config/config.ts

修改 outputPath 配置

```typescript
// https://umijs.org/config/

export default defineConfig({
  ...
  outputPath: 'build/build',
  ...
})

```

> 修改 tsconfig.json

修改 outputPath 配置

```json
{
  "compilerOptions": {
    "outDir": "build/dist",
    ...
  },
  ...
}


```

> 修改 package.json

修改 deploy 指令逻辑，将构建之后的产物全部放在 build 文件夹中，build 文件夹中主要包含两个文件夹 `build` 和 `dist` 还有 f.yml 文件，将编译之后文件直接 发布到函数中，最大化减少发布的包大小。

```json
{
  ...
  "scripts": {
    "build": "umi build",
    "deploy": "npm run build && cp -R f.yml ./build/f.yml && cd ./build && ../node_modules/.bin/midway-bin deploy --skipBuild",
  },
  ...
}



```

### 发布之后 mock server 未被正常映射

> 这个暂时没有考虑解决，直接去除了项目中调用 mock 的逻辑，因为这边都是有对应后台服务的，不需要 mock

---

## 配置 web 服务域名

### 配置服务自定义域名

https://fc.console.aliyun.com/fc/cname/${region}

> 需要请设置自定义域名的 CNAME 配置， 自定义域名需要解析到服务所在的 Endpoint，

![image](https://user-images.githubusercontent.com/18508817/132238382-725530cf-6ec5-4474-82c9-dc7befc4fa15.png)

**注意设置匹配路径是 `/*` 函数名称就是 `app_index`**

如果购买了 SSL 证书，也可以配置一下

### 预览效果

![image](https://user-images.githubusercontent.com/18508817/132238659-dc545621-7a07-48f6-9a5f-d4e43207ec55.png)

![image](https://user-images.githubusercontent.com/18508817/132238734-72005a68-1de6-4324-800c-3ee26ab6256f.png)
