import AuthManager from 'collegedesis/utils/auth_manager';

var ApplicationRoute = Ember.Route.extend({


  beforeModel: function() {
    App.AuthManager = AuthManager.create();
    console.log('get session from somewhere');
  },

  setupController: function(controller) {
    this._loadStatData();
    this._loadCollegeDesis();
  },

  actions: {
    goHome: function() {
      return this.transitionTo('index');
    },

    goToHome: function() {
      this.get('controller').showNav();
      return this.transitionTo('index');
    },

    goToNews: function() {
      this.get('controller').showNav();
      return this.transitionTo('news');
    },

    goToAbout: function() {
      this.get('controller').showNav();
      return this.transitionTo('d.show', this.get('controller.collegeDesisOrg'));
    },

    goToDirectory: function() {
      this.get('controller').showNav();
      return this.transitionTo('directory');
    },

    logout: function() {
      var session,
        _this = this;
      session = this.controller.get('session');
      session.deleteRecord();
      return session.save().then(function() {
        _this.set('controller.currentUser', null);
        _this.set('controller.session', _this.store.createRecord('session'));
      });
    }
  },

  _loadStatData: function() {
    var _this = this;
    $.get('api/v1/info', function(data) {
      _this.controller.set('numOfOrganizations', data.orgsCount);
      _this.controller.set('numOfUniversities', data.universityCount);
      _this.controller.set('numOfStates', data.stateCount);
    });
  },

  _loadCollegeDesis: function() {
    var _this = this;
    return this.store.find('organization', {
      slug: 'collegedesis'
    }).then(function(data) {
      return _this.controller.set('collegeDesisOrg', data.get('firstObject'));
    });
  },

});

export default ApplicationRoute;