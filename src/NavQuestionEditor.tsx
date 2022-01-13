import React, { useState, ChangeEvent } from "react";
import { StandardEditorProps } from "@grafana/data";
import { Input, Button } from "@grafana/ui";


interface Settings {
  linkData: Array<{label: string, link: string}>
}

interface Props
  extends StandardEditorProps<Array<{label: string, link: string}>, Settings> {}

export const NavQuestionEditor: React.FC<Props> = ({
  item,
  value,
  onChange,
  context,
}) => {

  
  const [linkData, setLinkData] = useState(value);
  const updateLinkName = (index: number, val: string) => {
    linkData[index].label = val;
    setLinkData(linkData);
    onChange(linkData);
  }

  const updateLinkValue = (index: number, val: string) => {
    linkData[index].link = val;
    setLinkData(linkData);
    onChange(linkData);
  }

  return (
    <table>
      <tr>
        <th>Display Question</th>
        <th>URL</th>
        <th></th>
      </tr>
      {linkData.map(function(v, index) {
        return (
          <tr key={"row-" + index}>
            <td><Input name={"link-name-" + index} id={"link-name-" + index} defaultValue = {v.label} 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateLinkName(index, e.target.value)}/></td>

            <td><Input name={"link-value-" + index} id={"link-value-" + index} defaultValue={v.link} 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateLinkValue(index, e.target.value)}/></td>

            <td><Button id={"link-remove-btn" + index} onClick={() => {
                        value.splice(index, 1);
                        onChange(value)}}>-</Button></td>
          </tr>
        );
      })}
      <tr>
        <td><Button onClick={() => {
            value.push({label: "New Link", link: ""});
            onChange(value);
          }}>+</Button></td>
        <td></td>
      </tr>
    </table>
    )
};
