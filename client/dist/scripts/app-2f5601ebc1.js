"use strict";!function(){angular.module("es",["angular-loading-bar","ngSanitize","restangular","textAngular","ui.bootstrap","ui.router"])}(),function(){angular.module("es").controller("ContactFormCtrl",["$state","$stateParams","RestContactService",function(t,a,e){function r(){e.one(a.id).get().then(function(t){t.phone=Number(t.phone),s.contact=t})}function n(a){a.id?a.put().then(function(){t.go("contact-list")}):e.post(a).then(function(){t.go("contact-list")})}var s=this;s.contact={},s.load=r,s.save=n,"+"!==a.id&&r()}])}(),function(){angular.module("es").controller("ContactListCtrl",["$location","RestContactService",function(t,a){function e(){s.searchParams.hash++,s.searchParams.page=s.currentPage-1,delete s.searchParams.offset,t.search(s.searchParams),s.searchParams.offset=s.searchParams.max*s.searchParams.page,a.getList(s.searchParams).then(function(t){s.contacts=t,t.forEach(r)})}function r(t){t.one("groups").getList().then(function(a){t.groups=a})}function n(t){var a=window.confirm("Delete contacts?");a&&t.remove().then(function(){e()})}var s=this;s["delete"]=n,s.search=e,s.searchParams=t.search(),s.searchParams.hash=0,s.searchParams.page=_.defaultTo(s.searchParams.page,0),s.searchParams.max=_.defaultTo(s.searchParams.max,10),s.currentPage=_.defaultTo(s.currentPage,s.searchParams.page+1),e()}])}(),function(){angular.module("es").config(["$stateProvider",function(t){t.state("contact-list",{url:"/backend/contacts",controller:"ContactListCtrl as ctrl",templateUrl:"app/contact/contact.list.html"}).state("contact-form",{url:"/backend/contacts/:id",controller:"ContactFormCtrl as ctrl",templateUrl:"app/contact/contact.form.html"})}])}(),function(){angular.module("es").factory("RestContactService",["Restangular",function(t){return t.service("contacts")}])}(),function(){angular.module("es").controller("GroupContactListCtrl",["$location","$stateParams","RestContactService","RestGroupService",function(t,a,e,r){function n(t,a){t.post("contacts",a).then(function(){i.contact=null,o(t)},function(){i.contact=null})}function s(t){return e.getList({max:5,q:t})}function c(){return r.one(a.id).get().then(function(t){i.group=t,o(t)})}function o(a){i.searchParams.hash++,i.searchParams.page=i.currentPage-1,delete i.searchParams.offset,t.search(i.searchParams),i.searchParams.offset=i.searchParams.max*i.searchParams.page,a.getList("contacts",i.searchParams).then(function(t){a.contacts=t})}function l(t,a){var e=window.confirm("Remove "+a.name+"?");e&&t.one("contacts",a.id).remove().then(function(){o(t)})}var i=this;i.addContact=n,i.removeContact=l,i.search=o,i.searchContacts=s,i.searchParams=t.search(),i.searchParams.hash=0,i.searchParams.page=_.defaultTo(i.searchParams.page,0),i.searchParams.max=_.defaultTo(i.searchParams.max,10),i.currentPage=_.defaultTo(i.currentPage,i.searchParams.page+1),c()}])}(),function(){angular.module("es").controller("GroupFormCtrl",["$state","$stateParams","RestGroupService",function(t,a,e){function r(){e.one(a.id).get().then(function(t){s.group=t})}function n(a){a.id?a.put().then(function(){t.go("group-list")}):e.post(a).then(function(){t.go("group-list")})}var s=this;s.group={},s.load=r,s.save=n,"+"!==a.id&&r()}])}(),function(){angular.module("es").controller("GroupListCtrl",["$location","RestGroupService",function(t,a){function e(){s.searchParams.hash++,s.searchParams.page=s.currentPage-1,delete s.searchParams.offset,t.search(s.searchParams),s.searchParams.offset=s.searchParams.max*s.searchParams.page,a.getList(s.searchParams).then(function(t){s.groups=t,t.forEach(r)})}function r(t){t.getList("contacts",{max:0}).then(function(a){t.contacts=a})}function n(t){var a=window.confirm("Delete groups?");a&&t.remove().then(function(){e()})}var s=this;s["delete"]=n,s.search=e,s.searchParams=t.search(),s.searchParams.hash=0,s.searchParams.page=_.defaultTo(s.searchParams.page,0),s.searchParams.max=_.defaultTo(s.searchParams.max,10),s.currentPage=_.defaultTo(s.currentPage,s.searchParams.page+1),e()}])}(),function(){angular.module("es").config(["$stateProvider",function(t){t.state("group-list",{url:"/backend/groups",controller:"GroupListCtrl as ctrl",templateUrl:"app/group/group.list.html"}).state("group-form",{url:"/backend/groups/:id",controller:"GroupFormCtrl as ctrl",templateUrl:"app/group/group.form.html"}).state("group-contact-list",{url:"/backend/groups/:id/contacts?q",controller:"GroupContactListCtrl as ctrl",templateUrl:"app/group/group.contact.list.html"})}])}(),function(){angular.module("es").factory("RestGroupService",["Restangular",function(t){return t.service("groups")}])}(),function(){angular.module("es").controller("MailFormCtrl",["$state","$stateParams","RestGroupService","RestMailService","RestTemplateService",function(t,a,e,r,n){function s(t){t.getList("contacts",u.searchParams).then(function(a){t.contacts=a})}function c(){e.getList().then(function(t){u.groups=t,u.mail.group||(u.mail.group=t[0],s(t[0]))})}function o(){r.one(a.id).get().then(function(t){u.mail=t})}function l(){n.getList().then(function(t){u.templates=t,u.mail.template||(u.mail.template=t[0])})}function i(a){a.id?a.put().then(function(){t.go("mail-list")}):r.post(a).then(function(){t.go("mail-list")})}var u=this;u.mail={},u.load=o,u.loadContacts=s,u.save=i,c(),l(),"+"!==a.id&&o()}])}(),function(){angular.module("es").controller("MailListCtrl",["$location","RestMailService",function(t,a){function e(){n.searchParams.hash++,n.searchParams.page=n.currentPage-1,delete n.searchParams.offset,t.search(n.searchParams),n.searchParams.offset=n.searchParams.max*n.searchParams.page,a.getList(n.searchParams).then(function(t){n.mails=t})}function r(t){var a=window.confirm("Delete mails?");a&&t.remove().then(function(){e()})}var n=this;n["delete"]=r,n.search=e,n.searchParams=t.search(),n.searchParams.hash=0,n.searchParams.page=_.defaultTo(n.searchParams.page,0),n.searchParams.max=_.defaultTo(n.searchParams.max,10),n.currentPage=_.defaultTo(n.currentPage,n.searchParams.page+1),e()}])}(),function(){angular.module("es").config(["$stateProvider",function(t){t.state("mail-list",{url:"/backend/mails",controller:"MailListCtrl as ctrl",templateUrl:"app/mail/mail.list.html"}).state("mail-form",{url:"/backend/mails/:id",controller:"MailFormCtrl as ctrl",templateUrl:"app/mail/mail.form.html"}).state("mail-contact-list",{url:"/backend/mails/:id/contacts?q",controller:"MailContactListCtrl as ctrl",templateUrl:"app/mail/mail.contact.list.html"})}])}(),function(){angular.module("es").factory("RestMailService",["Restangular",function(t){return t.service("mails")}])}(),function(){angular.module("es").controller("TemplateFormCtrl",["$state","$stateParams","RestTemplateService",function(t,a,e){function r(){e.one(a.id).get().then(function(t){s.template=t})}function n(a){a.id?a.put().then(function(){t.go("template-list")}):e.post(a).then(function(){t.go("template-list")})}var s=this;s.template={},s.load=r,s.save=n,"+"!==a.id&&r()}])}(),function(){angular.module("es").controller("TemplateListCtrl",["$location","RestTemplateService",function(t,a){function e(){s.searchParams.hash++,s.searchParams.page=s.currentPage-1,delete s.searchParams.offset,t.search(s.searchParams),s.searchParams.offset=s.searchParams.max*s.searchParams.page,a.getList(s.searchParams).then(function(t){s.templates=t,t.forEach(r)})}function r(t){t.getList("contacts",{max:0}).then(function(a){t.contacts=a})}function n(t){var a=window.confirm("Delete templates?");a&&t.remove().then(function(){e()})}var s=this;s["delete"]=n,s.search=e,s.searchParams=t.search(),s.searchParams.hash=0,s.searchParams.page=_.defaultTo(s.searchParams.page,0),s.searchParams.max=_.defaultTo(s.searchParams.max,10),s.currentPage=_.defaultTo(s.currentPage,s.searchParams.page+1),e()}])}(),function(){angular.module("es").config(["$stateProvider",function(t){t.state("template-list",{url:"/backend/templates",controller:"TemplateListCtrl as ctrl",templateUrl:"app/template/template.list.html"}).state("template-form",{url:"/backend/templates/:id",controller:"TemplateFormCtrl as ctrl",templateUrl:"app/template/template.form.html"}).state("template-contact-list",{url:"/backend/templates/:id/contacts?q",controller:"TemplateContactListCtrl as ctrl",templateUrl:"app/template/template.contact.list.html"})}])}(),function(){angular.module("es").factory("RestTemplateService",["Restangular",function(t){return t.service("templates")}])}(),function(){angular.module("es").config(["$httpProvider","RestangularProvider",function(t,a){a.setBaseUrl("/api"),a.setDefaultHttpFields({cache:!1}),a.addResponseInterceptor(function(t,a){var e;return"getList"===a&&angular.isObject(t)&&!angular.isArray(t)?(e=angular.copy(t.rows,e),delete t.rows,e.meta=t):e=t,e})}])}(),function(){function t(t,a,e){t.html5Mode(!0).hashPrefix("!"),a.otherwise("/backend/contacts"),e.strictMode(!1)}t.$inject=["$locationProvider","$urlRouterProvider","$urlMatcherFactoryProvider"],angular.module("es").config(t)}(),function(){function t(t){t.decorator("taOptions",a)}function a(t){"ngInject";return t.forceTextAngularSanitize=!0,t.toolbar=[["bold","italics","underline","strikeThrough"],["quote"],["ul","ol"],["redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight","indent","outdent"]],t}t.$inject=["$provide"],a.$inject=["$delegate"],angular.module("es").config(t)}();