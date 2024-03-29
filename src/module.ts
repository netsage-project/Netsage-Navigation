import { PanelPlugin } from '@grafana/data';
import { SimplePanel } from './SimplePanel';
import { NavQuestionEditor } from './NavQuestionEditor';
import { HideGrafanaTools } from './HideGrafanaTools';

export const plugin = new PanelPlugin<any>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addCustomEditor({
      id: 'navQuestions',
      path: 'navQuestions',
      name: 'Nav Questions',
      description: '',
      editor: NavQuestionEditor,
      defaultValue: []
    })
    .addCustomEditor({
      id: 'hideGrafanaTools',
      path: 'hideGrafanaTools',
      name: 'Hide Grafana Tools',
      description: '',
      editor: HideGrafanaTools,
      defaultValue: {hideNavBar: true, hideSideBar: true}
    });
});
