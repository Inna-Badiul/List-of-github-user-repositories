var resultPageCtrl = {
    resultPageFunction: _.template($("#results-page").html()),
    repolistFunction: _.template($("#repo-list").html()),
    createRepositoryList: function () {
        $('.loader').hide();
        var repoListHtml = this.repolistFunction({
            repositoryList: Model.repos,
            userName: Model.userName
        });
        $("#repos-wrapper").html(repoListHtml);
    },


    init: function (currentUser) {
        this.$userName = $("#userName");
        this.$pageWrapper.html(this.resultPageFunction);
        $('.loader').show();
        Model.getReposByUserName(
            currentUser,
            this.createRepositoryList.bind(this),
            this.notFoundRepository.bind(this)
        );
    }
};
_.assignIn(resultPageCtrl, baseCtrl);