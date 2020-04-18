# GitHubTrending

[![Download](https://img.shields.io/badge/Download-v5.0.0-ff69b4.svg) ](https://www.npmjs.com/package/GitHubTrending)
[ ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/crazycodeboy/GitHubTrending/pulls)

This is a library for fetch object data from "https://github.com/trending".



## Installation

Run `npm i GitHubTrending --save`

## Usage

```JavaScript
const AUTH_TOKEN = '从问答区https://coding.imooc.com/learn/qa/304.html获取的token';
new GitHubTrending(AUTH_TOKEN).fetchTrending(url)
    .then((data)=> {
        //
    }).catch((error)=> {
        //
});
```

TrendingRepoModel
-------

```js
export default class TrendingRepoModel {
    constructor(fullName, url, description, language, meta, contributors, contributorsUrl, starCount, forkCount) {
        this.fullName = fullName;
        this.url = url;
        this.description = description;
        this.language = language;
        this.meta = meta;
        this.contributors = contributors;
        this.contributorsUrl = contributorsUrl;
        this.starCount = starCount;
        this.forkCount = forkCount;
    }
}

```


```js
contributors: (5) ["https://avatars3.githubusercontent.com/u/1316332?s=40&amp;v=4", "https://avatars1.githubusercontent.com/u/90494?s=40&amp;v=4", "https://avatars1.githubusercontent.com/u/379606?s=40&amp;v=4", "https://avatars1.githubusercontent.com/u/1151041?s=40&amp;v=4", "https://avatars2.githubusercontent.com/u/1348527?s=40&amp;v=4"]
contributorsUrl: "d-inline-block"
description: "The Expo platform for making cross-platform mobile apps"
forkCount: "730"
fullName: "expo/expo"
language: "Objective-C"
meta: "9 stars today"
starCount: "6,466"
url: "/expo/expo"
```

>More examples can refer to [GitHubPopular](https://github.com/crazycodeboy/GitHubPopular)
