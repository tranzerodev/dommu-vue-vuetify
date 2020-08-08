<template>
  <div
    class="env-page"
    style="background-color: white; text-align: left; padding: 20px 50px; margin: 50px 10px;"
  >
    <div class="env__client">
      <h1>Client Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Client Version</td>
              <td>{{ clientVersion }}</td>
            </tr>
            <tr v-for="(value, key) in clientEnv" :key="'client_env_' + key">
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="env__server">
      <h1>Server Env</h1>
      <div class="env__list">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in serverEnv" :key="'client_env_' + key">
              <td>{{ key }}:</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AjaxApiService from "../../../services/AjaxApiService";

export default {
  name: "Env",
  data: function() {
    return {
      clientEnv: process.env,
      clientVersion: process.env.VERSION,
      serverEnv: {}
    };
  },
  mounted() {
    AjaxApiService.get("/api/v2/env/show").then(res => {
      this.serverEnv = res;
    });
  }
};
</script>

<style scoped></style>
