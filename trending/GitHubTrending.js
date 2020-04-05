/**
 * 从https://github.com/trending获取数据
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @flow
 */
import TrendingUtil from './TrendingUtil';

const FILTER_URLS = [
    {
        from: 'https://github.com/trending/All Language?',
        to: 'https://github.com/trending?'
    }
];
export default class GitHubTrending {
    constructor() {//Singleton pattern
        if (typeof GitHubTrending.instance === 'object') {
            return GitHubTrending.instance;
        }
        GitHubTrending.instance = this;
    }

    fetchTrending(url) {
        url = this.filterUrl(url);
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.text())
                .catch((error) => {
                    reject(error);
                    console.log(error);
                }).then((responseData) => {
                try {
                    resolve(TrendingUtil.htmlToRepo(responseData));
                } catch (e) {
                    reject(e);
                }
            }).done();
        });
    }

    filterUrl(url) {
        for (let i = 0; i < FILTER_URLS.length; i++) {
            let val = FILTER_URLS[i];
            if (url.startsWith(val.from)) {
                return url.replace(val.from,val.to);
            }
        }
        return url;
    }
}

