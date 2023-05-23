// ==UserScript==
// @name         Luogu Feed: Anti-SqrtSecond
// @namespace    https://imken.moe/
// @version      0.1.2
// @description  @SqrtSecond
// @author       Imken Luo
// @match        https://www.luogu.com.cn/
// @match        https://www.luogu.com.cn/?*
// @icon         https://www.luogu.com.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
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
                    var eles = document.querySelectorAll('.feed-comment');
                    console.log(eles);
                    for (var i in eles) {
                        if (eles[i].innerHTML) {
                            eles[i].innerHTML = eles[i].innerHTML.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>(\s*|&nbsp;)<\/a>/g, function(match, href) {
                                // 替换为内容为 href 的 <span> 标签
                                return '<span style="background-color: black; color: white;">' + href + '</span>';
                            });
                        }
                    }
                    // 获取所有图片元素
                    var imgElements = document.querySelectorAll('img');

                    // 遍历每个图片元素
                    for (i in imgElements) {
                        if (imgElements[i].getAttribute && !imgElements[i].getAttribute('vist')) {
                            var altText = imgElements[i].getAttribute('alt');
                            var src = imgElements[i].getAttribute('src');
                            var newAltText = 'AntiSqrt: ' + altText + ' | ' + src;
                            imgElements[i].setAttribute('alt', newAltText);
                            imgElements[i].setAttribute('vist', '1');
                        }
                    }

                }
            }
        };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback);

        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
    }
})();
