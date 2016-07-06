var App = App || {};
App.resultPageCtrl = {
    resultPageFunction: _.template($("#results-page").html()),
    repolistFunction: _.template($("#repo-list").html()),
    createRepositoryList: function () {
        $('.loader').hide();
        var repoListHtml = this.repolistFunction({
            repositoryList: App.Model.repos,
            userName: App.Model.userName
        });
        $("#repos-wrapper").html(repoListHtml);
    },


    init: function (currentUser) {
        this.$userName = $("#userName");
        this.$pageWrapper.html(this.resultPageFunction);
        $('.loader').show();
        App.Model.getReposByUserName(
            currentUser,
            this.createRepositoryList.bind(this),
            this.notFoundRepository.bind(this)
        );
    }
};
_.assignIn(App.resultPageCtrl, App.baseCtrl);