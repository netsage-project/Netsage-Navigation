import React , { useState, ChangeEvent } from "react";
import { StandardEditorProps } from "@grafana/data";
import { Switch } from "@grafana/ui";

interface Settings {
  hideNavBar: boolean,
  hideSideBar: boolean
}

interface Props
  extends StandardEditorProps<Settings, Settings> {}

export const HideGrafanaTools: React.FC<Props> = ({
    item,
    value,
    onChange,
    context,
  }) => {
    
    const [isHideNavBar, setIsHideNavBar] = useState(value!.hideNavBar);
    const [isHideSideBar, setIsHideSideBar] = useState(value!.hideSideBar);

    const navOptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
      setIsHideNavBar(e.target.checked);
      value.hideNavBar = e.target.checked;
      onChange(value);
    };

    const sideBarOptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
      setIsHideSideBar(e.target.checked);
      value.hideSideBar = e.target.checked;
      onChange(value);
    };

    return (
        <table>
            <tr>
                <td>Hide Top Navigation Bar</td>
                <td><Switch value={isHideNavBar} onChange = { navOptionChanged } /></td>
            </tr>
            <tr>
                <td>Hide Left Side Bar</td>
                <td><Switch value={isHideSideBar} onChange = { sideBarOptionChanged } /></td>
            </tr>
        </table>
    )
};
