$(function () {
    var $pageWrapper = $("#page-wrapper");

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

    var baseCtrl = {
        notFoundRepositoryFunction: _.template($("#user-not-exist").html()),
        notFoundRepository: function () {
            $('.loader').hide();
            $pageWrapper.html(this.notFoundRepositoryFunction);
        }
    };


    var searchPageCtrl = {
        searchPageFunction: _.template($("#search-page").html()),
        init: function () {
            $pageWrapper.html(this.searchPageFunction);
            this.$userName = $("#userName");
            this.addEvent();
        },
        addEvent: function () {
            this.$userName.keyup(this.readUsername.bind(this));
        },
        readUsername: function (event) {
            if (event.keyCode == 13) {
                var userName = this.$userName.val();
                router.setRoute('/search/' + userName);
            }
        }
    };
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
            $pageWrapper.html(this.resultPageFunction);
            $('.loader').show();
            Model.getReposByUserName(
                currentUser,
                this.createRepositoryList.bind(this),
                this.notFoundRepository.bind(this)
            );
        }
    };
    _.assignIn(resultPageCtrl, baseCtrl);
    //------------
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
                $pageWrapper.html(reposOptions);
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
            console.log('in repository');
        }
    };

    _.assignIn(repositoryPageCtrl, baseCtrl);

    var routes = {
        '/search': searchPageCtrl.init.bind(searchPageCtrl),
        '/search/:user': resultPageCtrl.init.bind(resultPageCtrl),
        '/search/:user/:repositoryId': repositoryPageCtrl.init.bind(repositoryPageCtrl)
    };

    var router = Router(routes).init('/search');
});
