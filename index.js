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
    init: function(currentUser){
      $pageWrapper.html(this.resultPageFunction);
      console.log('search user')
      $('.loader').show();
      Model.getReposByUserName(
        currentUser,
        this.createRepositoryList.bind(this),
        this.notFoundRepository.bind(this)
      );
    }
  };

  var routes = {
    '/search': searchPageContr.init.bind(searchPageContr),
    '/search/:user': resultPageContr.init.bind(resultPageContr)
  }

  var router = Router(routes).init('/search');
});
