import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import './css/styles.css';
import ReactDOM from 'react-dom';
// Inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_push


interface NavProps {
  navData:  Array<{label: string, link: string}>
}
class NavComponent extends Component<NavProps> {
  render() {
    const styles = getStyles();
    const navImg = require('./img/hamburger-v4.gif');
    const navLogo = require('./img/netsage-cropped.png');
    return (
      <div>
        <img src={navImg} className={styles.navImage} onClick={this.openNav}></img>
        <img src={navLogo} className={styles.navLogo} onClick={this.openNav}></img>
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={this.closeNav}>&times;</a>

        {this.props.navData.map(function(value, index) {
          return (<a href={value.link} key={"valueLink" + index}>{value.label}</a>);
        })}
        </div>
      </div>
    );
  }
  openNav() {
    var sideNav = document.getElementById("mySidenav");
    if (sideNav) {
      sideNav.style.width = "420px";
    }
  }
  closeNav() {
    var sideNav = document.getElementById("mySidenav");
    if (sideNav) {
      sideNav.style.width = "0";
    }
  }
}

export const SimplePanel: React.FC<any> = ({ options , data, width, height }) => {
  const styles = getStyles();
  console.log(options);

  handleSideNavVisibility(options.hideGrafanaTools.hideSideBar);
  handleNavBarVisibility(options.hideGrafanaTools.hideNavBar);

  if (!document.getElementById('netsage-nav-wrapper')) {
    var navWrapper = document.createElement('div');
    navWrapper.setAttribute('id', 'netsage-nav-wrapper');
    var header = document.getElementsByClassName('page-toolbar')[0];
    if (header) {
      header.prepend(navWrapper);
    }
    ReactDOM.render(<NavComponent navData={options.navQuestions}/>, navWrapper);
  }

  return <div className={cx(styles.wrapper)}></div>;
};

const handleSideNavVisibility = (hideSideBar: boolean) => {
  handleElementSelectedFromClass(hideSideBar, "sidemenu");
}

const handleNavBarVisibility = (hideNavBar: boolean) => {
  handleElementSelectedFromClass(hideNavBar, "css-vyoujf");
  handleElementSelectedFromClass(hideNavBar, "css-14mr6ll");
  handleElementSelectedFromClass(hideNavBar, "css-rwrh9q");
  handleElementSelectedFromClass(hideNavBar, "css-umstnt");
}

const handleElementSelectedFromClass = (doHide: boolean, className: string) => {
  var container = Array.from(document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>);
  if (container) {
    if (doHide) {
      for (var i = 0; i < container.length; i++) {
        container[i].style.display = 'none';
      }
    } else {
      for (i = 0; i < container.length; i++) {
        container[i].style.display = 'flex';
      }
    }
  }
}

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    navImage: css`
      height: 60px;
      overflow: hidden;
    `,
    navLogo: css`
      height: 60px;
      overflow: hidden;
    `,
  };
});
