// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
      reload: true,
      cache: false,
    url: "/search",
    views: {
      'menuContent': {
          templateUrl: "templates/search.html",
          controller: 'SearchCtrl'
      }
    }
  })
  .state('app.event', {
      cache: false,
      url: "/event/:siteId",
      views: {
          'menuContent': {
              templateUrl: "templates/event.html",
              controller: 'EventCtrl'
          }
      }
  })
    .state('app.questions', {
        reload: true,
        cache: false,
        url: "/questions",
        views: {
            'menuContent': {
                templateUrl: "templates/questions.html",
                controller: 'QuestionsCtrl'
            }
        }
    })


    .state('app.attendees', {
        reload: true,
        cache: false,
        url: "/attendees",
        views: {
            'menuContent': {
                templateUrl: "templates/attendees.html",
                controller: 'AttendeesCtrl'
            }
        }
    })

    .state('app.attendee', {
        reload: true,
        cache: false,
        url: "/attendee/:attendeeId",
        views: {
            'menuContent': {
                templateUrl: "templates/attendee.html",
                controller: 'AttendeeCtrl'
            }
        }
    })

    .state('app.speakers', {
        reload: true,
        cache: false,
        url: "/speakers",
        views: {
            'menuContent': {
                templateUrl: "templates/speakers.html",
                controller: 'SpeakersCtrl'
            }
        }
    })

    .state('app.speaker', {
        reload: true,
        cache: false,
        url: "/speaker/:speakerId",
        views: {
            'menuContent': {
                templateUrl: "templates/speaker.html",
                controller: 'speakerCtrl'
            }
        }
    })

    .state('app.sponsors', {
        reload: true,
        cache: false,
        url: "/sponsors",
        views: {
            'menuContent': {
                templateUrl: "templates/sponsors.html",
                controller: 'SponsorsCtrl'
            }
        }
    })

    .state('app.sponsor', {
        reload: true,
        cache: false,
        url: "/sponsor/:sponsorId",
        views: {
            'menuContent': {
                templateUrl: "templates/sponsor.html",
                controller: 'SponsorCtrl'
            }
        }
    })

    .state('app.dates', {
        reload: true,
        cache: false,
        url: "/dates",
        views: {
            'menuContent': {
                templateUrl: "templates/dates.html",
                controller: 'DatesCtrl'
            }
        }
    })


    .state('app.sessions', {
        reload: true,
        cache: false,
        url: "/sessions/:sessiongroupId",
        views: {
            'menuContent': {
                templateUrl: "templates/sessions.html",
                controller: 'SessionsCtrl'
            }
        }
    })

    .state('app.session', {
        reload: true,
        cache: false,
        url: "/session/:sessionId",
        views: {
            'menuContent': {
                templateUrl: "templates/session.html",
                controller: 'SessionCtrl'
            }
        }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');

});
