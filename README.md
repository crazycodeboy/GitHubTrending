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

>More examples can refer to [GitHubPopular](https://github.com/crazycodeboy/GitHubPopular)
