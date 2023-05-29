// ==UserScript==
// @name            Luogu Feed: Anti-SqrtSecond
// @name:zh         洛谷犇犇反诈工具
// @namespace       https://imken.moe/
// @version         0.1.5.2
// @description     Luogu Feed hidden link display tool, rickroll display tool.
// @description:zh  洛谷犇犇隐藏链接显示工具、诈骗显示工具。
// @author          Imken Luo
// @match           https://www.luogu.com.cn/
// @match           https://www.luogu.com.cn/?*
// @icon            https://www.luogu.com.cn/favicon.ico
// @license         GPL-3.0-or-later
// @supportURL      https://github.com/immccn123/anti-sqrtsecond/issues
// @contributionURL https://sponsor.imken.moe/
// ==/UserScript==

const keywordMap = {
    'BV1GJ411x7h7': 'RickRoll',
    'BV1va411w7aM': 'RickRoll',
    'BV1BP4y1G78b': 'RickRoll',
    'BV1mu411U7GU': 'RickRoll',
    'BV1Px411w7FH': 'RickRoll',
    'BV1Ti4y1f7td': 'RickRoll',
    'av156766': 'RickRoll',
    'id=5221167': 'RickRoll', //  Netease Music
    'milime.top': 'RickRoll',
    'rrHrxMt': 'RickRoll',
    '192d9a98d782d9c74c96f09db9378d93.mp4': 'RickRoll',
    'BV12x411y7SN': '洛天依 - 凉雨',
    'BV1sx411S7rN': '天依教你甜甜圈的正确用法',
};

(function() {
    // 选择需要观察变动的节点
    const targetNode = document.getElementById('feed');
    if (targetNode) {
        // 观察器的配置（需要观察什么变动）
        const config = { attributes: false, childList: true, subtree: false };

        // 当观察到变动时执行的回调函数
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // 选择所有犇犇下的文字
                    const urlElements = document.querySelectorAll('.feed-comment p');

                    // 遍历每一个元素
                    for (let i in urlElements) {
                        if (urlElements[i].innerHTML && !urlElements[i].getAttribute('vist')) {
                            urlElements[i].setAttribute('vist', '1');
                            // 正则表达式替换
                            urlElements[i].innerHTML = urlElements[i].innerHTML.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>(\s*|&nbsp;)<\/a>/g, function(match, href) {
                                // 替换为内容为 href 的 <span> 标签
                                return '<span style="background-color: black; color: white;">' + decodeURIComponent(href) + '</span>';
                            });
                        }
                    }

                    // 获取所有图片元素
                    const imgElements = document.querySelectorAll('.feed-comment img');

                    // 遍历每个图片元素
                    for (let i in imgElements) {
                        if (imgElements[i].getAttribute && !imgElements[i].getAttribute('vist')) {
                            var altText = imgElements[i].getAttribute('alt');
                            var src = imgElements[i].getAttribute('src');
                            src = decodeURIComponent(src);
                            var newAltText = altText + ' | ' + src;
                            imgElements[i].setAttribute('alt', newAltText);
                            imgElements[i].setAttribute('style', 'background: gray; color: white;');
                            imgElements[i].setAttribute('vist', '1');
                        }
                    }

                    const linkElements = document.querySelectorAll('.feed-comment p a');
                    for (let i in linkElements) {
                        if (!linkElements[i].href) break;
                        if (linkElements[i].getAttribute('vist')) continue;
                        let link = linkElements[i].href;
                        let text = linkElements[i].innerText;
                        let flag = 1;
                        for (let keyword in keywordMap) {
                            if (link.includes(keyword)) {
                                linkElements[i].innerHTML += '<span style="background-color: yellow; font-family: monospace; color: red;"> [Warn: ' + keywordMap[keyword] + ']</span>';
                                linkElements[i].style['background-color'] = 'yellow';
                                flag = 0;
                                break;
                            }
                        }
                        if (flag && (text.startsWith('http://') || text.startsWith('https://')) && (link != text)) {
                            linkElements[i].innerHTML += '<span style="background-color: yellow; font-family: monospace; color: red;"> [Warn: 链接不匹配]</span>';
                            linkElements[i].style['background-color'] = 'yellow';
                        }
                        linkElements[i].setAttribute('vist', '1');
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
