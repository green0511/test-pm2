# 简单测试 pm2 的负载均衡

## 原理： 

1. 使用 `pm2` 开启并守护多个 node 进程，运行 express 应用。进程数量取决于 cpu 的核心数
2. 在 `test/test.js` 中，循环 8000 次，对 express 应用的 `/getPid` 接口发送请求，该接口返回格式为： `{ pid: 1234 }`。由于有负载均衡，不同进程会返回不同的 pid
3. 所有请求结束后，统计各个 pid 各处理了多少个请求

## 运行步骤：

1. `git clone https://github.com/green0511/test-pm2.git`
2. `cd test-pm2`
3. `npm install`
4. `npm run server`
5. `npm run test`
6. 查看 pm2 状态： `npm run status`
7. 结束所有进程： `npm run stop`

## 运行结果：
