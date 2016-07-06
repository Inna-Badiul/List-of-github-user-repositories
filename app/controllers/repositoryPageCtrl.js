var App = App || {};
App.repositoryPageCtrl = {
    repositoryPageFunction: _.template($("#current-repository-page").html()),
    repositoryRender: function (repoId) {
        var selectedRepo = App.Model.findById(parseInt(repoId));
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
        if (App.Model.repos === undefined) {
            var cuuReps = App.Model.getReposByUserName(
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

_.assignIn(App.repositoryPageCtrl, App.baseCtrl);
