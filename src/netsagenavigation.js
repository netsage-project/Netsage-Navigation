/*
 * (C) 2018 Tyson Seto-Mook, Laboratory for Advanced Visualization and Applications, University of Hawaii at Manoa.
 */


/*
Copyright 2018 The Trustees of Indiana University

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


import {
  PanelCtrl
} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/netsagenavigation_styles.css!';


//import './images/logo.png';

//http://tokelau.manoa.hawaii.edu:3000/public/plugins/netsagenavigation/src/images/logo.png


//import d3 from './js/netsagenavigation_d3.v3';

////// place global variables here ////
const panelDefaults = {
  sidebar: true,
  dashboardselection: true,
  cycleview: true,
  sharescreen: true,
  option_1: "netsage",
  option_2: "netsagenavigation",
  option_3: "plugin",
  option_4: 123,
  choices: [],
  array_option_1: [],
  array_option_2: [],
  array_option_3: [],
  array_option_4: []
};

export class Netsagenavigation extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);

    _.defaults(this.panel, panelDefaults);
    this.netsagenavigation_holder_id = 'netsagenavigation_' + this.panel.id;
    this.containerDivId = 'container_' + this.netsagenavigation_holder_id;
    
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
  }

  onInitEditMode() {
    this.addEditorTab('Navigation', 'public/plugins/netsagenavigation/nav_editor.html', 3);      
  }

  onInitPanelActions(actions) {
    this.render();
  }


  addNewChoice() {
    var num = this.panel.choices.length + 1;
    this.panel.choices.push(num);
    this.panel.array_option_1.push('');
    this.panel.array_option_2.push('');
    this.panel.array_option_3.push('');
    this.panel.array_option_4.push('');
  }


  removeChoice(index) {
    this.panel.choices.splice(index, 1);
    this.panel.array_option_1.splice(index, 1);
    this.panel.array_option_2.splice(index, 1);
    this.panel.array_option_3.splice(index, 1);
    this.panel.array_option_4.splice(index, 1);
  }

  navbarOpen() {
    document.getElementById("mySidenav").style.width = "420px";
  }

  navbarClose() {
    document.getElementById("mySidenav").style.width = "0px";
  }


  link(scope, elem, attrs, ctrl) {
    var self = this;
    ctrl.events.on('render', function () {
      if (document.getElementsByTagName("body")) {
        var navItem = document.getElementById("NavBar");
        //Only create if nav doesnt exist.
        if (!navItem) {
          //This sets the logos 
          var navBarLogoPath = ctrl.panel.topLogoPath;
          var sideNavLogoPath = ctrl.panel.sideLogoPath;
          var hamburgerPath = ctrl.panel.hamburgerPath;
          CreateSideNavBar(navBarLogoPath, sideNavLogoPath, hamburgerPath);
          CreateTopNavBar();
        }
      }
      if (document.getElementById(ctrl.netsagenavigation_holder_id)) {

        //NewCode 
        var sideMenuBar = document.getElementsByTagName('sidemenu')[0];
        var dashboardDropdown = document.getElementsByClassName('navbar-page-btn')[0];
        var shareBtn = document.getElementsByClassName('navbar-button--share')[0];
        var cycleBtn = document.getElementsByClassName('navbar-button--tv')[0];

        //sidebar
        if (sideMenuBar) {
          if (ctrl.panel.sidebar) {
            sideMenuBar.style.display = 'none';
          } else {
            sideMenuBar.style.display = 'block';

          }
        }

        //dashboardDropdown
        if (dashboardDropdown) {
          if (ctrl.panel.dashboardselection) {
            dashboardDropdown.style.display = 'none';
          } else {
            dashboardDropdown.style.display = 'block';

          }
        }

        //sharebtn
        if (shareBtn) {
          if (ctrl.panel.sharescreen) {
            shareBtn.style.display = 'none';
          } else {

            shareBtn.style.display = 'block';
          }
        }

        //cycleBtn
        if (cycleBtn) {
          if (ctrl.panel.cycleview) {
            cycleBtn.style.display = 'none';

          } else {

            cycleBtn.style.display = 'block';
          }

        }

        //NewCode



        var currNavBar = window.parent.document.getElementById('menuItems');
        currNavBar.innerHTML = "";

        var questions = [];

        if (ctrl.panel.array_option_1.length > 0) {
          for (var i = 0; i < ctrl.panel.array_option_1.length; i++) {
            var quesObj = {
              "Question": ctrl.panel.array_option_1[i],
              "Url": ctrl.panel.array_option_2[i]
            }
            questions.push(quesObj);
          }
        }

        _.forEach(questions, function (data) {
          var aTag = document.createElement('a');
          aTag.setAttribute('href', data.Url);
          aTag.innerHTML = data.Question;
          aTag.onclick = function () {
            document.getElementById("mySidenav").style.width = "0px";
          }
          currNavBar.appendChild(aTag);
        })



      }
    });

      this.render();
  }

}




function CreateTopNavBar() {
  var grafanaApp = document.getElementsByTagName("grafana-app")[0];
  var menuDiv = document.createElement("div");
  menuDiv.setAttribute("id", "NavBar");
  grafanaApp.setAttribute("style", "margin-top:50px;");
  document.getElementsByTagName("body")[0].insertBefore(menuDiv, grafanaApp)

}

function CreateSideNavBar(toppath, sidepath, hamburgerPath) {
  console.log(toppath, sidepath);
  var sideBarHtml = '<div id="mySidenav" class="sidenav"><div style="background-color:#ffffff;">'
  sideBarHtml += '<left style = "padding-left:30px;"><img src="'
  sideBarHtml += sidepath + '" ></left>'
  sideBarHtml += '</div><a href="javascript:void(0)" class="closebtn" '
  sideBarHtml += 'onclick="document.getElementById('
  sideBarHtml += "'mySidenav').style.width = "
  sideBarHtml += "'0px'"
  sideBarHtml += ';";">'
  sideBarHtml += ' &times;</a><div id="menuItems" ><a href="https://portal.netsage.global/grafana/d/000000003/bandwidth-dashboard?refresh=1d&orgId=2">What is the current state of the network?</a><a href="https://portal.netsage.global/grafana/d/000000006/loss-patterns?orgId=2">What are the patterns of loss in the network?</a><a href="https://portal.netsage.global/grafana/d/000000005/latency-patterns?orgId=2">What are the latency patterns in the network?</a></div></div><span style="font-size:30px;cursor:pointer" '
  sideBarHtml += 'onclick="document.getElementById('
  sideBarHtml += "'mySidenav').style.width = "
  sideBarHtml += "'420px'"
  sideBarHtml += ';";"><img src = "' + hamburgerPath + '" style = "width:45px;"> <img src="' + toppath + '" style= "width:200px; "></span>'
  var sideDiv = document.createElement("div");
  sideDiv.setAttribute("id", "SideDiv");
  sideDiv.innerHTML = sideBarHtml;
  var grafanaApp = document.getElementsByTagName("grafana-app")[0];
  document.getElementsByTagName("body")[0].insertBefore(sideDiv, grafanaApp)
}




Netsagenavigation.templateUrl = 'module.html';
