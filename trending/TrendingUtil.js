/**
 * TrendingUtil
 * 工具类：用于将github trending html 转换成 TrendingRepoModel
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
 * @version 3.1.2 2019.10.27
 * @flow
 */


import TrendingRepoModel from './TrendingRepoModel';
import StringUtil from './StringUtil';

var TAGS = {
    meta: {
        start: '<span class="d-inline-block float-sm-right">',
        end: '</span>'
    },
    forkCount: {
        start: '<a class="muted-link d-inline-block mr-3"',
        flag: '/stargazers">',
        end: '</a>'
    },
    starCount: {
        start: '<a class="muted-link d-inline-block mr-3"',
        flag: '/network">',
        end: '</a>'
    }

}
export default class TrendingUtil {
    static htmlToRepo(responseData) {
        responseData = responseData.substring(responseData.indexOf('<article class="Box-row">'), responseData.lastIndexOf('</article>')).replace(/\n/, '');
        var repos = [];
        var splitWithH3 = responseData.split('</article>');
        // splitWithH3.shift();
        for (let i = 0; i < splitWithH3.length; i++) {
            let repo = new TrendingRepoModel();
            let html = splitWithH3[i];

            this.parseRepoBaseInfo(repo, html);
            let spanArr = html.split('</svg>\n');
            let starCountContent = this.parseContentWithNote(spanArr[3], '', '</a>');
            let forkCountContent = this.parseContentWithNote(spanArr[4], '', '</a>');
            let metaNoteContent = this.parseContentWithNote(spanArr[5], '', '</span>');

            repo.starCount = starCountContent;
            repo.forkCount = forkCountContent;
            repo.meta = metaNoteContent;

            this.parseRepoLang(repo, html);
            this.parseRepoContributors(repo, html);
            repos.push(repo);
        }
        return repos;
    }

    static parseContentWithNote(htmlStr, startFlag, endFlag) {
        var noteStar = htmlStr.indexOf(startFlag);
        if (noteStar == -1) {
            return '';
        } else {
            noteStar += +startFlag.length;
        }

        var noteEnd = htmlStr.indexOf(endFlag, noteStar);
        var content = htmlStr.substring(noteStar, noteEnd);
        return StringUtil.trim(content)
    }

    static parseRepoBaseInfo(repo, htmlBaseInfo) {
        var urlIndex = htmlBaseInfo.indexOf('<a href="') + '<a href="'.length;
        var url = htmlBaseInfo.slice(urlIndex, htmlBaseInfo.indexOf('">', urlIndex));
        repo.url = url;
        repo.fullName = url.slice(1, url.length);

        var description = this.parseContentWithNote(htmlBaseInfo, '<p class="col-9 text-gray my-1 pr-4">', '</p>');
        repo.description = description;
    }

    static parseRepoLang(repo, metaNoteContent) {
        var content = this.parseContentWithNote(metaNoteContent, 'programmingLanguage">', '</span>');
        repo.language = StringUtil.trim(content);
    }

    static parseRepoContributors(repo, htmlContributors) {
        htmlContributors = this.parseContentWithNote(htmlContributors, 'Built by', '</span>');
        var splitWitSemicolon = htmlContributors.split('"');
        repo.contributorsUrl = splitWitSemicolon[1];
        var contributors = [];
        for (var i = 0; i < splitWitSemicolon.length; i++) {
            var url = splitWitSemicolon[i];
            if (url.search('http') !== -1) {
                contributors.push(url);
            }
        }
        repo.contributors = contributors;
    }
}
