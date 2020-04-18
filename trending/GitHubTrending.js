/**
 * 从https://github.com/trending获取数据
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @flow
 */
const FILTER_URLS = [
    {
        from: 'https://github.com/trending/All Language?',
        to: 'https://github.com/trending?',
    },
];
const URL = 'http://api.devio.org/as/trending?sourceUrl=';
export default class GitHubTrending {
    constructor(authToken) {//Singleton pattern
        if (typeof GitHubTrending.instance === 'object') {
            return GitHubTrending.instance;
        }
        this.authToken = authToken;
        GitHubTrending.instance = this;
    }

    fetchTrending(url) {
        url = this.filterUrl(url);
        url = `${URL}${url}`;
        return new Promise((resolve, reject) => {
            fetch(url, {headers: {'auth-token': this.authToken}})
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    if (responseData['code'] === 0) {
                        resolve(responseData['data']['list']);
                    } else {
                        throw new Error(JSON.stringify(responseData));
                    }

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    filterUrl(url) {
        for (let i = 0; i < FILTER_URLS.length; i++) {
            let val = FILTER_URLS[i];
            if (url.startsWith(val.from)) {
                return url.replace(val.from, val.to);
            }
        }
        return url;
    }
}

