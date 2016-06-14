$(function() {

  var $pageWrapper = $("#page-wrapper");

  var searchPageContr = {
    searchPageFunction: _.template($("#search-page").html()),
    init: function() {
      console.log('in init')
      $pageWrapper.html(this.searchPageFunction);
      this.$userName = $("#userName");
      this.addEvent();
    },
    addEvent: function() {
      console.log('event')
      this.$userName.keyup(this.readUsername.bind(this));
    },
    readUsername: function(event) {
      if (event.keyCode == 13) {
        var userName =this.$userName.val();
        router.setRoute('/search/' + userName);
      }
    }
  };
  var Model = {
    repos: undefined,
    getReposByUserName: function(userName,successCb,errorCb){
      var requestObj = $.ajax({
        method: "GET",
        url: "https://api.github.com/users/"+userName+"/repos"
      });
      requestObj.success(this._setRepos.bind(this));
      requestObj.success(successCb);
      requestObj.error(errorCb);
    },
    _setRepos: function(repoList){
      this.repos = repoList
      console.log(repoList)
    },
    findById: function(repoId){
      var selectedRepo = _.find(this.repos, function(o) {
        return o.id === repoId;
      });
      return selectedRepo;
    }
  }
  var resultPageContr = {
    resultPageFunction: _.template($("#results-page").html()),
    repolistFunction: _.template($("#repo-list").html()),
    notFoundRepositoryFunk: _.template($("#user-not-exist").html()),
    createRepositoryList: function (){
      $('.loader').hide();
      var repoListHtml = this.repolistFunction({
        repositoryList: Model.repos
      });
      $("#repos-wrapper").html(repoListHtml);
    },
    notFoundRepository: function(){
      $('.loader').hide();
      console.log('this user is not exist')
      $("#repos-wrapper").html(this.notFoundRepositoryFunk);
    },
    addEvent: function() {
      console.log('event')
      $pageWrapper.on('click','.repository',this.openRepository.bind(this));
    },
    openRepository: function(event){
      var userName =  this.$userName.val();
      var repositoryId = $(event.currentTarget).attr('data-id');
      console.log(repositoryId);
      router.setRoute('/search/' + userName + "/" + repositoryId);
    },
    init: function(currentUser){
      this.$userName = $("#userName");
      $pageWrapper.html(this.resultPageFunction);
      console.log('search user')
      $('.loader').show();
      Model.getReposByUserName(
        currentUser,
        this.createRepositoryList.bind(this),
        this.notFoundRepository.bind(this)
      );
      this.addEvent();
    }
  };
  var repositoryPageContr = {
    repositoryPageFunction: _.template($("#current-repository-page").html()),
    init: function(userName, repoId) {
      console.log(repoId)
      console.log('in repository');
      var currentRepo = Model.findById(parseInt(repoId));
      var reposOptions = this.repositoryPageFunction({
        repository: currentRepo
      })
      $pageWrapper.html(reposOptions);
    },
  }
  var routes = {
    '/search': searchPageContr.init.bind(searchPageContr),
    '/search/:user': resultPageContr.init.bind(resultPageContr),
    '/search/:user/:repositoryId': repositoryPageContr.init.bind(repositoryPageContr)
  }

  var router = Router(routes).init('/search');
});
