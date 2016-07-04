var repositoryPageCtrl = {
    repositoryPageFunction: _.template($("#current-repository-page").html()),
    repositoryRender: function (repoId) {
        var selectedRepo = Model.findById(parseInt(repoId));
        if(selectedRepo===undefined){
            this.notFoundRepository();
        }else {
            var reposOptions = this.repositoryPageFunction({
                repository: selectedRepo
            });
            this.$pageWrapper.html(reposOptions);
        }
    },
    init: function (userName, repoId) {
        if (Model.repos === undefined) {
            var cuuReps = Model.getReposByUserName(
                userName,
                (function () {
                    this.repositoryRender(repoId);
                }).bind(this),
                (function(){
                    this.notFoundRepository();
                }).bind(this)
            );

        } else {
            this.repositoryRender(repoId);
        }
    }
};

_.assignIn(repositoryPageCtrl, baseCtrl);
