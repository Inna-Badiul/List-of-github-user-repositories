var routes = {
    '/search': searchPageCtrl.init.bind(searchPageCtrl),
    '/search/:user': resultPageCtrl.init.bind(resultPageCtrl),
    '/search/:user/:repositoryId': repositoryPageCtrl.init.bind(repositoryPageCtrl)
};

var router = Router(routes).init('/search');

