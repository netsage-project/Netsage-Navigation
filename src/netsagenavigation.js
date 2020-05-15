/*
 * (C) 2018 Mahesh Khanal, Laboratory for Advanced Visualization and Applications, University of Hawaii at Manoa.
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

//Default panel options
const panelDefaults = {
  sidebar: true,
  dashboardselection: true,
  cycleview: true,
  sharescreen: true,
  tablefilters:true,
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

  /**
       * A method to  add new navigation URL in the edit panel 
       * @method addNewChoice
  */
  addNewChoice() {
    var num = this.panel.choices.length + 1;
    this.panel.choices.push(num);
    this.panel.array_option_1.push('');
    this.panel.array_option_2.push('');
    this.panel.array_option_3.push('');
    this.panel.array_option_4.push('');
  }

  /**
      * A method the remove the choice option in the edit panel 
      * @method removeChoice
      * @param {BigInteger} index index of the array to be removed
 */

  removeChoice(index) {
    this.panel.choices.splice(index, 1);
    this.panel.array_option_1.splice(index, 1);
    this.panel.array_option_2.splice(index, 1);
    this.panel.array_option_3.splice(index, 1);
    this.panel.array_option_4.splice(index, 1);
  }
  /**
      * A method to  show the navbar
      * @method navbarOpen
 */
  navbarOpen() {
    document.getElementById("mySidenav").style.width = "420px";
  }

  /**
      * A method to  hide the navbar
      * @method navbarClose
 */
  navbarClose() {
    document.getElementById("mySidenav").style.width = "0px";
  }

  /**
      * A method to  start the setup of the plugin
      * @method setup
 */
  setup() {
    if (document.getElementsByTagName("body")) {
      var navItem = document.getElementById("NavBar");
      //Only create if nav doesnt exist.
      if (!navItem) {
        //This sets the logos 
        var navBarLogoPath = this.panel.topLogoPath;
        var sideNavLogoPath = this.panel.sideLogoPath;
        var hamburgerPath = this.panel.hamburgerPath;
        //creates side Navigation Bar
        CreateSideNavBar(navBarLogoPath, sideNavLogoPath, hamburgerPath);
        //Creates top Navigation Bar
        CreateTopNavBar();
      }
    }
    if (document.getElementById(this.netsagenavigation_holder_id)) {
      //Hides/shows default grafana buttons and options
      HandleGrafanaDefaults(this);
      //Updates the side navigation menu based on the user options. 
      UpdateMenu(this);


      /**
           * A method to  update the url in the side menu based on user preference
           * @method UpdateMenu
           * @param {Object} ctrl the panel control
      */

      function UpdateMenu(ctrl) {

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

      /**
           * A method to  show/hide different grafana options
           * @method HandleGrafanaDefaults
           * @param {Object} ctrl the panel control
      */

      function HandleGrafanaDefaults(ctrl) {
        HandleSideMenu(ctrl);
        HandleDropDown(ctrl);
        HandleShareButton(ctrl);
        HandleCycleButton(ctrl);
        HandleTableFilters(ctrl); 
      }

      /**
           * A method to  show/hide the side navigation menu in grafana
           * @method HandleSideMenu
           * @param {Object} ctrl the panel control
      */

      function HandleSideMenu(ctrl) {
        var sideMenuBar = document.getElementsByTagName('sidemenu')[0];
        if (sideMenuBar) {
          if (ctrl.panel.sidebar) {
            sideMenuBar.style.display = 'none';
          } else {
            sideMenuBar.style.display = 'block';

          }
        }
      }

      /**
           * A method to  show/hide the side navigation menu in grafana
           * @method HandleSideMenu
           * @param {Object} ctrl the panel control
      */

     function HandleTableFilters(ctrl) {
       var filters =  document.getElementsByClassName('table-panel-filter-link'); 
       var hiddenCss = '.table-panel-table td:hover .table-panel-filter-link { visibility: hidden !important;}'; 
       var visibleCss = '.table-panel-table td:hover .table-panel-filter-link { visibility: visible !important;}'; 
       var style = document.createElement('style'); 
       if (ctrl.panel.tablefilters) {
        if (style.styleSheet) {
          style.styleSheet.cssText = hiddenCss;
        } else {
          style.appendChild(document.createTextNode(hiddenCss));
        }
      
        }else{
          if (style.styleSheet) {
            style.styleSheet.cssText = visibleCss;
        } else {
            style.appendChild(document.createTextNode(visibleCss));
      }
    }
      document.getElementsByTagName('head')[0].appendChild(style);
  }

      /**
           * A method to  show/hide the default dropdown in grafana
           * @method HandleDropDown
           * @param {Object} ctrl the panel control
      */

      function HandleDropDown(ctrl) {
        var dashboardDropdown = document.getElementsByClassName('navbar-page-btn')[0];
        if (dashboardDropdown) {
          if (ctrl.panel.dashboardselection) {
            dashboardDropdown.style.display = 'none';
          } else {
            dashboardDropdown.style.display = 'block';

          }
        }

      }

      /**
           * A method to  show/hide the default share button in grafana
           * @method HandleShareButton
           * @param {Object} ctrl the panel control
      */

      function HandleShareButton(ctrl) {
        var shareBtn = document.getElementsByClassName('navbar-button--share')[0];
        if (shareBtn) {
          if (ctrl.panel.sharescreen) {
            shareBtn.style.display = 'none';
          } else {

            shareBtn.style.display = 'block';
          }
        }
      }

      /**
           * A method to show/hide the default cycle button in grafana
           * @method HandleCycleButton
           * @param {Object} ctrl the panel control
      */

      function HandleCycleButton(ctrl) {
        var cycleBtn = document.getElementsByClassName('navbar-button--tv')[0];
        if (cycleBtn) {
          if (ctrl.panel.cycleview) {
            cycleBtn.style.display = 'none';

          } else {

            cycleBtn.style.display = 'block';
          }

        }
      }

    }
  }

  link(scope, elem, attrs, ctrl) {
    var self = this;
    ctrl.events.on('render', self.setup.bind(self));
    ctrl.events.on('refresh', self.setup.bind(self));

    this.render();
  }

}
/**
     * A method to  create the Top navigation bar
     * @method CreateTopNavBar
  
*/
function CreateTopNavBar() {
  var grafanaApp = document.getElementsByTagName("grafana-app")[0];
  var menuDiv = document.createElement("div");
  menuDiv.setAttribute("id", "NavBar");
  document.getElementsByTagName("body")[0].insertBefore(menuDiv, grafanaApp)
}

/**
     * A method to  create the side navigation panel
     * @method CreateSideNavBar
     * @param {String} toppath the path of the logo for top navigation bar
     * @param {String} sidepath the path of the logo for side navigation bar
     * @param {String} hamburgerPath the path of the logo for the hamburgerlogo
*/


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
  sideBarHtml += ' &times;</a><div id="menuItems" ><a href="https://portal.netsage.global/grafana/d/000000003/bandwidth-dashboard?refresh=1d&orgId=2">What is the current state of the network?</a><a href="https://portal.netsage.global/grafana/d/000000006/loss-patterns?orgId=2">What are the patterns of loss in the network?</a><a href="https://portal.netsage.global/grafana/d/000000005/latency-patterns?orgId=2">What are the latency patterns in the network?</a></div></div><span style="font-size:30px;cursor:pointer;z-index:1021;" '
  sideBarHtml += 'onclick="document.getElementById('
  sideBarHtml += "'mySidenav').style.width = "
  sideBarHtml += "'420px'"
  sideBarHtml += ';";"><img src = "' + hamburgerPath + '" style = "width:45px;"> <img src="' + toppath + '" style= "width:200px; "></span>'
  var sideDiv = document.createElement("div");
  sideDiv.style.display = 'flex';
  sideDiv.style.zIndex = '1021';
  sideDiv.setAttribute("id", "SideDiv");
  sideDiv.innerHTML = sideBarHtml;
  var grafanaApp = document.getElementsByTagName("grafana-app")[0];
  document.getElementsByTagName("body")[0].insertBefore(sideDiv, grafanaApp)
}




Netsagenavigation.templateUrl = 'module.html';
