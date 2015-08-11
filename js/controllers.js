
angular.module('starter.controllers', [])
.service('faqService', function (websocket) {
    var questions = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_faq_select"
            parms["_emit"] = "faq"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})

.service('attendeesService', function (websocket) {
    var dates = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_attendees_select"
            parms["_emit"] = "attendees"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})

.service('speakersService', function (websocket) {
    var dates = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_speakers_select"
            parms["_emit"] = "speakers"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})

.service('sponsorsService', function (websocket) {
    var dates = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_sponsors_select"
            parms["_emit"] = "sponsors"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})

.service('datesService', function (websocket) {
    var dates = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_session_group_select"
            parms["_emit"] = "dates"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})
.service('sessionsService', function (websocket) {
    var dates = [];
    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_session_select"
            parms["_emit"] = "sessions"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            ws.send(JSON.stringify(parms));
        }
    };
})

.service('tblsite', function (websocket) {
    var site = [];

    return {
        refreshData: function (siteid) {
            var parms = {};
            parms["_prc"] = "prc_site_select"
            parms["_emit"] = "site"
            parms["siteid"] = siteid;
            var ws = websocket.getWS();
            waitForSocketConnection(ws, function () {
                ws.send(JSON.stringify(parms));
            });

        }
    };
})
.service('websocket', function () {
    var ws = new WebSocket("wss://www.fluid.events/mobile.ashx");
    //var ws = new WebSocket("ws://localhost:64004/MSWSChatHandler.ashx");

    return {
        getWS: function () {
            return ws;
        },
        setWS: function (value) {
            ws = value;
        }
    };
})
.controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $timeout, $http, $location, $sce, websocket, $ionicPopup) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;
    

    //alert('AppCtrl');
    //var ws;
    //var ws = new WebSocket("ws://www.fluideventsolutions.com/MSWSChatHandler.ashx");
    //websocket.setWS(ws);
    $rootScope.ws = websocket.getWS();



    $rootScope.sites = [];






    //ws = new WebSocket("ws://localhost:64004/MSWSChatHandler.ashx");


    $rootScope.ws.onmessage = function (evt) {

        //$("#spanStatus").text(evt.data);
        var arr = JSON.parse(evt.data);
        var emission = arr[0]["_emit"];
        if (emission == "sites") {
            var data = arr[0]["data"];
            if (data.length > 0) {
                if ($rootScope.sites.length < 1) {
                    $rootScope.sites = data;
                }
                else {
                    for (i = 0; i < data.length; i++) {
                        $rootScope.sites.push(data[i]);
                    }
                }
                $rootScope.lastId = $rootScope.sites[$rootScope.sites.length - 1].siteid;
            }
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
        }
        if (emission == "site") {
            var data = arr[0]["data"];
            $rootScope.site = data;
            $rootScope.$apply();
        }

        if (emission == "faq") {
            var data = arr[0]["data"];
            $rootScope.questions = data;
            $rootScope.$apply();
        }

        if (emission == "dates") {
            var data = arr[0]["data"];
            $rootScope.dates = data;
            $rootScope.$apply();
        }

        if (emission == "sessions") {
            var data = arr[0]["data"];
            $rootScope.sessions = data
            $rootScope.$apply();
        }

        if (emission == "attendees") {
            var data = arr[0]["data"];
            $rootScope.attendees = data
            $rootScope.$apply();
        }

        if (emission == "speakers") {
            var data = arr[0]["data"];
            $rootScope.speakers = data
            $rootScope.$apply();
        }

        if (emission == "sponsors") {
            var data = arr[0]["data"];
            $rootScope.sponsors = data
            $rootScope.$apply();
        }

        if (emission == "broadcast") {
            //alert(arr[0]["_message"]);
            var msg = arr[0]["_message"];
            $rootScope.showAlert = function () {
                $rootScope.pbox = true;
                var alertPopup = $ionicPopup.alert({
                    title: 'Don\'t eat that!',
                    template: 'It might taste good'
                });
                alertPopup.then(function (res) {
                    $rootScope.pbox = false;
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };
            if ($rootScope.pbox != true)
                $rootScope.showAlert();
        }
    };



    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // emissioned in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };



    $scope.loadsite = function () {
        var parms = {};
        parms["_prc"] = "prc_site_select"
        parms["_emit"] = "site"
        parms["siteid"] = 2;
        $rootScope.ws.send(JSON.stringify(parms));


        return;
        $location.path('/cars');


        $scope.loading = true;
        $scope.showSideBar = true;

        /*

        var params = {};
        params["siteid"] = $scope.siteid;
        console.log("trying1");
        socket.emit('execsp', 'prc_site_select', params, function (result) {
            console.log("trying2");
            $scope.site = result;
            alert($scope.site[0].description);
            socket.emit('execsp', 'prc_faq_select', params, function (result) {
                $scope.faq = result;
                for (i = 0; i < $scope.faq.length; i++) {
                    $scope.faq[i].answer = $sce.trustAsHtml($scope.faq[i].answer);
                }

                socket.emit('execsp', 'prc_surveys_select', params, function (result) {
                    $scope.surveys = result;

                    socket.emit('execsp', 'prc_survey_questions_select', params, function (result) {
                        $scope.questions = result;

                        socket.emit('execsp', 'prc_survey_question_options_select', params, function (result) {
                            $scope.options = result;
                            for (var i = 0; i < $scope.surveys.length; i++) {
                                var pages = 0;
                                var page = 0;
                                for (var x = 0; x < $scope.questions.length; x++) {
                                    if ($scope.questions[x].surveyid == $scope.surveys[i].surveyid) {
                                        page += 1;
                                        $scope.questions[x].page = page;
                                        pages += 1;
                                    }
                                }
                                for (var x = 0; x < $scope.questions.length; x++) {
                                    if ($scope.questions[x].surveyid == $scope.surveys[i].surveyid) {
                                        $scope.questions[x].pages = pages;
                                    }
                                }
                            }


                            socket.emit('execsp', 'prc_profile_select', params, function (result) {
                                $scope.profiles = result;
                                $scope.notices = [];
                                for (var j = 0; j < $scope.profiles.length; j++) {
                                    var user = $scope.profiles[j];
                                    $scope.notices.push({ icon: 'envelope', message: 'Notice ' + j });
                                }


                                socket.emit('execsp', 'prc_session_group_select', params, function (result) {
                                    $scope.sessiongroups = result;


                                    socket.emit('execsp', 'prc_session_select', params, function (result) {
                                        $scope.sessions = result;

                                        $http({ url: '', method: 'POST', data: params });

                                        //original2($location, $scope);

                                        $location.path('/cars');
                                        $scope.loading = false;

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        */
    }
    /*============================ END OF IMPORTED FROM ORIGINAL ===================================================*/
})
.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])


.controller('SearchCtrl', function ($rootScope, $stateParams, tblsite) {
    /*--- SHOW MENU ONLY IF THERE IS A SITE SELECTED -----------------------*/
    if ($rootScope.site != null) {
        $rootScope.allowSideMenu = true;
        $rootScope.dragContent = true;
        $rootScope.enableMenuWithBack = true;
        $rootScope.hideNav = false;
    }
    else {
        $rootScope.allowSideMenu = false;
        $rootScope.dragContent = false;
        $rootScope.enableMenuWithBack = false;
        $rootScope.hideNav = true;

    }


})

.controller('EventCtrl', function ($rootScope, $stateParams, tblsite) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;

    $rootScope.site = [];
    var siteid = $stateParams.siteId;

    tblsite.refreshData(siteid);


})

.controller('AttendeesCtrl', function ($rootScope, $scope, attendeesService, $location) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;

    $rootScope.attendees = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            attendeesService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }
})

.controller('AttendeeCtrl', function ($rootScope, $scope, $location, $stateParams) {
    $rootScope.allowSideMenu = false;
    $rootScope.dragContent = false;
    $rootScope.enableMenuWithBack = false;
    $rootScope.hideNav = true;

    $rootScope.attendeeid = $stateParams.attendeeId;
    var result = $rootScope.attendees.filter(function (obj) {
        return obj.attendeeid == $rootScope.attendeeid;
    });

    $scope.attendee = result;
    
    if ($rootScope.site != null) {

    }
    else {
        $location.path("/search");
    }
})


.controller('SpeakersCtrl', function ($rootScope, $scope, speakersService, $location) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;

    $rootScope.speakers = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            speakersService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }
})

.controller('speakerCtrl', function ($rootScope, $scope, $location, $stateParams) {
    $rootScope.allowSideMenu = false;
    $rootScope.dragContent = false;
    $rootScope.enableMenuWithBack = false;
    $rootScope.hideNav = true;

    $rootScope.speakerid = $stateParams.speakerId;
    var result = $rootScope.speakers.filter(function (obj) {
        return obj.speakerid == $rootScope.speakerid;
    });

    $scope.speaker = result;

    if ($rootScope.site != null) {

    }
    else {
        $location.path("/search");
    }
})

.controller('SponsorsCtrl', function ($rootScope, $scope, sponsorsService, $location) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;

    $rootScope.sponsors = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            sponsorsService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }
})

.controller('SponsorCtrl', function ($rootScope, $scope, $location, $stateParams) {
    $rootScope.allowSideMenu = false;
    $rootScope.dragContent = false;
    $rootScope.enableMenuWithBack = false;
    $rootScope.hideNav = true;

    $rootScope.sponsorid = $stateParams.sponsorId;
    var result = $rootScope.sponsors.filter(function (obj) {
        return obj.sponsorid == $rootScope.sponsorid;
    });

    $scope.sponsor = result;

    if ($rootScope.site != null) {

    }
    else {
        $location.path("/search");
    }
})

.controller('DatesCtrl', function ($rootScope, $scope, datesService, $location) {
    $rootScope.allowSideMenu = true;
    $rootScope.dragContent = true;
    $rootScope.enableMenuWithBack = true;
    $rootScope.hideNav = false;

    $rootScope.questions = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            datesService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }

})
.controller('SessionsCtrl', function ($rootScope, $scope, sessionsService, $location) {
    $rootScope.allowSideMenu = false;
    $rootScope.dragContent = false;
    $rootScope.enableMenuWithBack = false;
    $rootScope.hideNav = true;

    $rootScope.sessions = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            sessionsService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }

})
.controller('SessionCtrl', function ($rootScope, $scope, $stateParams, $location) {
    //$rootScope.allowSideMenu = false;
    //$rootScope.dragContent = false;
    //$rootScope.enableMenuWithBack = false;
    

    $rootScope.session = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            var sessionid = $stateParams.sessionId;
            var result = $rootScope.sessions.filter(function (obj) {
                return obj.sessionid == sessionid;
            });
            result[0].sessionstartdate = new Date(parseInt(result[0].sessionstartdate.substr(6)));
            result[0].sessionenddate = new Date(parseInt(result[0].sessionenddate.substr(6)));
            $rootScope.session = result;

        }
    }
    else {
        $location.path("/search");
    }

})
.controller('QuestionsCtrl', function ($rootScope, $scope, faqService, $location) {
    $rootScope.questions = [];
    if ($rootScope.site != null) {
        if ($rootScope.site.length > 0) {
            faqService.refreshData($rootScope.site[0].siteid);
        }
    }
    else {
        $location.path("/search");
    }

})
.controller('searchController', function ($rootScope, $scope, $stateParams, $http, tblsite, $ionicPopup) {





    $rootScope.lastId = 0;
    $rootScope.loadMore = function () {
        if ($rootScope.ws.readyState == WebSocket.OPEN) {
            var parms = {};
            parms["_prc"] = "prc_sites_select"
            parms["_emit"] = "sites"
            parms["firstid"] = 0;
            parms["lastid"] = $rootScope.lastId;


            $rootScope.ws.send(JSON.stringify(parms));

        }

        $rootScope.ws.onopen = function () {
            $rootScope.loadMore();
            //$scope.siteid = 2;


        };

    };

    $rootScope.canWeLoadMoreContent = function () {
        return ($rootScope.sites.length > 49) ? false : true;
    }
})

;
function waitForSocketConnection(socket, callback) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null) {
                    callback();
                }
                return;

            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}

/*

var parms = {};
parms["siteid"] = 0;
$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
$http({ url: 'http://www.ts-solutions.net/todd_hub/companionhelper.ashx', method: 'POST', data: parms }).
	success(function (data, status, headers, config) {
        	if (data["prc_sites_select"].length > 0) {
                    if ($scope.sites.length < 1) {
                        $scope.sites = data["prc_sites_select"];
                    }
                    else {
                        for (i = 0; i < data["prc_sites_select"].length; i++) {
                            $scope.sites.push(data["prc_sites_select"][i]);
                        }
                    }
                    $scope.lastId = $scope.sites[$scope.sites.length - 1].siteid;
                }
                //$scope.loading = false;
            }).
            error(function (data, status, headers, config) {
                alert(status + ' ' + data + "\n" + headers + ' ' + config);
            });

*/