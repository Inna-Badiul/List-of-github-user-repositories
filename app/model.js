var Model = {
    userName: undefined,
    repos: undefined,
    getReposByUserName: function (userName, successCb, errorCb) {
        var requestObj = $.ajax({
            method: "GET",
            url: "https://api.github.com/users/" + userName + "/repos"
        });
        requestObj.success(this._setRepos.bind(this));
        requestObj.success(successCb);
        requestObj.error(errorCb);
        this.userName=userName;
    },
    _setRepos: function (repoList) {
        this.repos = repoList;
    },
    findById: function (repoId) {
        var selectedRepo = _.find(this.repos, function (o) {
            return o.id === repoId;
        });
        return selectedRepo;
    }
};