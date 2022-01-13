# NetSage Navigation Plugin

This is the customizable navigation plugin for NetSage project. 

## Getting started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```bash
   yarn dev
   ```

   or

   ```bash
   yarn watch
   ```

3. Build plugin in production mode

   ```bash
   yarn build
   ```

## Testing the plugin in standalon mode

   ```bash
   docker run -p 3001:3000 -v $pwd:/var/lib/grafana/plugins -e GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS='netsage-nav-plugin' --name=grafana-plugins grafana/grafana:8.2.3
   ```