let axios = require('axios')
let num = 8000
let now = new Date()
let requests = []
let result = {}
for(let i = 0; i < num; i++ ){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.post('http://localhost:3000/getPid')
            .then(res => {
                let pid = res.data.pid
                if (!result[pid]) {
                    result[pid] = 0
                }
                result[pid]++
                resolve(pid)
            })
            .catch(err => console.log(`第 ${i} 个请求出错： ${err.code}`))
        }, 1)
    })
    requests.push(promise)
}
Promise.all(requests)
.then(res => {
    let stop = new Date()
    let sec = (stop.getTime() - now.getTime())/1000
    console.log(`共发出了 ${num} 个请求, 共耗时 ${sec} 秒`)
    Object.keys(result).forEach(pid => {
        console.log(`pid ${pid} 处理了 ${result[pid]} 次请求`)
    })
})