var App = App || {};
App.baseCtrl = {
    $pageWrapper: $("#page-wrapper"),
    notFoundRepositoryFunction: _.template($("#user-not-exist").html()),
    notFoundRepository: function () {
        $('.loader').hide();
        this.$pageWrapper.html(this.notFoundRepositoryFunction);
    }
};
