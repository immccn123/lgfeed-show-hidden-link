// ==UserScript==
// @name         Luogu Feed: Anti-SqrtSecond
// @namespace    https://imken.moe/
// @version      0.1
// @description  @SqrtSecond
// @author       Imken Luo
// @match        https://www.luogu.com.cn/
// @match        https://www.luogu.com.cn/?*
// @icon         https://www.luogu.com.cn/favicon.ico
// @grant        none
// ==/UserScript==

function bfs(node)
{
    let queue = [node]
    while (queue.length) {
        let node = queue.shift();
        // console.log(node.tagName+"-"+node.className);
        if (node.getAttribute('vist')) continue;
        if ((node.tagName == 'A' && node.innerHTML == "")) {
            let new_node = document.createElement('span');
            new_node.setAttribute('style', 'background-color: black; color: white;');
            new_node.innerText = node.getAttribute('href');
            node.parentNode.append(new_node);
            node.setAttribute('vist', '1');
        } else if ((node.tagName == 'IMG' && !node.getAttribute('src').startsWith('http'))) {
            // TODO
            let new_node = document.createElement('span');
            new_node.setAttribute('style', 'background-color: black; color: white;');
            new_node.innerText = node.getAttribute('src');
            node.parentNode.append(new_node);
            node.setAttribute('vist', '1');
        }
        if (!node.children.length) {
            continue;
        }
        Array.from(node.children).forEach( item =>{
            queue.push(item)
        })
    }
}

(function() {
    'use strict';
    // 选择需要观察变动的节点
    const targetNode = document.getElementById('feed');
    if (targetNode) {
        console.log(targetNode)
        // 观察器的配置（需要观察什么变动）
        const config = { attributes: false, childList: true, subtree: false };

        // 当观察到变动时执行的回调函数
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('Benben upudated!');
                    bfs(document.getElementById('feed'));
                }
            }
        };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback);

        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
    }
})();