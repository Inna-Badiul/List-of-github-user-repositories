var searchPageCtrl = {
    searchPageFunction: _.template($("#search-page").html()),
    init: function () {
        this.$pageWrapper.html(this.searchPageFunction);
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
_.assignIn(searchPageCtrl, baseCtrl);
