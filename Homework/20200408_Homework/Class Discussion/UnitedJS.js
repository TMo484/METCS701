 (function () {
            'use strict';

            //3rd party plugins should inject to uaCommonModule instead of uaApp
            //so i delect 'powerbi' module , if u have any question ,contact Ming.
            angular.module('uaApp', ['portalModule', 'bankingModule'])
                .controller('headerController', headerController)
                .controller('footerController', footerController)
                .service("$history", function ($state, $rootScope, $window) {

                    var history = [];

                    angular.extend(this, {
                        push: function (state, params) {
                            history.push({state: state, params: params});
                        },
                        all: function () {
                            return history;
                        },
                        go: function (step) {
                            // TODO:
                            // (1) Determine # of states in stack with URLs, attempt to
                            //    shell out to $window.history when possible
                            // (2) Attempt to figure out some algorthim for reversing that,
                            //     so you can also go forward

                            var prev = this.previous(step || -1);
                            return $state.go(prev.state, prev.params);
                        },
                        previous: function (step) {
                            return history[history.length - Math.abs(step || 1)];
                        },
                        back: function () {
                            return this.go(-1);
                        }
                    });

                })
                .factory('menuShowHideFactory', function () {
                    var factory = function (list) {
                        return new menuShowHideService(list);
                    };
                    return factory;
                })
                .config(config)
                .value('appName', 'NO_APP_SELECTED')
                .run(run);

            headerController.$inject = ['$rootScope', '$scope', '$log', '$window', '$state', 'menuShowHideFactory', '$interval', 'SecurityService', 'CMSService', 'session', 'APP_CONFIG', '$sce', 'PPService','$timeout'];

            function headerController($rootScope, $scope, $log, $window, $state, menuShowHideFactory, $interval, SecurityService, CMSService, session, APP_CONFIG, $sce, PPService,$timeout) {

                $rootScope.activeTravelWaiverFlg = false;
                $scope.jumpToActiveTravelWaiver = function () {

                    $rootScope.activeTravelWaiverFlg = true;
                    $state.go('all-travel-waiver');
                };

                var panelList = ['signInShow', 'notificationShow', 'signOutShow', 'menuDropShow', 'moreIcon'];
                var menuService = menuShowHideFactory(panelList);

                $scope.sumOfMsg = 0;
                /****************************
                 * key model:{string}
                 * whether dropdown is visible
                 * which sub tree is current
                 ***************************/
                $scope.menuItem = '';
                $scope.currentDataTier3 = [];
                $scope.currentDataBranch = {};


                $scope.searchClick = function () {

                    $rootScope.showSearchPanel = !$rootScope.showSearchPanel;
                    $scope.shownPanel = '';
                    $scope.bodyClass = '';
                };

                $scope.setSignOut = function () {
                    var contactId = '';
                    if ($rootScope.IsImpersonation) {
                        contactId = $rootScope.impersonationContactId;
                    }
                    SecurityService.setupCurrentApplication(contactId).then(function () {
                        $scope.shownPanel = false;
                        session.clear();
                        $rootScope.currentUser = null;



                        if ($rootScope.APP_CONFIG.env === 'dev') {
                            SecurityService.localLogout().then(function () {
                                window.location.hash = '#/public-landing';
                            })
                        }
                        else {
                            var url = '/secur/logout.jsp?retUrl=';
                            $window.open(url, "_self");
                        }
                    })
                };

                retrieveTileBlocks(true)

                $rootScope.$on('tileRefresh',function () {
                    console.log('tileRefresh')
                    retrieveTileBlocks(true)
                })

                $rootScope.$on('publicTileRefresh',function () {
                    console.log('public tile')
                    SecurityService.getTileBlockInfos('',$rootScope.currentLang).then(function (value) {
                        $scope.blockInfoData =  convertArrayTokvObj(value, 'blockKeyName','blockContentVM')
                    })
                })

                function retrieveTileBlocks (continueFlag){
                    if(!continueFlag){
                        return
                    }

                    if($rootScope.currentUser){
                        SecurityService.getTileBlockInfos($rootScope.currentUser.id,$rootScope.currentLang).then(function (value) {
                            $scope.blockInfoData =  convertArrayTokvObj(value, 'blockKeyName','blockContentVM')
                        })
                    }else {
                        $timeout(function () {
                            retrieveTileBlocks(true)
                        },300)
                    }
                }
                $scope.trustSrc = function(src) {
                    return $sce.trustAsResourceUrl(src);
                }

                function convertArrayTokvObj(data,keyName, valueName){
                    let kvObj = {};
                    if (Array.isArray(data)) {
                        data.forEach(function (item) {
                            kvObj[item[keyName]] = item[valueName]
                        });
                    } else {
                        kvObj[data[keyName]] = data[valueName];
                    }
                    return kvObj;
                }


                $scope.appSelect = function () {
                    if ($rootScope.currentUser) {
                        if($rootScope.currentUser.SIP_Current_Portal_App__c === $rootScope.APP_NAME.meeting){
                            $state.go('my-app-center');
                            return
                        }

                        $scope.currentAppList = $rootScope.currentUser.appList
                        $scope.triggerClick('appShow')
                    } else {
                        $state.go('app-center')
                    }
                }

                function redirectRegistration(appName, isBindingUserData){
                    isBindingUserData = isBindingUserData | false;
                    switch (appName) {
                        case $rootScope.APP_NAME.meeting:
                            $state.go('registration-meeting', {bindingUserData:isBindingUserData, appName:appName})
                            break;
                        case $rootScope.APP_NAME.jetStream:
                            $state.go('registration-jetStream', {bindingUserData:isBindingUserData, appName:appName})
                            break;
                        case $rootScope.APP_NAME.passPlus:
                            $state.go('registration-passPlus', {bindingUserData:isBindingUserData, appName:appName})
                            break;
                        default:
                            $state.go('registration', {appName: appName});
                    }
                }


                $scope.clickWaffle = function (app) {
                    
                    $rootScope.mainSpinner = true;
                    if ((app.applicationValue === $rootScope.APP_NAME.meeting) && $rootScope.IsImpersonation && ($rootScope.currentUser.Sip_Application__c.indexOf($rootScope.APP_NAME.meeting) === -1)) {
                        $rootScope.$broadcast('showMessage', {
                            type: 'alert',
                            text: 'This user does not have access to United Meetings.'
                        });
                        $rootScope.mainSpinner = false;
                        return false;
                    }
                     //Shivani REQ-0788 Method Changed
                     var appName = app.applicationValue;
                    var userId = $rootScope.currentUser.id;
                    CMSService.checkAppAvailabel(userId, appName).then(function (isAvailableResult) {
                        if (!isAvailableResult.success) {
                            $scope.chosenApp = appName;
                            $("#registration-modal-confirm").modal('show');
                            $rootScope.mainSpinner = false;
                        } else {
                            $scope.proceedToRegistration(userId, appName);
                        }
                    });
                    $scope.proceedToRegistration = function (userId, appName) {
                        $("#registration-modal-confirm").modal('hide');
                        $rootScope.mainSpinner = true;
                        CMSService.selfRegisterCheck(userId, appName).then(function (value) {
                            console.log('headerController: clickWaffle(): CMSService.selfRegisterCheck(): value ===', value);
                            if (value.success) {
                                SecurityService.getUserInfoExtensionToRoot().then(function () {
                                    $rootScope.mainSpinner = false;
                                    if (appName === $rootScope.APP…