var routes = {
    '/search': App.searchPageCtrl.init.bind(App.searchPageCtrl),
    '/search/:user': App.resultPageCtrl.init.bind(App.resultPageCtrl),
    '/search/:user/:repositoryId': App.repositoryPageCtrl.init.bind(App.repositoryPageCtrl)
};


var router = Router(routes).init('/search');


