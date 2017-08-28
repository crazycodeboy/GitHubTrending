# GitHubTrending
This is a library for fetch object data from "https://github.com/trending".



## Installation

Run `npm i GitHubTrending --save`

## Usage

```JavaScript
new GitHubTrending().fetchTrending(url)
    .then((data)=> {
        //
    }).catch((error)=> {
        //
});
```

TrendingRepoModel
-------

```
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

>More examples can refer to [GitHubPopular](https://github.com/crazycodeboy/GitHubPopular)
