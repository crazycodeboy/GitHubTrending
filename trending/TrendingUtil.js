/**
 * TrendingUtil
 * 工具类：用于将github trending html 转换成 TrendingRepoModel
 * 项目地址:https://github.com/crazycodeboy/GitHubTrending
 * 博客地址:http://www.devio.org
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
        splitWithH3.shift();
        for (var i = 0; i < splitWithH3.length; i++) {
            var repo = new TrendingRepoModel();
            var html = splitWithH3[i];

            this.parseRepoBaseInfo(repo, html);

            var metaNoteContent = this.parseContentWithNote(html, 'class="d-inline-block float-sm-right">', '</span>');
            var starCountContent = this.parseContentWithNote(html, '/stargazers">', '</a>');
            var forkCountContent = this.parseContentWithNote(html, '/members">', '</a>');
            repo.meta = this.parseRepoLabelWithTag(repo, metaNoteContent, '</svg>');
            repo.starCount = this.parseRepoLabelWithTag(repo, starCountContent, '</svg>');
            repo.forkCount = this.parseRepoLabelWithTag(repo, forkCountContent, '</svg>');

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

    static parseRepoLabelWithTag(repo, noteContent, tag) {
        let metaContent = noteContent.substring(noteContent.indexOf(tag) + tag.length, noteContent.length);
        return StringUtil.trim(metaContent);
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
