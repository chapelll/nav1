let $siteList = $(".siteList")
let $lastLi = $siteList.find(".last")
let x = localStorage.getItem("key")
let xObject = JSON.parse(x)
let hashMap = xObject || [
    { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
    { logo: "B", logoType: "text", url: "https://www.baidu.com" },
    { logo: "B", logoType: "text", url: "https://www.bilibili.com" },
]

let simplifyUrl = function (url) {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, "") // 删除 / 开头的内容
}


let render = () => {
    $siteList.find("li:not(.last)").remove()    //找到siteList中除了最后一个的其他所有li清空它们
    hashMap.forEach((node, index) => {
        let $li = $(` <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on("click", () => {
            window.open(node.url)
        })
        $li.on("click", ".close", (e) => {
            e.stopPropagation() //阻止点击X相当于点击了li
            //console.log(index); //输出这一项li在hashMap中的下标
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$(".addButton").on("click", () => {
    let url = window.prompt("请问你要添加什么网址？")
    //console.log(url.indexOf("http")); //查找"http"是否在url中，是就返回"http"所在的起始位置
    if (url.indexOf("http") !== 0) {
        url = "https://" + url
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    })

    render()
})

window.onbeforeunload = () => {
    // localStorage 内只能存字符串，使用 JSON.stringfy() 将hashMap变为字符串格式
    let string = JSON.stringify(hashMap)
    localStorage.setItem("key", string)
}

$(document).on("keypress", (e) => {
    let key = e.key
    console.log(hashMap);
    
    for (let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
